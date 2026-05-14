// Client for the bwick_bridge Anchor program on Solana.
// Builds raw `register` and `deposit` instructions without pulling Anchor at runtime.
//
// Anchor instruction discriminator = first 8 bytes of sha256("global:<name>")
// Layouts mirror programs/bwick-bridge/src/instructions/{register,deposit}.rs

import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";

import {
  BRIDGE_PROGRAM_ID,
  BWICK_SPL_MINT,
  SOLANA_RPC,
} from "./config";
import { getBwickMintPubkey } from "./live-mint";

export const SOLANA_CONNECTION = () =>
  new Connection(SOLANA_RPC, "confirmed");

export const BRIDGE_PROGRAM = new PublicKey(BRIDGE_PROGRAM_ID);

/**
 * @deprecated The CA can rotate via chain governance. Call
 * `getBwickMintPubkey()` (from `./live-mint`) at the point of use so the
 * deposit / withdraw flow always references the live mint.
 */
export const BWICK_MINT = new PublicKey(BWICK_SPL_MINT);

// Pre-computed Anchor discriminators (sha256("global:<name>")[0..8]).
// Verified by sha256 in node:
//   register   = d3 7c 43 0f d3 c2 b2 f0
//   deposit    = f2 23 c6 89 52 e1 f2 b6
//   withdraw   = b7 12 46 9c 94 6d a1 22 (matches relayer/pool-executor.ts)
const DISCRIM = {
  register: new Uint8Array([0xd3, 0x7c, 0x43, 0x0f, 0xd3, 0xc2, 0xb2, 0xf0]),
  deposit: new Uint8Array([0xf2, 0x23, 0xc6, 0x89, 0x52, 0xe1, 0xf2, 0xb6]),
};

export function bridgePoolPda(): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [new TextEncoder().encode("bridge_pool")],
    BRIDGE_PROGRAM
  );
  return pda;
}

/**
 * @deprecated v1 derivation. v2 vault PDA includes mint_generation, which
 * changes on migrate_vault. Use `getCurrentPoolVault()` instead.
 */
export function poolVaultPda(): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [new TextEncoder().encode("pool_vault")],
    BRIDGE_PROGRAM
  );
  return pda;
}

/**
 * Read the CURRENT pool_vault pubkey from the on-chain bridge_pool state.
 * v2 vault PDA seeds = [b"pool_vault", mint_generation_le], which changes
 * whenever migrate_vault runs. Hardcoded derivations break post-rotation.
 */
export async function getCurrentPoolVault(
  conn: import("@solana/web3.js").Connection
): Promise<PublicKey> {
  const info = await conn.getAccountInfo(bridgePoolPda());
  if (!info) throw new Error("bridge_pool not initialized");
  // Layout from bridge-program/src/state.rs v2:
  //   8 disc + 5*32 admins + 1 admin_count + 1 admin_thresh
  //   + 16*32 attestors + 1 + 1 + 32 bwick_mint + 32 pool_vault + ...
  const OFF = 8 + 5 * 32 + 1 + 1 + 16 * 32 + 1 + 1 + 32; // 716
  return new PublicKey(info.data.subarray(OFF, OFF + 32));
}

export function userAccountPda(user: PublicKey): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [new TextEncoder().encode("user_account"), user.toBuffer()],
    BRIDGE_PROGRAM
  );
  return pda;
}

// Anchor encodes a `String` arg as 4-byte LE length prefix + UTF-8 bytes.
function encodeAnchorString(s: string): Uint8Array {
  const bytes = new TextEncoder().encode(s);
  const buf = new Uint8Array(4 + bytes.length);
  new DataView(buf.buffer).setUint32(0, bytes.length, true);
  buf.set(bytes, 4);
  return buf;
}

function encodeU64LE(n: bigint): Uint8Array {
  const buf = new Uint8Array(8);
  new DataView(buf.buffer).setBigUint64(0, n, true);
  return buf;
}

function concatBytes(...parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((a, p) => a + p.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const p of parts) {
    out.set(p, off);
    off += p.length;
  }
  return out;
}

/**
 * Build a `register` instruction.
 * register(bwick_chain_address: String) — opens the user_account PDA so
 * the relayer knows where to mint on bwickchain.
 */
export function buildRegisterIx(
  user: PublicKey,
  bwickChainAddress: string
): TransactionInstruction {
  const data = concatBytes(
    DISCRIM.register,
    encodeAnchorString(bwickChainAddress)
  );

  return new TransactionInstruction({
    programId: BRIDGE_PROGRAM,
    keys: [
      { pubkey: user, isSigner: true, isWritable: true },
      { pubkey: bridgePoolPda(), isSigner: false, isWritable: false },
      { pubkey: userAccountPda(user), isSigner: false, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data: Buffer.from(data),
  });
}

/**
 * Build a `deposit` instruction.
 * deposit(amount: u64) — transfers SPL from user ATA to pool_vault and
 * emits DepositEvent for the relayer.
 */
export function buildDepositIx(args: {
  user: PublicKey;
  userTokenAccount: PublicKey;
  amount: bigint;
  tokenProgram: PublicKey;
  /** v2: must be the live pool_vault pubkey from `getCurrentPoolVault()`. */
  poolVault: PublicKey;
}): TransactionInstruction {
  const data = concatBytes(DISCRIM.deposit, encodeU64LE(args.amount));

  return new TransactionInstruction({
    programId: BRIDGE_PROGRAM,
    keys: [
      { pubkey: args.user, isSigner: true, isWritable: true },
      { pubkey: bridgePoolPda(), isSigner: false, isWritable: true },
      { pubkey: userAccountPda(args.user), isSigner: false, isWritable: true },
      { pubkey: args.userTokenAccount, isSigner: false, isWritable: true },
      { pubkey: args.poolVault, isSigner: false, isWritable: true },
      { pubkey: args.tokenProgram, isSigner: false, isWritable: false },
    ],
    data: Buffer.from(data),
  });
}

/**
 * Detects whether the BWICK mint is owned by the legacy Token program or
 * Token-2022 (the program uses anchor-spl token_interface, so either is OK).
 * Returns the program id to pass into the deposit instruction.
 */
export async function detectTokenProgram(
  conn: Connection,
  mint: PublicKey
): Promise<PublicKey> {
  const info = await conn.getAccountInfo(mint);
  if (!info) throw new Error("BWICK mint account not found on Solana");
  if (info.owner.equals(TOKEN_2022_PROGRAM_ID)) return TOKEN_2022_PROGRAM_ID;
  return TOKEN_PROGRAM_ID;
}

/**
 * Returns the user's ATA for the BWICK mint, plus an ix to create it if missing.
 * (Pump.fun mints are usually classic Token program; we still resolve dynamically.)
 */
export async function ensureBwickAta(
  conn: Connection,
  user: PublicKey
): Promise<{
  ata: PublicKey;
  tokenProgram: PublicKey;
  createIx: TransactionInstruction | null;
}> {
  const mint = await getBwickMintPubkey();
  const tokenProgram = await detectTokenProgram(conn, mint);
  const ata = getAssociatedTokenAddressSync(
    mint,
    user,
    false,
    tokenProgram,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
  const info = await conn.getAccountInfo(ata);
  if (info) return { ata, tokenProgram, createIx: null };
  const createIx = createAssociatedTokenAccountInstruction(
    user,
    ata,
    user,
    mint,
    tokenProgram,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
  return { ata, tokenProgram, createIx };
}

/** Returns true if a UserAccount PDA already exists for this wallet. */
export async function isUserRegistered(
  conn: Connection,
  user: PublicKey
): Promise<boolean> {
  const info = await conn.getAccountInfo(userAccountPda(user));
  return info !== null;
}

/** Build (and return) a Transaction with: optional ATA-create, optional register, deposit. */
export async function buildDepositTransaction(args: {
  conn: Connection;
  user: PublicKey;
  bwickChainAddress: string;
  amount: bigint;
}): Promise<Transaction> {
  const { conn, user, bwickChainAddress, amount } = args;
  const tx = new Transaction();

  const { ata, tokenProgram, createIx } = await ensureBwickAta(conn, user);
  if (createIx) tx.add(createIx);

  const registered = await isUserRegistered(conn, user);
  if (!registered) {
    tx.add(buildRegisterIx(user, bwickChainAddress));
  }

  // v2: pool_vault PDA depends on mint_generation; read from chain.
  const poolVault = await getCurrentPoolVault(conn);
  tx.add(
    buildDepositIx({
      user,
      userTokenAccount: ata,
      amount,
      tokenProgram,
      poolVault,
    })
  );

  const { blockhash } = await conn.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = user;

  return tx;
}
