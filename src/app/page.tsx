"use client";

import {
  DiscordLogo,
  FacebookLogo,
  GithubLogo,
  LinkedinLogo,
  MediumLogo,
  RedditLogo,
  TelegramLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";

const TOKEN_ADDRESS = "D367UTH5iaRdvR8MXLKuYdCa73yQt3Jx9xPiYPUypump";
const PUMP_FUN_URL = `https://pump.fun/coin/${TOKEN_ADDRESS}`;
const DEXSCREENER_API_URL = `https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`;

const navLinks = [
  { label: "Developers" },
  { label: "Explorer", caret: true },
  { label: "Learn", caret: true },
];

const socialLinks = [
  {
    label: "Telegram",
    icon: <TelegramLogo weight="fill" className="size-5" />,
  },
  { label: "X", icon: <XLogo weight="fill" className="size-5" /> },
  {
    label: "Discord",
    icon: <DiscordLogo weight="fill" className="size-5" />,
  },
  { label: "GitHub", icon: <GithubLogo weight="fill" className="size-5" /> },
  { label: "Medium", icon: <MediumLogo weight="fill" className="size-5" /> },
  {
    label: "Facebook",
    icon: <FacebookLogo weight="fill" className="size-5" />,
  },
  { label: "Reddit", icon: <RedditLogo weight="fill" className="size-5" /> },
  {
    label: "LinkedIn",
    icon: <LinkedinLogo weight="fill" className="size-5" />,
  },
];

type ChartStatus = "idle" | "loading" | "ready" | "error";

type DexScreenerResponse = {
  pairs?: DexScreenerPair[] | null;
};

type DexScreenerPair = {
  chainId: string;
  pairAddress: string;
  baseToken?: {
    symbol?: string;
  };
  quoteToken?: {
    symbol?: string;
  };
  url?: string;
};

export default function Home() {
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [chartStatus, setChartStatus] = useState<ChartStatus>("idle");
  const [chartUrl, setChartUrl] = useState<string | null>(null);
  const [pairLabel, setPairLabel] = useState("BWICK / SOL");

  useEffect(() => {
    if (!isChartOpen || chartUrl || chartStatus === "loading") {
      return;
    }

    let cancelled = false;

    async function loadPair() {
      setChartStatus("loading");

      const response = await fetch(DEXSCREENER_API_URL).catch(() => null);

      if (cancelled) {
        return;
      }

      if (!response?.ok) {
        setChartStatus("error");
        return;
      }

      const data = (await response.json()) as DexScreenerResponse;
      const pair =
        data.pairs?.find((entry) => entry.chainId === "solana") ??
        data.pairs?.[0];

      if (!pair) {
        setChartStatus("error");
        return;
      }

      setPairLabel(
        `${pair.baseToken?.symbol ?? "Token"} / ${pair.quoteToken?.symbol ?? "Pair"}`,
      );
      setChartUrl(getDexScreenerEmbedUrl(pair));
      setChartStatus("ready");
    }

    loadPair();

    return () => {
      cancelled = true;
    };
  }, [chartStatus, chartUrl, isChartOpen]);

  function handleChartToggle() {
    setIsChartOpen((current) => {
      const next = !current;

      if (next && chartStatus === "error") {
        setChartStatus("idle");
        setChartUrl(null);
      }

      return next;
    });
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background text-foreground">
      <header className="border-b border-line px-[18px]">
        <div className="mx-auto flex h-[72px] w-full max-w-[1884px] items-center gap-8">
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex size-7 items-center justify-center rounded-full bg-primary-darker text-primary-light">
              <BridgeGlyph className="size-4" />
            </div>
            <div className="text-[18px] font-semibold leading-none tracking-[-0.02em] text-foreground">
              BridgeFlow
            </div>
          </div>

          <nav className="hidden flex-1 items-center justify-between lg:flex">
            <div className="flex items-center gap-[30px] text-base leading-4 text-foreground">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  className="flex items-center gap-[6px] hover:text-primary-darker"
                >
                  <span>{link.label}</span>
                  {link.caret ? (
                    <ChevronDownIcon className="size-4 text-icon-muted" />
                  ) : null}
                </button>
              ))}

              <button
                type="button"
                className="flex items-center gap-[6px] text-base leading-4"
              >
                <SunburstIcon className="size-4 text-primary-darker" />
                <span>BRG</span>
                <ArrowUpRightIcon className="size-4 text-icon-muted" />
              </button>
            </div>

            <div className="flex items-center gap-6 text-base leading-4">
              <button type="button">Refer</button>
              <button
                type="button"
                className="flex items-center gap-[6px] text-primary-darker"
              >
                <span>Points</span>
                <TrophyIcon className="size-4" />
              </button>
              <button
                type="button"
                className="flex h-10 items-center justify-center gap-2 rounded-[4px] bg-cta px-4 text-[14px] leading-[18px] text-cta-foreground"
              >
                <WalletIcon className="size-4" />
                <span>Connect wallet</span>
              </button>
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-[4px] border border-line text-foreground"
              >
                <MoreVerticalIcon className="size-4" />
              </button>
            </div>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-[4px] bg-cta px-4 text-[14px] leading-[18px] text-cta-foreground"
            >
              <WalletIcon className="size-4" />
              <span>Connect wallet</span>
            </button>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-[4px] border border-line text-foreground"
            >
              <MoreVerticalIcon className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col px-[18px] pb-8 pt-6 lg:py-10">
        <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col lg:justify-center">
          <div className="mx-auto flex flex-1 flex-col gap-6 lg:min-h-[640px] lg:flex-row lg:items-start lg:justify-center lg:gap-12">
            <div className="order-1 w-full shrink-0 transition-transform duration-500 ease-out lg:w-[500px]">
              <div className="w-full">
                <div className="mb-[22px] flex items-center justify-between gap-3">
                  <div className="flex h-10 overflow-hidden rounded-[4px] border border-line bg-transparent">
                    <button
                      type="button"
                      className="min-w-[94px] bg-panel-2 px-6 text-[14px] leading-[18px] text-foreground"
                    >
                      Market
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <IconSquareButton
                      onClick={handleChartToggle}
                      active={isChartOpen}
                      ariaLabel={
                        isChartOpen ? "Hide market chart" : "Show market chart"
                      }
                    >
                      <ChartIcon className="size-4" />
                    </IconSquareButton>
                    <IconSquareButton muted>
                      <ReloadIcon className="size-4" />
                    </IconSquareButton>
                    <IconSquareButton>
                      <SettingsIcon className="size-4" />
                    </IconSquareButton>
                  </div>
                </div>

                <section className="rounded-[8px] border border-line p-4">
                  <div className="mb-2 flex items-center justify-between text-[14px] leading-[18px]">
                    <div className="font-medium">You pay</div>
                    <div className="text-muted-foreground">Balance: 0 USDC</div>
                  </div>
                  <div className="flex h-[60px] overflow-hidden rounded-[4px] border border-line bg-surface-inset">
                    <button
                      type="button"
                      className="flex w-[124px] items-center gap-3 border-r border-line px-4 text-left text-base leading-4"
                    >
                      <div className="relative shrink-0">
                        <span className="block size-7 rounded-full bg-[radial-gradient(circle_at_30%_30%,#e4cff8_0%,#9d6eb8_50%,#682760_100%)]" />
                        <span className="absolute -right-1 -top-1 block size-3.5 rounded-full border border-surface-inset bg-[linear-gradient(135deg,#dcc9f2_0%,#a67fc8_55%,#4a1d44_56%,#ffffff_100%)]" />
                      </div>
                      <span>USDC</span>
                      <ChevronDownIcon className="ml-auto size-4 text-icon-muted" />
                    </button>
                    <input
                      readOnly
                      value="0"
                      aria-label="You pay amount"
                      className="h-full flex-1 bg-transparent px-4 text-base leading-[22px] text-foreground outline-none"
                    />
                  </div>
                </section>

                <div className="flex justify-center py-[10px]">
                  <button
                    type="button"
                    className="flex size-10 items-center justify-center rounded-[4px] border border-line bg-primary-darker text-cta-strong-foreground"
                  >
                    <SwapIcon className="size-4" />
                  </button>
                </div>

                <section className="rounded-[8px] border border-line p-4">
                  <div className="mb-2 flex items-center justify-between text-[14px] leading-[18px]">
                    <div className="font-medium">You receive</div>
                    <div className="text-muted-foreground">Balance: 0 SOL</div>
                  </div>
                  <div className="flex h-[60px] overflow-hidden rounded-[4px] border border-line bg-surface-inset">
                    <button
                      type="button"
                      className="flex w-[124px] items-center gap-3 border-r border-line px-4 text-left text-base leading-4"
                    >
                      <div className="relative shrink-0">
                        <span className="block size-7 rounded-full bg-[linear-gradient(160deg,#c8aff0_0%,#a878c8_45%,#682760_100%)]" />
                        <span className="absolute -right-1 -top-1 block size-3.5 rounded-full border border-surface-inset bg-[linear-gradient(160deg,#c8aff0_0%,#a878c8_45%,#682760_100%)]" />
                      </div>
                      <span>SOL</span>
                      <ChevronDownIcon className="ml-auto size-4 text-icon-muted" />
                    </button>
                    <input
                      readOnly
                      value="0"
                      aria-label="You receive amount"
                      className="h-full flex-1 bg-transparent px-4 text-base leading-[22px] text-foreground outline-none"
                    />
                  </div>
                </section>

                <div className="mt-2 flex items-center justify-between rounded-[8px] border border-line px-4 py-[15px]">
                  <div className="rounded-[4px] bg-primary-light px-[10px] py-[4px] text-[12px] leading-[14px] tracking-[0.12em] text-primary-darker">
                    + 0 POINTS
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-[4px] bg-panel-2 px-3 py-[5px] text-[14px] leading-[18px] text-foreground"
                  >
                    <span>ETA: 1 sec</span>
                    <ChevronDownIcon className="size-4 text-icon-muted" />
                  </button>
                </div>

                <section className="mt-2 rounded-[8px] border border-line">
                  <div className="flex items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-3 text-[14px] leading-[18px] text-foreground">
                      <span className="flex size-5 items-center justify-center rounded-[4px] bg-primary-darker text-cta-strong-foreground">
                        <CheckIcon className="size-3.5" />
                      </span>
                      <span>Trade and Send to Another Address</span>
                    </div>
                    <button
                      type="button"
                      className="flex items-center gap-2 py-[2px] text-[14px] leading-[18px] text-foreground"
                    >
                      <span>Routing</span>
                      <ChevronDownIcon className="size-4 text-icon-muted" />
                    </button>
                  </div>

                  <div className="px-4 pb-4">
                    <input
                      readOnly
                      value=""
                      placeholder="Enter Solana address *"
                      className="mb-3 h-10 w-full rounded-[4px] border border-line bg-transparent px-4 text-[14px] leading-[18px] text-foreground outline-none placeholder:text-muted-foreground"
                    />

                    <div className="flex items-center gap-3 text-icon-muted">
                      <button
                        type="button"
                        className="flex h-6 items-center gap-2 rounded-[4px] bg-panel-2 px-3 text-[14px] leading-[18px] text-foreground"
                      >
                        <WalletIcon className="size-3.5" />
                        <span>Connect</span>
                      </button>
                      <span>Type/Paste or Connect recipient address</span>
                    </div>
                  </div>
                </section>

                <button
                  type="button"
                  className="mt-[14px] h-10 w-full rounded-[4px] bg-cta text-[14px] leading-[18px] text-cta-foreground"
                >
                  Connect wallet
                </button>
              </div>
            </div>

            <section
              aria-hidden={!isChartOpen}
              className={`order-2 overflow-hidden transition-[max-height,opacity,max-width,transform,margin] duration-500 ease-out ${
                isChartOpen
                  ? "max-h-[620px] opacity-100 lg:max-h-none lg:w-[720px] lg:max-w-[720px] lg:translate-x-0"
                  : "max-h-0 opacity-0 lg:max-h-none lg:w-0 lg:max-w-0 lg:translate-x-10"
              }`}
            >
              <div className="flex h-[520px] min-h-0 flex-col overflow-hidden rounded-[12px] border border-line bg-panel shadow-[0_16px_48px_var(--shadow)] lg:h-[652px]">
                <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
                  <div>
                    <div className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      DexScreener
                    </div>
                    <div className="text-[16px] font-semibold leading-5 text-foreground">
                      {pairLabel}
                    </div>
                  </div>

                  <a
                    href={chartUrl ?? PUMP_FUN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-[4px] border border-line px-3 py-2 text-[13px] leading-4 text-foreground transition-colors hover:bg-panel-2"
                  >
                    <span>Open source</span>
                    <ArrowUpRightIcon className="size-4 text-icon-muted" />
                  </a>
                </div>

                <div className="relative flex-1 bg-[#0b1220]">
                  {chartUrl ? (
                    <iframe
                      title={`${pairLabel} chart`}
                      src={chartUrl}
                      className="absolute inset-0 h-full w-full border-0"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center text-[#d2dae8]">
                      <div className="text-[16px] font-semibold">
                        {chartStatus === "error"
                          ? "Unable to load chart right now"
                          : "Loading DexScreener chart"}
                      </div>
                      <p className="max-w-[440px] text-[14px] leading-6 text-[#99a3b8]">
                        {chartStatus === "error"
                          ? "The token pair could not be resolved from DexScreener. Try toggling again or swap in the final pair URL later."
                          : "Fetching the Solana pair for the provided token mint and opening the embedded market chart."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-line px-[18px] py-7">
        <div className="mx-auto flex w-full max-w-[1884px] flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3 text-[16px] leading-4 text-foreground">
            <div className="flex items-center gap-4">
              <button type="button">Careers</button>
              <button type="button">Brand Assets</button>
            </div>
            <div className="text-[14px] leading-[18px] text-muted-foreground">
              © 2026 BridgeFlow. All rights reserved.
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <div className="flex items-center gap-4 text-foreground">
              {socialLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  aria-label={link.label}
                  className="text-foreground transition-opacity hover:opacity-80"
                >
                  {link.icon}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-6 text-[14px] leading-[18px] text-muted-foreground">
              <button type="button">Terms of Service</button>
              <button type="button">Privacy Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function getDexScreenerEmbedUrl(pair: DexScreenerPair) {
  const path = pair.url
    ? pair.url.replace("https://dexscreener.com", "")
    : `/${pair.chainId}/${pair.pairAddress}`;

  return `https://dexscreener.com${path}?embed=1&theme=dark&trades=0&info=0`;
}

function BridgeGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 7.5a3.5 3.5 0 1 1 5.2 3v3a3.5 3.5 0 1 1-2.4 0v-3A3.5 3.5 0 0 1 6 7.5Zm7.8 3a3.5 3.5 0 1 1 2.4 0v3a3.5 3.5 0 1 1-2.4 0v-3Z" />
    </svg>
  );
}

function IconSquareButton({
  children,
  muted = false,
  active = false,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  muted?: boolean;
  active?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={active}
      className={`flex size-10 items-center justify-center rounded-[4px] border border-line transition-colors ${
        active
          ? "bg-primary-darker text-cta-strong-foreground"
          : muted
            ? "text-muted-foreground"
            : "text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Svg({
  children,
  className = "size-4",
  viewBox = "0 0 24 24",
}: SvgProps) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function WalletIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a3 3 0 0 1 3 3v1H5.5A2.5 2.5 0 0 0 3 11.5z" />
      <path d="M3 11.5A2.5 2.5 0 0 1 5.5 9H21v8a2 2 0 0 1-2 2H5.5A2.5 2.5 0 0 1 3 16.5z" />
      <circle cx="16.5" cy="14" r="1" />
    </Svg>
  );
}

function MoreVerticalIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </Svg>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M8 4h8v3a4 4 0 0 1-8 0z" />
      <path d="M6 5H4a2 2 0 0 0 2 4" />
      <path d="M18 5h2a2 2 0 0 1-2 4" />
      <path d="M12 11v5" />
      <path d="M9 20h6" />
      <path d="M10 16h4" />
    </Svg>
  );
}

function SunburstIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2l1.2 4.1L17 3.8l-1.9 3.8L19.5 7l-4.1 1.2L19 12l-3.6 1.1 4.1 1.2-4.4-.6L17 20.2l-3.8-2.3L12 22l-1.2-4.1L7 20.2l1.9-3.8-4.4.6 4.1-1.2L5 12l3.6-1.1L4.5 9l4.4.6L7 3.8l3.8 2.3z" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M4 18V6" />
      <path d="M4 18h16" />
      <path d="m7 14 3-3 3 2 4-5" />
    </Svg>
  );
}

function ReloadIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M20 11a8 8 0 0 0-14.9-3" />
      <path d="M4 4v4h4" />
      <path d="M4 13a8 8 0 0 0 14.9 3" />
      <path d="M20 20v-4h-4" />
    </Svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.7-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2H9a1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .7.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1v.2a1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.7z" />
    </Svg>
  );
}

function SwapIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M8 7V4l-4 4 4 4V9h12" />
      <path d="M16 17v3l4-4-4-4v3H4" />
    </Svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="m5 12 4 4 10-10" />
    </Svg>
  );
}

type SvgProps = {
  children: React.ReactNode;
  className?: string;
  viewBox?: string;
};
