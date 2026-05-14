// Centralized env config. All values must be NEXT_PUBLIC_* so they are
// inlined at build time and visible in the browser bundle.

export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID ?? "bwick-1";
export const BWICK_RPC =
  process.env.NEXT_PUBLIC_BWICK_RPC ?? "http://167.99.147.85/rpc";
export const BWICK_REST =
  process.env.NEXT_PUBLIC_BWICK_REST ?? "http://167.99.147.85/rest";
export const BWICK_DENOM = process.env.NEXT_PUBLIC_BWICK_DENOM ?? "ubwick";
export const BWICK_DECIMALS = Number(
  process.env.NEXT_PUBLIC_BWICK_DECIMALS ?? "6"
);

// We previously defaulted to api.mainnet-beta.solana.com, but the public
// endpoint returns 403 on browser-origin getAccountInfo calls so the dApp
// can't read the mint without a real provider. Helius URL below is the
// operator's own key (same value as the local .env.local) — keep this in
// sync with whichever RPC you've baked into deploys. Override in
// .env.local for local dev.
export const SOLANA_RPC =
  process.env.NEXT_PUBLIC_SOLANA_RPC ??
  "https://mainnet.helius-rpc.com/?api-key=2916314b-ba6c-46bb-9cea-54700d73e36b";
export const BWICK_SPL_MINT =
  process.env.NEXT_PUBLIC_BWICK_SPL_MINT ??
  "34ep64AGdVpKkpDjnfhnnu7nbugzvDQ8Pv7dPHx5pump";
export const BRIDGE_PROGRAM_ID =
  process.env.NEXT_PUBLIC_BRIDGE_PROGRAM_ID ??
  "F6Y1rD5oTrxjs7xS8h4ZPrvbBpb5CwCZZK3GEg7gKe9C";
export const RELAYER_BWICK_ADDRESS =
  process.env.NEXT_PUBLIC_RELAYER_BWICK_ADDRESS ??
  "bwick16lfwdy2ljcnrqx6sladq0v3cls2xcknkng9h2x";

// Explorer base URL. When running from a localhost origin (dev / demo),
// auto-route to the local explorer on :3004 so tx links don't leave the
// machine. In any other origin (deployed), fall back to the configured
// production explorer.
const PROD_EXPLORER_URL =
  process.env.NEXT_PUBLIC_EXPLORER_URL ?? "https://explore.bwick.fun";
const LOCAL_EXPLORER_URL =
  process.env.NEXT_PUBLIC_LOCAL_EXPLORER_URL ?? "http://localhost:3004";

function isLocalOrigin(): boolean {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return h === "localhost" || h === "127.0.0.1" || h === "[::1]";
}

export function explorerBaseUrl(): string {
  return isLocalOrigin() ? LOCAL_EXPLORER_URL : PROD_EXPLORER_URL;
}

export function explorerTxUrl(hash: string): string {
  return `${explorerBaseUrl()}/tx/${hash}`;
}

export function explorerAccountUrl(addr: string): string {
  return `${explorerBaseUrl()}/account/${addr}`;
}

// Keplr ChainInfo payload for `window.keplr.experimentalSuggestChain`.
// Matches the bwickchain config in the launchpad / chain genesis.
export const KEPLR_CHAIN_INFO = {
  chainId: CHAIN_ID,
  chainName: "bwickchain",
  rpc: BWICK_RPC,
  rest: BWICK_REST,
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: "bwick",
    bech32PrefixAccPub: "bwickpub",
    bech32PrefixValAddr: "bwickvaloper",
    bech32PrefixValPub: "bwickvaloperpub",
    bech32PrefixConsAddr: "bwickvalcons",
    bech32PrefixConsPub: "bwickvalconspub",
  },
  currencies: [
    {
      coinDenom: "BWICK",
      coinMinimalDenom: BWICK_DENOM,
      coinDecimals: BWICK_DECIMALS,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "BWICK",
      coinMinimalDenom: BWICK_DENOM,
      coinDecimals: BWICK_DECIMALS,
      gasPriceStep: { low: 0.01, average: 0.025, high: 0.04 },
    },
  ],
  stakeCurrency: {
    coinDenom: "BWICK",
    coinMinimalDenom: BWICK_DENOM,
    coinDecimals: BWICK_DECIMALS,
  },
  features: ["cosmwasm"],
};
