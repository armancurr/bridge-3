"use client";

// All bridge wiring for app/bridge/page.tsx. Keeps the visual page
// thin: state + handlers + balance polls live here, the page just
// reads from this hook.

import { useCallback, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAccount,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import type { SigningStargateClient } from "@cosmjs/stargate";

import {
  broadcastBurnForBridgeOut,
  fetchBwickBalance,
  fetchLatestHeight,
  findMintForRecipient,
  makeSigningClient,
} from "@/app/lib/bwickchain";
import {
  SOLANA_CONNECTION,
  buildDepositTransaction,
  detectTokenProgram,
} from "@/app/lib/bridge-program";
import { getBwickMintPubkey, getBridgeLimits, type BridgeLimits } from "@/app/lib/live-mint";
import {
  availableProviders,
  connectWallet,
  type WalletKind,
} from "@/app/lib/wallet";
import { CHAIN_ID, KEPLR_CHAIN_INFO } from "@/app/lib/config";
import { fromBaseUnits, toBaseUnits } from "@/app/lib/format";
import { tagUiTx } from "./ui-tx-tracker";

export type Direction = "sol_to_bwick" | "bwick_to_sol";

export type Phase =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "solana-confirming"; signature: string }
  | { kind: "polling-bwick"; signature: string; baseline: bigint }
  | { kind: "polling-solana"; bwickTx: string; baseline: bigint; solanaTx?: string | null }
  | { kind: "done"; primaryTx: string; sisterTx: string | null; arrived: boolean; direction: Direction; amount: string }
  | { kind: "error"; message: string };

const BWICK_REGEX =
  /^bwick1[02-9ac-hj-np-z]{38}([02-9ac-hj-np-z]{20})?$/;
const SOL_PUBKEY_REGEX = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

function extractError(err: unknown): string {
  if (!err) return "Unknown error";
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  if (typeof err === "object") {
    const e = err as { message?: unknown };
    if (typeof e.message === "string") return e.message;
  }
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

export function useBridge() {
  // ── Solana side (wallet-adapter) ──────────────────────────
  const { publicKey, connected, connect: solConnect, disconnect: solDisconnect, wallet, sendTransaction, select, wallets } =
    useWallet();
  const { connection } = useConnection();

  // ── BWICK chain side (Keplr / BWICK Wallet) ──────────────
  const [bwickAddress, setBwickAddress] = useState<string | null>(null);
  const [bwickClient, setBwickClient] = useState<SigningStargateClient | null>(
    null,
  );
  const [bwickWalletKind, setBwickWalletKind] = useState<
    "bwick" | "keplr" | null
  >(null);

  // ── form state ────────────────────────────────────────────
  const [direction, setDirection] = useState<Direction>("sol_to_bwick");
  const [amount, setAmountRaw] = useState("");
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });

  // Any user edit to the amount clears a stale error/done banner so the
  // submit button reflects the new attempt cleanly.
  const setAmount = useCallback((v: string) => {
    setAmountRaw(v);
    setPhase((p) => (p.kind === "error" || p.kind === "done" ? { kind: "idle" } : p));
  }, []);

  // ── balances ──────────────────────────────────────────────
  const [splBalance, setSplBalance] = useState<bigint | null>(null);
  const [bwickBalance, setBwickBalance] = useState<bigint | null>(null);

  // Chain-params per-tx caps. Fetched once on mount + refreshed every 60s
  // via the live-mint cache.
  const [limits, setLimits] = useState<BridgeLimits>({
    maxMintPerTx: null,
    maxBurnPerTx: null,
  });
  useEffect(() => {
    let cancelled = false;
    const load = () => {
      void getBridgeLimits()
        .then((l) => {
          if (!cancelled) setLimits(l);
        })
        .catch(() => { /* fallback nulls already set */ });
    };
    load();
    const t = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  // Solana SPL balance
  useEffect(() => {
    let cancelled = false;
    setSplBalance(null);
    if (!publicKey) return;
    (async () => {
      try {
        const mint = await getBwickMintPubkey();
        const tokenProgram = await detectTokenProgram(connection, mint);
        const ata = getAssociatedTokenAddressSync(
          mint,
          publicKey,
          false,
          tokenProgram,
          ASSOCIATED_TOKEN_PROGRAM_ID,
        );
        const acc = await getAccount(connection, ata, "confirmed", tokenProgram);
        if (!cancelled) setSplBalance(BigInt(acc.amount.toString()));
      } catch {
        if (!cancelled) setSplBalance(BigInt(0));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [publicKey, connection, phase.kind]);

  // BWICK chain balance
  useEffect(() => {
    let cancelled = false;
    setBwickBalance(null);
    if (!bwickAddress) return;
    (async () => {
      try {
        const bal = await fetchBwickBalance(bwickAddress);
        if (!cancelled) setBwickBalance(bal);
      } catch {
        if (!cancelled) setBwickBalance(BigInt(0));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [bwickAddress, phase.kind]);

  // ── wallet connect helpers ───────────────────────────────
  const connectSolana = useCallback(
    async (walletName?: string) => {
      try {
        if (walletName) {
          const w = wallets.find((x) => x.adapter.name === walletName);
          if (w) select(w.adapter.name);
        }
        await solConnect();
      } catch (err) {
        setPhase({ kind: "error", message: extractError(err) });
      }
    },
    [wallets, select, solConnect],
  );

  const connectBwick = useCallback(
    async (kind?: WalletKind, opts?: { silent?: boolean }) => {
      try {
        const { signer, address, kind: resolvedKind } = await connectWallet({
          chainInfo: KEPLR_CHAIN_INFO,
          chainId: CHAIN_ID,
          kind,
        });
        const c = await makeSigningClient(signer);
        setBwickClient(c);
        setBwickAddress(address);
        setBwickWalletKind(resolvedKind);
        try {
          window.localStorage.setItem("bwick-bridge-bwick-kind", resolvedKind);
        } catch { /* quota / private-mode */ }
      } catch (err) {
        // Silent reconnects on mount shouldn't surface errors as phase=error
        // — the user didn't ask for a connection right now.
        if (!opts?.silent) {
          setPhase({ kind: "error", message: extractError(err) });
        }
      }
    },
    [],
  );

  const disconnectAll = useCallback(() => {
    void solDisconnect();
    setBwickClient(null);
    setBwickAddress(null);
    setBwickWalletKind(null);
    try {
      window.localStorage.removeItem("bwick-bridge-bwick-kind");
    } catch { /* ignore */ }
  }, [solDisconnect]);

  // Auto-reconnect bwickchain on mount when a prior session left a kind hint
  // and the matching provider is still injected. enable() is a no-op when the
  // chain is already approved, so this is silent for the user.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (bwickAddress) return;
    let kind: WalletKind | null = null;
    try {
      const raw = window.localStorage.getItem("bwick-bridge-bwick-kind");
      if (raw === "bwick" || raw === "keplr") kind = raw;
    } catch { /* ignore */ }
    if (!kind) return;
    void connectBwick(kind, { silent: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React to the user switching accounts inside Keplr / BWICK Wallet. Both
  // dispatch `keplr_keystorechange` on the window; refetch the address from
  // whichever provider we're using so the displayed address stays in sync.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!bwickWalletKind) return;
    const onKeystoreChange = () => {
      void connectBwick(bwickWalletKind, { silent: true });
    };
    window.addEventListener("keplr_keystorechange", onKeystoreChange);
    return () => {
      window.removeEventListener("keplr_keystorechange", onKeystoreChange);
    };
  }, [bwickWalletKind, connectBwick]);

  // ── direction toggle ─────────────────────────────────────
  const flip = useCallback(() => {
    setDirection((d) =>
      d === "sol_to_bwick" ? "bwick_to_sol" : "sol_to_bwick",
    );
    setPhase({ kind: "idle" });
  }, []);

  // ── submit ───────────────────────────────────────────────
  const submit = useCallback(async () => {
    let amountBase: bigint;
    try {
      amountBase = toBaseUnits(amount);
      if (amountBase <= BigInt(0)) throw new Error("Amount must be > 0");
    } catch (err) {
      setPhase({ kind: "error", message: extractError(err) });
      return;
    }

    if (direction === "sol_to_bwick") {
      if (!publicKey) {
        setPhase({ kind: "error", message: "Connect a Solana wallet first." });
        return;
      }
      if (!bwickAddress || !BWICK_REGEX.test(bwickAddress)) {
        setPhase({
          kind: "error",
          message: "Connect a bwickchain wallet to receive the minted BWICK.",
        });
        return;
      }
      try {
        setPhase({ kind: "submitting" });
        const baseline = await fetchBwickBalance(bwickAddress).catch(
          () => BigInt(0),
        );
        const tx = await buildDepositTransaction({
          conn: connection,
          user: publicKey,
          bwickChainAddress: bwickAddress,
          amount: amountBase,
        });
        const signature = await sendTransaction(tx, connection);
        tagUiTx(signature);
        setPhase({ kind: "solana-confirming", signature });
        const blockhash = await connection.getLatestBlockhash();
        await connection.confirmTransaction(
          { signature, ...blockhash },
          "confirmed",
        );
        setPhase({ kind: "polling-bwick", signature, baseline });

        const startHeight = await fetchLatestHeight().catch(() => 0);
        const expected = baseline + amountBase;
        const deadline = Date.now() + 5 * 60 * 1000;
        let mintTx: string | null = null;
        while (Date.now() < deadline) {
          await new Promise((r) => setTimeout(r, 5000));
          try {
            const hit = await findMintForRecipient(bwickAddress, startHeight);
            if (hit) {
              mintTx = hit.txHash;
              break;
            }
          } catch { /* ignore */ }
          try {
            const cur = await fetchBwickBalance(bwickAddress);
            if (cur >= expected) break;
          } catch { /* ignore */ }
        }
        setPhase({
          kind: "done",
          primaryTx: signature,
          sisterTx: mintTx,
          arrived: true,
          direction: "sol_to_bwick",
          amount,
        });
      } catch (err) {
        setPhase({ kind: "error", message: extractError(err) });
      }
    } else {
      // bwick_to_sol
      if (!bwickClient || !bwickAddress) {
        setPhase({
          kind: "error",
          message: "Connect a bwickchain wallet first.",
        });
        return;
      }
      if (!publicKey) {
        setPhase({
          kind: "error",
          message: "Connect a Solana wallet to receive the released SPL.",
        });
        return;
      }
      const solRecipient = publicKey.toBase58();
      if (!SOL_PUBKEY_REGEX.test(solRecipient)) {
        setPhase({
          kind: "error",
          message: "Connected Solana address looks invalid.",
        });
        return;
      }
      try {
        setPhase({ kind: "submitting" });
        const conn = SOLANA_CONNECTION();
        const mint = await getBwickMintPubkey();
        const tokenProgram = await detectTokenProgram(conn, mint);
        const ata = getAssociatedTokenAddressSync(
          mint,
          publicKey,
          true,
          tokenProgram,
          ASSOCIATED_TOKEN_PROGRAM_ID,
        );
        let baseline = BigInt(0);
        try {
          const acc = await getAccount(conn, ata, "confirmed", tokenProgram);
          baseline = BigInt(acc.amount.toString());
        } catch { /* ATA likely doesn't exist; relayer creates it */ }

        const result = await broadcastBurnForBridgeOut({
          client: bwickClient,
          sender: bwickAddress,
          amount: amountBase,
          solanaAddress: solRecipient,
        });
        if (result.code !== 0) {
          throw new Error(
            `bwickchain tx failed: ${result.rawLog ?? `code ${result.code}`}`,
          );
        }
        tagUiTx(result.transactionHash);
        setPhase({
          kind: "polling-solana",
          bwickTx: result.transactionHash,
          baseline,
        });

        const expected = baseline + amountBase;
        const deadline = Date.now() + 5 * 60 * 1000;
        let arrived = false;
        while (Date.now() < deadline) {
          await new Promise((r) => setTimeout(r, 6000));
          try {
            const acc = await getAccount(conn, ata, "confirmed", tokenProgram);
            if (BigInt(acc.amount.toString()) >= expected) {
              arrived = true;
              break;
            }
          } catch { /* keep polling */ }
        }
        setPhase({
          kind: "done",
          primaryTx: result.transactionHash,
          sisterTx: null,
          arrived,
          direction: "bwick_to_sol",
          amount,
        });
      } catch (err) {
        setPhase({ kind: "error", message: extractError(err) });
      }
    }
  }, [
    direction,
    amount,
    publicKey,
    bwickAddress,
    bwickClient,
    connection,
    sendTransaction,
  ]);

  return {
    // wallets
    solAddress: publicKey?.toBase58() ?? null,
    solConnected: connected,
    solWalletName: wallet?.adapter.name ?? null,
    bwickAddress,
    bwickWalletKind,
    bwickProvidersAvailable: () => availableProviders(),
    connectSolana,
    connectBwick,
    disconnectAll,

    // form
    direction,
    flip,
    amount,
    setAmount,
    splBalance,
    bwickBalance,
    phase,
    submit,

    // derived
    payBalance:
      direction === "sol_to_bwick"
        ? splBalance != null
          ? fromBaseUnits(splBalance)
          : "…"
        : bwickBalance != null
          ? fromBaseUnits(bwickBalance)
          : "…",
    receiveBalance:
      direction === "sol_to_bwick"
        ? bwickBalance != null
          ? fromBaseUnits(bwickBalance)
          : "…"
        : splBalance != null
          ? fromBaseUnits(splBalance)
          : "…",
    payChainLabel: direction === "sol_to_bwick" ? "Solana" : "bwickchain",
    receiveChainLabel:
      direction === "sol_to_bwick" ? "bwickchain" : "Solana",

    // amount validation — single source of truth for the submit button +
    // input hint. Empty input is "no error, just no action yet". Any other
    // unparseable / zero / over-balance / over-cap state produces a message.
    ...(() => {
      const trimmed = amount.trim();
      const payBalRaw =
        direction === "sol_to_bwick" ? splBalance : bwickBalance;
      const cap =
        direction === "sol_to_bwick" ? limits.maxMintPerTx : limits.maxBurnPerTx;
      if (trimmed.length === 0) {
        return {
          amountError: null as string | null,
          isAmountValid: false,
        };
      }
      let parsed: bigint;
      try {
        parsed = toBaseUnits(trimmed);
      } catch {
        return { amountError: "Enter a valid amount.", isAmountValid: false };
      }
      if (parsed <= BigInt(0)) {
        return { amountError: "Enter an amount.", isAmountValid: false };
      }
      if (payBalRaw != null && parsed > payBalRaw) {
        return {
          amountError: "Insufficient balance.",
          isAmountValid: false,
        };
      }
      if (cap != null && parsed > cap) {
        return {
          amountError: `Above per-tx limit (${fromBaseUnits(cap)} BWICK).`,
          isAmountValid: false,
        };
      }
      return { amountError: null, isAmountValid: true };
    })(),

    // Raw per-tx cap for the current direction, for UI hints.
    perTxLimit:
      (direction === "sol_to_bwick" ? limits.maxMintPerTx : limits.maxBurnPerTx)
        ?? null,
    perTxLimitDisplay: (() => {
      const cap =
        direction === "sol_to_bwick" ? limits.maxMintPerTx : limits.maxBurnPerTx;
      return cap != null ? fromBaseUnits(cap) : null;
    })(),

    // Setter for the Max button — fills the input with the raw pay balance.
    setMaxAmount: () => {
      const raw = direction === "sol_to_bwick" ? splBalance : bwickBalance;
      if (raw == null || raw <= BigInt(0)) return;
      setAmount(fromBaseUnits(raw));
    },
  };
}
