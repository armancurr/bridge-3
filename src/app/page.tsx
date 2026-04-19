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

export default function Home() {
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

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background text-foreground">
      <header className="border-b border-[#1f242f] px-[18px]">
        <div className="mx-auto flex h-[72px] w-full max-w-[1884px] items-center gap-8">
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex size-7 items-center justify-center rounded-full bg-[#d5d931] text-[#03111c]">
              <BridgeGlyph className="size-4" />
            </div>
            <div className="text-[18px] font-semibold leading-none tracking-[-0.02em] text-[#f3f7ef]">
              BridgeFlow
            </div>
          </div>

          <nav className="hidden flex-1 items-center justify-between lg:flex">
            <div className="flex items-center gap-[30px] text-base leading-4 text-foreground">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  className="flex items-center gap-[6px] hover:text-white"
                >
                  <span>{link.label}</span>
                  {link.caret ? (
                    <ChevronDownIcon className="size-4 text-[#8d958d]" />
                  ) : null}
                </button>
              ))}

              <button
                type="button"
                className="flex items-center gap-[6px] text-base leading-4"
              >
                <SunburstIcon className="size-4 text-[#d5d931]" />
                <span>BRG</span>
                <ArrowUpRightIcon className="size-4 text-[#8d958d]" />
              </button>
            </div>

            <div className="flex items-center gap-6 text-base leading-4">
              <button type="button">Refer</button>
              <button
                type="button"
                className="flex items-center gap-[6px] text-[#d5d931]"
              >
                <span>Points</span>
                <TrophyIcon className="size-4" />
              </button>
              <button
                type="button"
                className="flex h-10 items-center justify-center gap-2 rounded-[4px] bg-[#d5d931] px-4 text-[14px] leading-[18px] text-[#03111c]"
              >
                <WalletIcon className="size-4" />
                <span>Connect wallet</span>
              </button>
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-[4px] border border-[#1f242f] text-[#e6ede4]"
              >
                <MoreVerticalIcon className="size-4" />
              </button>
            </div>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-[4px] bg-[#d5d931] px-4 text-[14px] leading-[18px] text-[#03111c]"
            >
              <WalletIcon className="size-4" />
              <span>Connect wallet</span>
            </button>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-[4px] border border-[#1f242f] text-[#e6ede4]"
            >
              <MoreVerticalIcon className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col px-[18px] pb-8 pt-6">
        <div className="mx-auto w-full max-w-[500px]">
          <div className="mb-[22px] flex items-center justify-between gap-3">
            <div className="flex h-10 overflow-hidden rounded-[4px] border border-[#1f242f] bg-transparent">
              <button
                type="button"
                className="min-w-[94px] bg-[#242833] px-6 text-[14px] leading-[18px] text-[#e6ede4]"
              >
                Market
              </button>
            </div>

            <div className="flex items-center gap-2">
              <IconSquareButton>
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

          <section className="rounded-[8px] border border-[#1f242f] p-4">
            <div className="mb-2 flex items-center justify-between text-[14px] leading-[18px]">
              <div className="font-medium">You pay</div>
              <div className="text-[#a7ada5]">Balance: 0 USDC</div>
            </div>
            <div className="flex h-[60px] overflow-hidden rounded-[4px] border border-[#1f242f] bg-[#161b26]">
              <button
                type="button"
                className="flex w-[124px] items-center gap-3 border-r border-[#1f242f] px-4 text-left text-base leading-4"
              >
                <div className="relative shrink-0">
                  <span className="block size-7 rounded-full bg-[radial-gradient(circle_at_30%_30%,#66b7ff_0%,#2d75ef_50%,#0d3772_100%)]" />
                  <span className="absolute -right-1 -top-1 block size-3.5 rounded-full border border-[#161b26] bg-[linear-gradient(135deg,#8ec5ff_0%,#3e7dfb_55%,#0f1633_56%,#ffffff_100%)]" />
                </div>
                <span>USDC</span>
                <ChevronDownIcon className="ml-auto size-4 text-[#8d958d]" />
              </button>
              <input
                readOnly
                value="0"
                aria-label="You pay amount"
                className="h-full flex-1 bg-transparent px-4 text-base leading-[22px] text-[#e6ede4] outline-none"
              />
            </div>
          </section>

          <div className="flex justify-center py-[10px]">
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-[4px] border border-[#1f242f] bg-[#03111c] text-[#e6ede4]"
            >
              <SwapIcon className="size-4" />
            </button>
          </div>

          <section className="rounded-[8px] border border-[#1f242f] p-4">
            <div className="mb-2 flex items-center justify-between text-[14px] leading-[18px]">
              <div className="font-medium">You receive</div>
              <div className="text-[#a7ada5]">Balance: 0 SOL</div>
            </div>
            <div className="flex h-[60px] overflow-hidden rounded-[4px] border border-[#1f242f] bg-[#161b26]">
              <button
                type="button"
                className="flex w-[124px] items-center gap-3 border-r border-[#1f242f] px-4 text-left text-base leading-4"
              >
                <div className="relative shrink-0">
                  <span className="block size-7 rounded-full bg-[linear-gradient(160deg,#30f0b0_0%,#60e3ff_45%,#7d55ff_100%)]" />
                  <span className="absolute -right-1 -top-1 block size-3.5 rounded-full border border-[#161b26] bg-[linear-gradient(160deg,#30f0b0_0%,#60e3ff_45%,#7d55ff_100%)]" />
                </div>
                <span>SOL</span>
                <ChevronDownIcon className="ml-auto size-4 text-[#8d958d]" />
              </button>
              <input
                readOnly
                value="0"
                aria-label="You receive amount"
                className="h-full flex-1 bg-transparent px-4 text-base leading-[22px] text-[#e6ede4] outline-none"
              />
            </div>
          </section>

          <div className="mt-2 flex items-center justify-between rounded-[8px] border border-[#1f242f] px-4 py-[15px]">
            <div className="rounded-[4px] bg-[#28330d] px-[10px] py-[4px] text-[12px] leading-[14px] tracking-[0.12em] text-[#d5d931]">
              + 0 POINTS
            </div>
            <button
              type="button"
              className="flex items-center gap-2 rounded-[4px] bg-[#242833] px-3 py-[5px] text-[14px] leading-[18px] text-[#e6ede4]"
            >
              <span>ETA: 1 sec</span>
              <ChevronDownIcon className="size-4 text-[#8d958d]" />
            </button>
          </div>

          <section className="mt-2 rounded-[8px] border border-[#1f242f]">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3 text-[14px] leading-[18px] text-[#e6ede4]">
                <span className="flex size-5 items-center justify-center rounded-[4px] bg-[#71831f] text-[#03111c]">
                  <CheckIcon className="size-3.5" />
                </span>
                <span>Trade and Send to Another Address</span>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 py-[2px] text-[14px] leading-[18px] text-[#e6ede4]"
              >
                <span>Routing</span>
                <ChevronDownIcon className="size-4 text-[#8d958d]" />
              </button>
            </div>

            <div className="px-4 pb-4">
              <input
                readOnly
                value=""
                placeholder="Enter Solana address *"
                className="mb-3 h-10 w-full rounded-[4px] border border-[#1f242f] bg-transparent px-4 text-[14px] leading-[18px] text-[#e6ede4] outline-none placeholder:text-[#6d756f]"
              />

              <div className="flex items-center gap-3 text-[#8d958d]">
                <button
                  type="button"
                  className="flex h-6 items-center gap-2 rounded-[4px] bg-[#242833] px-3 text-[14px] leading-[18px] text-[#e6ede4]"
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
            className="mt-[14px] h-10 w-full rounded-[4px] bg-[#d5d931] text-[14px] leading-[18px] text-[#03111c]"
          >
            Connect wallet
          </button>
        </div>
      </main>

      <footer className="border-t border-[#1f242f] px-[18px] py-7">
        <div className="mx-auto flex w-full max-w-[1884px] flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3 text-[16px] leading-4 text-[#e6ede4]">
            <div className="flex items-center gap-4">
              <button type="button">Careers</button>
              <button type="button">Brand Assets</button>
            </div>
            <div className="text-[14px] leading-[18px] text-[#e6ede4]">
              © 2026 BridgeFlow. All rights reserved.
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <div className="flex items-center gap-4 text-[#e6ede4]">
              {socialLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  aria-label={link.label}
                  className="text-[#e6ede4] transition-opacity hover:opacity-80"
                >
                  {link.icon}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-6 text-[14px] leading-[18px] text-[#e6ede4]">
              <button type="button">Terms of Service</button>
              <button type="button">Privacy Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
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
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex size-10 items-center justify-center rounded-[4px] border border-[#1f242f] ${muted ? "text-[#66706b]" : "text-[#e6ede4]"}`}
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
