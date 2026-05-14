// Live BWICK CA resolver.
//
// The dApp used to hard-code the SPL mint at build time from
// NEXT_PUBLIC_BWICK_SPL_MINT. On a CA rotation that meant: rebuild the
// dApp, redeploy, and pray no user hits a stale tab — otherwise the
// deposit form locks the wrong SPL. This module pulls the canonical CA
// from chain Params at runtime instead, with the env value used only as
// a bootstrap fallback when the chain is unreachable.
//
// Cached in-module for 60s so we don't hammer REST on every form keystroke.

import { PublicKey } from "@solana/web3.js";
import { BWICK_REST, BWICK_SPL_MINT } from "./config";

const CACHE_TTL_MS = 60_000;

export interface BridgeLimits {
  /** Max ubwick that can be minted (Sol→bwick) per tx. */
  maxMintPerTx: bigint | null;
  /** Max ubwick that can be burned (bwick→Sol) per tx. */
  maxBurnPerTx: bigint | null;
}

interface CacheEntry {
  mint: string;
  limits: BridgeLimits;
  fetchedAt: number;
}

let cache: CacheEntry | null = null;
let inFlight: Promise<CacheEntry> | null = null;

function parseBigIntOrNull(v: unknown): bigint | null {
  if (typeof v !== "string" || v.length === 0) return null;
  try {
    return BigInt(v);
  } catch {
    return null;
  }
}

async function fetchChainParams(): Promise<CacheEntry> {
  const url = `${BWICK_REST.replace(/\/$/, "")}/bridge/v1/params`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`chain params HTTP ${res.status}`);
  const json = (await res.json()) as {
    params?: {
      solana_token_address?: string;
      max_mint_per_tx?: string;
      max_burn_per_tx?: string;
    };
  };
  const ca = json.params?.solana_token_address;
  if (!ca || ca.length < 32) {
    throw new Error("chain params missing solana_token_address");
  }
  return {
    mint: ca,
    limits: {
      maxMintPerTx: parseBigIntOrNull(json.params?.max_mint_per_tx),
      maxBurnPerTx: parseBigIntOrNull(json.params?.max_burn_per_tx),
    },
    fetchedAt: Date.now(),
  };
}

/**
 * Returns the canonical BWICK SPL mint as a string. Resolution order:
 *   1. cached value if fresh
 *   2. live chain Params (REST)
 *   3. env fallback (build-time NEXT_PUBLIC_BWICK_SPL_MINT)
 *
 * Never throws — the env fallback is always usable. Returns the env value
 * with a console warning if the chain is unreachable.
 */
async function loadParams(): Promise<CacheEntry> {
  const now = Date.now();
  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) return cache;
  if (inFlight) return inFlight;

  inFlight = (async () => {
    try {
      const entry = await fetchChainParams();
      cache = entry;
      return entry;
    } catch (e) {
      console.warn(
        "[live-mint] chain Params unreachable, falling back to env CA:",
        e instanceof Error ? e.message : e,
      );
      // Cache the fallback briefly so we don't retry on every call when
      // the chain is down — but use a shorter TTL than success path.
      cache = {
        mint: BWICK_SPL_MINT,
        limits: { maxMintPerTx: null, maxBurnPerTx: null },
        fetchedAt: Date.now() - CACHE_TTL_MS / 2,
      };
      return cache;
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
}

export async function getBwickMintAddress(): Promise<string> {
  return (await loadParams()).mint;
}

export async function getBwickMintPubkey(): Promise<PublicKey> {
  const s = await getBwickMintAddress();
  return new PublicKey(s);
}

/** Per-tx caps from chain Params. Returns nulls when chain is unreachable. */
export async function getBridgeLimits(): Promise<BridgeLimits> {
  return (await loadParams()).limits;
}

/** Synchronous current-cached CA, or env fallback if nothing fetched yet. */
export function getBwickMintAddressSync(): string {
  return cache?.mint ?? BWICK_SPL_MINT;
}
