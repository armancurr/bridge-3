export default function Home() {
  const navLinks = [
    { label: "Developers" },
    { label: "Explorer", caret: true },
    { label: "Learn", caret: true },
  ];

  const socialLinks = [
    { label: "Telegram", icon: <TelegramIcon /> },
    { label: "X", icon: <XIcon /> },
    { label: "Discord", icon: <DiscordIcon /> },
    { label: "GitHub", icon: <GitHubIcon /> },
    { label: "Medium", icon: <MediumIcon /> },
    { label: "Facebook", icon: <FacebookIcon /> },
    { label: "Reddit", icon: <RedditIcon /> },
    { label: "LinkedIn", icon: <LinkedInIcon /> },
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
              <button
                type="button"
                className="min-w-[79px] px-6 text-[14px] leading-[18px] text-[#a7ada5]"
              >
                Limit
              </button>
              <button
                type="button"
                className="min-w-[74px] px-6 text-[14px] leading-[18px] text-[#a7ada5]"
              >
                P2P
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

      <div className="fixed bottom-[46px] right-[18px] flex items-center gap-4">
        <FloatingButton>
          <HeadphonesIcon className="size-5 text-[#d5d931]" />
        </FloatingButton>
        <FloatingButton>
          <ChatIcon className="size-5 text-[#d5d931]" />
        </FloatingButton>
      </div>
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

function FloatingButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex size-12 items-center justify-center rounded-[4px] border border-[#1f242f] bg-[#03111c] shadow-[0_0_0_1px_rgba(31,36,47,0.2)]"
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

function HeadphonesIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M4 13v4a2 2 0 0 0 2 2h2v-7H6a2 2 0 0 0-2 2Z" />
      <path d="M20 13v4a2 2 0 0 1-2 2h-2v-7h2a2 2 0 0 1 2 2Z" />
    </Svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M5 6h14v10H9l-4 3z" />
      <path d="M8 10h8" />
      <path d="M8 13h6" />
    </Svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path d="m21.7 4.4-3 14.2c-.2 1-1 1.2-1.7.8l-4.6-3.4-2.2 2.2c-.2.2-.4.4-.9.4l.3-4.7 8.7-7.8c.4-.4-.1-.6-.6-.3L7 12.5 2.5 11c-1-.3-1-1 0-1.4l17.5-6.8c.8-.3 1.5.2 1.2 1.6Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M18.9 3H22l-6.8 7.8L23 21h-6.2l-4.8-6.3L6.5 21H3.4l7.3-8.4L1 3h6.3l4.4 5.8zM17.8 19h1.7L6.3 4.9H4.5z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M20 5.5A16.4 16.4 0 0 0 15.9 4l-.2.4a11 11 0 0 1 3.2 1.6 11.4 11.4 0 0 0-6.9-2.1A11.4 11.4 0 0 0 5 6a11 11 0 0 1 3.3-1.6L8 4A16.4 16.4 0 0 0 4 5.5C1.4 9.3.7 13 1 16.7A16.6 16.6 0 0 0 6 19.2l1.2-1.9c-.7-.3-1.4-.7-2-1.1l.5-.4a11.9 11.9 0 0 0 12.5 0l.5.4c-.6.4-1.3.8-2 1.1l1.2 1.9a16.6 16.6 0 0 0 5-2.5c.4-4.3-.6-7.9-2.9-11.2ZM9.5 14.4c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm5 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6V21c-3.3.7-4-1.4-4-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1 .1 1.7 1.1 1.7 1.1 1 .1 1.9-.8 2.2-1.2.1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.4-5.5-6a4.7 4.7 0 0 1 1.2-3.2 4.4 4.4 0 0 1 .1-3.2s1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.4 4.4 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.2 3.2c0 4.6-2.8 5.7-5.5 6 .4.3.8 1 .8 2.1v3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M2 6.5 3.4 8v8.1L2 17.5v.3h5.6v-.3l-1.4-1.4V8.7l4.2 9.1h.5l3.6-9.1v8.9l-1.2 1.1v.3H20v-.3l-1.2-1.1V6.4L20 5.2V5h-4.5L12.3 13 9 5H4z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5a19.1 19.1 0 0 0-2.2-.1c-2.2 0-3.7 1.3-3.7 3.9v1.9H8V14h2.5v7z" />
    </svg>
  );
}

function RedditIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M14.7 8.3 15.4 5l2.3.5a1.5 1.5 0 1 0 .3-1l-2.8-.6a.6.6 0 0 0-.7.5l-.8 3.7a7.9 7.9 0 0 0-7 1.1 1.7 1.7 0 1 0-1 3.1v.2c0 3 2.8 5.5 6.3 5.5s6.3-2.5 6.3-5.5v-.2a1.7 1.7 0 1 0-1-3.1 7.8 7.8 0 0 0-3.6-1Zm-4 4.7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm4.8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5 2.4a3.2 3.2 0 0 0 3 1.5 3.3 3.3 0 0 0 3-1.5.4.4 0 0 0-.4-.6h-5.2a.4.4 0 0 0-.4.6Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M4.98 3.5A1.75 1.75 0 1 0 5 7a1.75 1.75 0 0 0-.02-3.5ZM3.5 8.5h3V20h-3zM9 8.5h2.9v1.6h.1c.4-.8 1.4-1.9 3-1.9 3.2 0 3.8 2.1 3.8 4.8V20h-3v-6c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3V20H9z" />
    </svg>
  );
}

type SvgProps = {
  children: React.ReactNode;
  className?: string;
  viewBox?: string;
};
