"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type CardView = "swap" | "wallet" | "token" | "history" | "settings";

function SquidMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="#f4f2f8" />
      <path
        d="M12 7.5c-2.8 0-4.8 2.2-4.8 5.2 0 1.8.7 3.4 2 4.5l4.4 3.8c1.2 1 1.8 2.3 1.8 3.8 0 .8-.2 1.5-.5 2.2-2.7-.5-5.3-2.4-6.8-5.2-2-3.8-1.3-8.8 1.9-12 1-.9 2.4-1.6 3.8-2 .5-.2.8 0 .8.4 0 .6-.6 1.1-1.1 1.6-.4.4-.9.9-1.5 1.7z"
        fill="#1a1b20"
      />
      <path
        d="M20 24.5c2.8 0 4.8-2.2 4.8-5.2 0-1.8-.7-3.4-2-4.5l-4.4-3.8c-1.2-1-1.8-2.3-1.8-3.8 0-.8.2-1.5.5-2.2 2.7.5 5.3 2.4 6.8 5.2 2 3.8 1.3 8.8-1.9 12-1 .9-2.4 1.6-3.8 2-.5.2-.8 0-.8-.4 0-.6.6-1.1 1.1-1.6.4-.4.9-.9 1.5-1.7z"
        fill="#1a1b20"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M7 7h11m0 0-3-3m3 3-3 3M17 17H6m0 0 3 3m-3-3 3-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.9" fill="none" />
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        d="M11.0195 3.55153C11.6283 3.20907 12.3717 3.20907 12.9805 3.55153L18.9805 6.92649C19.6103 7.28073 20 7.9471 20 8.66965V15.3302C20 16.0528 19.6103 16.7192 18.9805 17.0734L12.9805 20.4484C12.3717 20.7908 11.6283 20.7908 11.0195 20.4484L5.01954 17.0737C4.38975 16.7195 4 16.0531 4 15.3305L4 8.66963C4 7.94707 4.38973 7.2807 5.01949 6.92647L11.0195 3.55153Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M15 12C15 13.6569 13.6569 15 12 15C10.3432 15 9.00003 13.6569 9.00003 12C9.00003 10.3431 10.3432 9 12 9C13.6569 9 15 10.3431 15 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M14 5h5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14 19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MoneyIcon() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#9da0bb] text-[12px] font-semibold text-[#1d2028]">1</span>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" aria-hidden="true">
      <path
        d="M4 7.75A2.75 2.75 0 0 1 6.75 5h9.5A2.75 2.75 0 0 1 19 7.75V9h-2.75A3.25 3.25 0 0 0 13 12.25v.5A3.25 3.25 0 0 0 16.25 16H19v.25A2.75 2.75 0 0 1 16.25 19h-9.5A2.75 2.75 0 0 1 4 16.25v-8.5Z"
        fill="currentColor"
      />
      <path
        d="M14.5 12.25A1.75 1.75 0 0 1 16.25 10.5H20v4h-3.75a1.75 1.75 0 0 1-1.75-1.75v-.5Z"
        fill="#191b1f"
      />
      <circle cx="16.75" cy="12.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="m16.5 16.5 3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WalletConnectIcon() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3b95f1] text-white">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M3 9.5c2.3 0 3.5 1.8 4.6 3.3 1-1.5 2.3-3.3 4.5-3.3 2.3 0 3.5 1.8 4.6 3.3 1-1.5 2.3-3.3 4.3-3.3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M3 14.5c2.3 0 3.5 1.8 4.6 3.3 1-1.5 2.3-3.3 4.5-3.3 2.3 0 3.5 1.8 4.6 3.3 1-1.5 2.3-3.3 4.3-3.3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function LedgerIcon() {
  return (
    <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#070809] text-white">
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <path d="M4 4h6v2H6v4H4V4Zm10 0h6v6h-2V6h-4V4ZM4 14h2v4h4v2H4v-6Zm14 4v-4h2v6h-6v-2h4Z" fill="currentColor" />
      </svg>
      <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-white p-[1px] text-black">
        <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
          <path d="M2 8.5 8.5 2H10v1.5L3.5 10H2V8.5Z" fill="currentColor" />
          <path d="M2 6h4v4H2V6Z" fill="currentColor" />
        </svg>
      </span>
    </span>
  );
}

function MetaMaskIcon() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
      <span className="text-[22px]">🦊</span>
    </span>
  );
}

function CoinbaseIcon() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1659f5]">
      <span className="flex h-5 w-5 items-center justify-center rounded-[6px] bg-white text-[#1659f5] text-[10px] font-bold">■</span>
    </span>
  );
}

function BrowserExtensionIcon() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b184e6] text-white">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="4" y="5" width="16" height="14" rx="2" fill="currentColor" />
        <rect x="6.5" y="8" width="11" height="8" rx="1" fill="#ffffff" />
        <path d="M8 3.75h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function BrowseWalletsIcon() {
  return (
    <span className="grid h-10 w-10 grid-cols-2 gap-0.5 rounded-xl bg-[#22252c] p-1">
      <span className="flex items-center justify-center rounded-[6px] bg-[#2563ff] text-white text-[10px] font-bold">C</span>
      <span className="flex items-center justify-center rounded-[6px] bg-[#1f8b4c] text-white text-[10px] font-bold">T</span>
      <span className="flex items-center justify-center rounded-[6px] bg-[#3ea0ff] text-white text-[10px] font-bold">W</span>
      <span className="flex items-center justify-center rounded-[6px] bg-[#9b7de3] text-white text-[10px] font-bold">P</span>
    </span>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 21a8 8 0 0 0 8-8V12a8 8 0 0 0-16 0v1a8 8 0 0 0 8 8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M7 13v2M17 13v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 18c.7-.6 1.8-1 3-1s2.3.4 3 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M10 13a5 5 0 0 0 7.1 0l1.4-1.4a5 5 0 0 0-7.1-7.1L10 4.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11a5 5 0 0 0-7.1 0L5.5 12.4a5 5 0 1 0 7.1 7.1L14 19.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M6 4h10a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2V6a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M8 8h8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PuzzleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M9 7a2 2 0 1 1 4 0v1h3a2 2 0 0 1 2 2v2h-1a2 2 0 1 0 0 4h1v2a2 2 0 0 1-2 2h-3v-1a2 2 0 1 0-4 0v1H6a2 2 0 0 1-2-2v-3h1a2 2 0 1 0 0-4H4v-3a2 2 0 0 1 2-2h3V7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M12 3c2.6 2.4 4 5.4 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.4-4-9s1.4-6.6 4-9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function LeftSidebar({ onClose }: { onClose: () => void }) {
  return (
    <aside
      id="left-sidebar"
      className="fixed left-2 top-1 bottom-11 z-50 flex w-[calc(100vw-16px)] max-w-[312px] flex-col overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#17191c_0%,#111317_100%)] shadow-[12px_0_40px_rgba(0,0,0,0.32)] ring-1 ring-white/6"
    >
      <div className="flex items-center justify-between gap-4 px-4 pt-4 text-[#d1d6e0]">
        <div className="flex items-center gap-3">
          <SquidMark />
          <span className="text-[18px] leading-[18px] text-[#fbfbfd]">Squid</span>
        </div>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="rounded-full p-2 text-[#d1d6e0] transition hover:bg-white/6"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="mt-4 border-t border-[#fbfbfd1a]" />

      <nav className="flex-1 overflow-y-auto px-3 py-4 text-[#d1d6e0]">
        <a href="#" className="flex items-center gap-3 rounded-2xl px-4 py-2 text-[18px] hover:bg-white/4">
          <span className="text-[#cfd3dd]">
            <HomeIcon />
          </span>
          <span>Home</span>
        </a>
        <a href="#" className="mt-1 flex items-center gap-3 rounded-2xl px-4 py-2 text-[18px] hover:bg-white/4">
          <span className="text-[#cfd3dd]">
            <SupportIcon />
          </span>
          <span>Support</span>
        </a>

        <div className="mt-5 px-4 text-[14px] leading-[14px] text-[#676b7e]">Products</div>
        <a
          href="#"
          className="mt-2 flex items-center gap-3 rounded-2xl bg-[#6f4db8]/90 px-4 py-2.5 text-[18px] text-white shadow-[0_10px_30px_rgba(111,77,184,0.22)]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
            <SwapIcon />
          </span>
          <span>Swap</span>
        </a>

        <div className="mt-5 px-4 text-[14px] leading-[14px] text-[#676b7e]">Learn</div>
        <a href="#" className="mt-2 flex items-center gap-3 rounded-2xl px-4 py-2 text-[18px] hover:bg-white/4">
          <span className="text-[#cfd3dd]">
            <LinkIcon />
          </span>
          <span>Squid Ecosystem</span>
        </a>
        <a href="#" className="mt-1 flex items-center gap-3 rounded-2xl px-4 py-2 text-[18px] hover:bg-white/4">
          <span className="text-[#cfd3dd]">
            <BookIcon />
          </span>
          <span>Squid School</span>
        </a>

        <div className="mt-5 px-4 text-[14px] leading-[14px] text-[#676b7e]">Social</div>
        <a href="#" className="mt-2 flex items-center gap-3 rounded-2xl px-4 py-2 text-[18px] hover:bg-white/4">
          <span className="text-[#cfd3dd]">D</span>
          <span>Discord</span>
        </a>
        <a href="#" className="mt-1 flex items-center gap-3 rounded-2xl px-4 py-2 text-[18px] hover:bg-white/4">
          <span className="text-[#cfd3dd]">X</span>
          <span>x.com</span>
        </a>
        <a href="#" className="mt-1 flex items-center gap-3 rounded-2xl px-4 py-2 text-[18px] hover:bg-white/4">
          <span className="text-[#cfd3dd]">M</span>
          <span>Mirror</span>
        </a>

        <div className="mt-5 px-4 text-[14px] leading-[14px] text-[#676b7e]">Developers</div>
        <a href="#" className="mt-2 flex items-center gap-3 rounded-2xl px-4 py-2 text-[18px] hover:bg-white/4">
          <span className="text-[#cfd3dd]">GH</span>
          <span>GitHub</span>
        </a>
        <a href="#" className="mt-1 flex items-center gap-3 rounded-2xl px-4 py-2 text-[18px] hover:bg-white/4">
          <span className="text-[#cfd3dd]">
            <BookIcon />
          </span>
          <span>Developer Docs</span>
        </a>
        <a href="#" className="mt-1 flex items-center gap-3 rounded-2xl px-4 py-2 text-[18px] hover:bg-white/4">
          <span className="text-[#cfd3dd]">
            <PuzzleIcon />
          </span>
          <span>Widget Studio</span>
        </a>
      </nav>

      <div className="px-6 pb-5 pt-3 text-[15px] text-[#a8adbe]">
        <div className="flex items-center justify-between">
          <div>
            <span className="opacity-75">Terms</span>
            <span className="px-2 opacity-40">|</span>
            <span className="opacity-75">Privacy</span>
          </div>
          <button
            type="button"
            aria-label="Language"
            className="rounded-full p-2 text-[#cfd3dd] transition hover:bg-white/6"
          >
            <GlobeIcon />
          </button>
        </div>
      </div>
    </aside>
  );
}

function SlidersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M6 7v10M12 4v16M18 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="6" cy="10" r="1.5" fill="currentColor" />
      <circle cx="12" cy="8" r="1.5" fill="currentColor" />
      <circle cx="18" cy="13" r="1.5" fill="currentColor" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Zm6.5 10.5.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8ZM5.5 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HelpIcon() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#676b7e] text-[14px] font-medium text-[#17191c]">?</span>
  );
}

function ToggleOff() {
  return (
    <span className="relative flex h-[30px] w-[52px] items-center rounded-full border border-[#434753] bg-[#292c32] px-[3px]">
      <span className="ml-auto block h-6 w-6 rounded-full bg-[#a7abbe]" />
    </span>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path d="M10 6 4 12l6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12h15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChainLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M10 8.5 8.5 7A4 4 0 1 0 2.8 12.7l1.5 1.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 15.5 15.5 17a4 4 0 0 0 5.7-5.7l-1.5-1.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m8 16 8-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z" fill="currentColor" />
    </svg>
  );
}

function AssetIcon({
  src,
  alt,
  size = 36,
  className = "",
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full ${className}`.trim()}
    />
  );
}

function SelectorArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path
        d="M6.66675 14L9.64035 8.64754C9.86407 8.24484 9.86407 7.75519 9.64035 7.35249L6.66675 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function FlipArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        d="M18 14.5L12 20.5L6 14.5M12 19.5V4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function PayAssetSelector() {
  return (
    <button className="group relative flex h-10 items-center text-[#d1d6e0] focus:outline-none">
      <span className="absolute left-0 top-0 z-10 h-10 w-[72px] text-[#fbfbfd1a]">
        <svg viewBox="0 0 72 40" className="h-10 w-[72px] fill-current" aria-hidden="true">
          <path d="m57.86 5.86c-.53.53-1.05 1.06-1.56 1.59-3.29 3.38-6.37 6.55-10.3 6.55s-7.01-3.17-10.3-6.55c-.51-.53-1.03-1.06-1.56-1.59-3.9-3.91-9.02-5.86-14.14-5.86s-10.24 1.95-14.14 5.86c-3.91 3.9-5.86 9.02-5.86 14.14s1.95 10.24 5.86 14.14c3.91 3.91 9.02 5.86 14.14 5.86s10.24-1.95 14.14-5.86c.52-.53 1.04-1.06 1.55-1.58 3.29-3.39 6.37-6.56 10.31-6.56s7.02 3.17 10.31 6.56c.51.53 1.03 1.06 1.55 1.58 3.91 3.91 9.02 5.86 14.14 5.86v-40c-5.12 0-10.24 1.95-14.14 5.86zm14.14 33.14c-5.07 0-9.85-1.98-13.43-5.56-.52-.52-1.02-1.04-1.54-1.57-3.43-3.53-6.67-6.86-11.02-6.86s-7.6 3.33-11.04 6.88c-.5.52-1.01 1.04-1.53 1.56-3.59 3.59-8.36 5.57-13.44 5.57s-9.85-1.98-13.43-5.57c-3.59-3.59-5.56-8.36-5.56-13.43s1.98-9.85 5.56-13.44c3.58-3.6 8.35-5.58 13.43-5.58s9.85 1.98 13.44 5.57c.52.52 1.04 1.05 1.55 1.58 3.43 3.53 6.66 6.86 11.02 6.86s7.59-3.33 11.02-6.86c.51-.52 1.02-1.05 1.55-1.58 3.59-3.59 8.36-5.56 13.43-5.56v38z" />
        </svg>
      </span>
      <span className="relative z-20 flex h-10 w-[72px] items-center justify-start bg-transparent pl-0">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2c374b]">
        <AssetIcon src="/tokens/arb.png" alt="Arbitrum" size={32} />
        </span>
      </span>
      <span className="relative z-20 -ml-[1px] flex h-10 min-w-fit items-center gap-1 rounded-r-full border border-l-0 border-[#6f86e6] bg-[#627eeb] py-1 pr-3 pl-[7px] text-white before:absolute before:inset-[-3px] before:z-[-1] before:w-[calc(100%+3px)] before:translate-x-[3px] before:rounded-r-full before:border-2 before:border-l-0 before:border-transparent after:absolute after:inset-[-5px] after:z-[-2] after:w-[calc(100%+4px)] after:translate-x-[6px] after:rounded-r-full after:border-4 after:border-l-0 after:border-transparent">
        <span className="relative mr-2 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
          <span className="absolute inset-y-0 right-0 w-[18px] bg-[#627eeb]" />
          <AssetIcon src="/tokens/eth.svg" alt="ETH" size={32} className="relative z-10" />
        </span>
        <span className="text-[14px] leading-[13px] font-normal">ETH</span>
        <SelectorArrowIcon className="h-4 w-4 min-w-4 opacity-66" />
      </span>
    </button>
  );
}

function ReceiveAssetSelector({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="group relative flex h-10 w-fit items-center text-[#d1d6e0] focus:outline-none">
      <span className="absolute left-0 top-0 z-10 h-10 w-[72px] text-[#fbfbfd1a]">
        <svg viewBox="0 0 72 40" className="h-10 w-[72px] fill-current" aria-hidden="true">
          <path d="m57.86 5.86c-.53.53-1.05 1.06-1.56 1.59-3.29 3.38-6.37 6.55-10.3 6.55s-7.01-3.17-10.3-6.55c-.51-.53-1.03-1.06-1.56-1.59-3.9-3.91-9.02-5.86-14.14-5.86s-10.24 1.95-14.14 5.86c-3.91 3.9-5.86 9.02-5.86 14.14s1.95 10.24 5.86 14.14c3.91 3.91 9.02 5.86 14.14 5.86s10.24-1.95 14.14-5.86c.52-.53 1.04-1.06 1.55-1.58 3.29-3.39 6.37-6.56 10.31-6.56s7.02 3.17 10.31 6.56c.51.53 1.03 1.06 1.55 1.58 3.91 3.91 9.02 5.86 14.14 5.86v-40c-5.12 0-10.24 1.95-14.14 5.86zm14.14 33.14c-5.07 0-9.85-1.98-13.43-5.56-.52-.52-1.02-1.04-1.54-1.57-3.43-3.53-6.67-6.86-11.02-6.86s-7.6 3.33-11.04 6.88c-.5.52-1.01 1.04-1.53 1.56-3.59 3.59-8.36 5.57-13.44 5.57s-9.85-1.98-13.43-5.57c-3.59-3.59-5.56-8.36-5.56-13.43s1.98-9.85 5.56-13.44c3.58-3.6 8.35-5.58 13.43-5.58s9.85 1.98 13.44 5.57c.52.52 1.04 1.05 1.55 1.58 3.43 3.53 6.66 6.86 11.02 6.86s7.59-3.33 11.02-6.86c.51-.52 1.02-1.05 1.55-1.58 3.59-3.59 8.36-5.56 13.43-5.56v38z" />
        </svg>
      </span>
      <span className="relative z-20 flex h-10 w-[72px] items-center justify-start bg-transparent pl-0">
        <span className="flex h-10 w-10 items-center justify-center text-[#fbfbfd]">
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path d="M12 17V12M12 12V7M12 12H17M12 12H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </span>
      </span>
      <span className="relative z-20 -ml-[1px] flex h-10 min-w-fit items-center gap-1 rounded-r-full border border-l-0 border-[#27292c] bg-[#17191c] py-1 pr-3 pl-[7px] text-[#d1d6e0] before:absolute before:inset-[-3px] before:z-[-1] before:w-[calc(100%+3px)] before:translate-x-[3px] before:rounded-r-full before:border-2 before:border-l-0 before:border-transparent after:absolute after:inset-[-5px] after:z-[-2] after:w-[calc(100%+4px)] after:translate-x-[6px] after:rounded-r-full after:border-4 after:border-l-0 after:border-transparent">
        <span className="text-[14px] leading-[13px] font-normal">Select token</span>
        <SelectorArrowIcon className="h-4 w-4 min-w-4 opacity-66" />
      </span>
    </button>
  );
}

function TokenPicker({ onBack }: { onBack: () => void }) {
  const chains = [
    { name: "Ethereum", badge: <AssetIcon src="/tokens/eth.svg" alt="Ethereum" /> },
    { name: "Bitcoin", badge: <AssetIcon src="/tokens/btc.svg" alt="Bitcoin" /> },
    { name: "Solana", badge: <AssetIcon src="/tokens/sol.svg" alt="Solana" /> },
    { name: "Arbitrum", badge: <AssetIcon src="/tokens/arb.png" alt="Arbitrum" /> },
    { name: "Optimism", badge: <AssetIcon src="/tokens/op.png" alt="Optimism" /> },
    { name: "Base", badge: <AssetIcon src="/tokens/base.png" alt="Base" /> },
    { name: "BNB Chain", badge: <AssetIcon src="/tokens/bnb.svg" alt="BNB Chain" /> },
    { name: "Osmosis", badge: <AssetIcon src="/tokens/osmo.png" alt="Osmosis" /> },
  ];

  const tokens = [
    {
      name: "Ethereum",
      symbol: "ETH",
      badge: <AssetIcon src="/tokens/eth.svg" alt="Ethereum" />,
      chain: <AssetIcon src="/tokens/eth.svg" alt="Ethereum network" size={18} />,
    },
    {
      name: "Binance",
      symbol: "BNB",
      badge: <AssetIcon src="/tokens/bnb.svg" alt="Binance" />,
      chain: <AssetIcon src="/tokens/bnb.svg" alt="BNB Chain" size={18} />,
    },
    {
      name: "Avalanche",
      symbol: "AVAX",
      badge: <AssetIcon src="/tokens/avax.svg" alt="Avalanche" />,
      chain: <AssetIcon src="/tokens/avax.svg" alt="Avalanche network" size={18} />,
    },
    {
      name: "Polygon",
      symbol: "POL",
      badge: <AssetIcon src="/tokens/matic.svg" alt="Polygon" />,
      chain: <AssetIcon src="/tokens/matic.svg" alt="Polygon network" size={18} />,
    },
    {
      name: "Filecoin",
      symbol: "FIL",
      badge: <AssetIcon src="/tokens/fil.svg" alt="Filecoin" />,
      chain: <AssetIcon src="/tokens/fil.svg" alt="Filecoin network" size={18} />,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      badge: <AssetIcon src="/tokens/eth.svg" alt="Ethereum" />,
      chain: <AssetIcon src="/tokens/arb.png" alt="Arbitrum network" size={18} />,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      badge: <AssetIcon src="/tokens/eth.svg" alt="Ethereum" />,
      chain: <AssetIcon src="/tokens/op.png" alt="Optimism network" size={18} />,
    },
    {
      name: "Fantom",
      symbol: "FTM",
      badge: <AssetIcon src="/tokens/ftm.png" alt="Fantom" />,
      chain: <AssetIcon src="/tokens/ftm.png" alt="Fantom network" size={18} />,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      badge: <AssetIcon src="/tokens/eth.svg" alt="Ethereum" />,
      chain: <AssetIcon src="/tokens/base.png" alt="Base network" size={18} />,
    },
  ];

  return (
    <div className="h-[658px] bg-[#191b1f]">
      <div className="flex items-center justify-between px-5 pt-4 text-[#d8dbe6]">
        <button onClick={onBack} className="flex h-10 w-[60px] items-center justify-center rounded-full bg-[#2b2e35] ring-1 ring-white/10">
          <BackIcon />
        </button>
        <div className="pr-10 text-[18px] font-medium">Select token to receive</div>
        <div className="w-[60px]" />
      </div>

      <div className="mt-5 flex gap-3 px-5">
        <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full border border-white/10 bg-[#1b1d22] px-4 text-[#6f7591]">
          <SearchIcon />
          <span className="text-[18px]">Chain</span>
        </div>
        <div className="flex h-10 min-w-0 flex-[1.65] items-center gap-2 rounded-full border-2 border-[#9e79d2] bg-[#1b1d22] px-4 text-[#6f7591] shadow-[0_0_0_3px_rgba(158,121,210,0.08)]">
          <SearchIcon />
          <span className="text-[18px]">Token</span>
        </div>
      </div>

      <div className="mt-4 border-t border-white/8 px-4 pt-3">
        <div className="grid grid-cols-[170px_minmax(0,1fr)] gap-5">
          <div>
            <button className="flex w-full items-center gap-3 rounded-[16px] bg-[#34363c] px-4 py-3 text-left text-[17px] font-medium text-[#e0e2ea]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8f67d4] text-white">
                <ChainLinkIcon />
              </span>
              <span>All Chains</span>
            </button>

            <div className="mt-4 flex items-center gap-2 text-[14px] text-[#b082ea]">
              <SparkleIcon />
              <span>Popular chains</span>
            </div>

            <div className="mt-3 space-y-3">
              {chains.map((chain) => (
                <button key={chain.name} className="flex items-center gap-3 text-left text-[17px] text-[#d8dbe6]">
                  {chain.badge}
                  <span>{chain.name}</span>
                </button>
              ))}
            </div>

            <button className="mt-5 flex items-center gap-2 text-[14px] text-[#a877ea]">
              <ChainLinkIcon />
              <span>Chains A-Z</span>
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2 text-[14px] text-[#b082ea]">
              <SparkleIcon />
              <span>Popular tokens</span>
            </div>

            <div className="mt-3 space-y-3">
              {tokens.map((token, index) => (
                <button key={`${token.name}-${token.symbol}-${index}`} className="flex w-full items-center gap-3 text-left text-[#d8dbe6]">
                  <div className="relative">
                    {token.badge}
                    <span className="absolute -bottom-1 -right-1 block scale-[0.7]">{token.chain}</span>
                  </div>
                  <span className="leading-tight">
                    <span className="block text-[17px] font-medium">{token.name}</span>
                    <span className="block text-[14px] text-[#8d92a8]">{token.symbol}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryView({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-[658px] bg-[#17191c]">
      <div className="px-5 pt-3">
        <button
          onClick={onBack}
          className="flex h-10 w-[60px] items-center justify-center rounded-[20px] border border-[#fbfbfd1a] bg-[#292c32] text-[#d1d6e0]"
        >
          <BackIcon />
        </button>
      </div>

      <div className="px-5 pt-6">
        <h1 className="text-[32px] leading-[32px] font-normal text-[#d1d6e0]">History</h1>
      </div>

      <div className="mt-4 border-t border-[#fbfbfd1a]" />

      <div className="flex min-h-[500px] items-center justify-center px-6 text-center">
        <p className="text-[17px] leading-[18px] text-[#676b7e]">Your transaction history will appear here</p>
      </div>
    </div>
  );
}

function SettingsView({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative min-h-[658px] overflow-hidden rounded-[30px] bg-[#17191c]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-8 top-20 h-24 w-24 rounded-full bg-[#ffffff10] blur-3xl" />
        <div className="absolute left-8 top-44 h-14 w-40 rounded-full bg-[#6d85ef] blur-2xl" />
        <div className="absolute right-20 top-6 h-20 w-20 rounded-full bg-[#ffffff10] blur-3xl" />
        <div className="absolute bottom-44 right-8 h-20 w-24 rounded-full bg-[#ffffff08] blur-3xl" />
        <div className="absolute bottom-56 left-24 h-20 w-20 rounded-full bg-[#ffffff08] blur-3xl" />
      </div>

      <div className="relative flex min-h-[658px] flex-col justify-end p-5">
        <div className="rounded-[28px] border border-[#434753] bg-[#2b2e35]/96 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-[#d1d6e0]">
              <span className="text-[#9e79d2]">
                <SlidersIcon />
              </span>
              <span className="text-[18px] leading-[18px]">Slippage</span>
              <HelpIcon />
            </div>
            <div className="flex items-center rounded-[14px] border border-[#434753] bg-[#25282e] p-1 text-[16px] leading-[16px]">
              <button className="rounded-[11px] border border-[#9e79d2] px-4 py-2 text-[#d1d6e0] shadow-[0_0_0_1px_rgba(158,121,210,0.15)]">
                Auto
              </button>
              <button className="px-4 py-2 text-[#d1d6e0] opacity-90">Custom</button>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-[#d1d6e0]">
              <span className="text-[#9e79d2]">
                <SparkIcon />
              </span>
              <span className="text-[18px] leading-[18px]">Degen mode</span>
              <HelpIcon />
            </div>
            <ToggleOff />
          </div>

          <div className="mt-4 border-t border-[#434753] pt-2 text-center text-[14px] leading-[14px] text-[#676b7e]">v6.10.0</div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 flex h-[60px] w-full items-center justify-center rounded-full bg-white text-[22px] leading-[22px] font-normal text-[#292c32] shadow-[0_0_30px_rgba(158,121,210,0.35)]"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function SignInSidebar({ onClose }: { onClose: () => void }) {
  const walletOptions = [
    { name: "Ledger", icon: <LedgerIcon />, meta: "Installed" },
    { name: "WalletConnect", icon: <WalletConnectIcon /> },
    { name: "MetaMask", icon: <MetaMaskIcon /> },
    { name: "Browse all wallets", icon: <BrowseWalletsIcon /> },
  ];

  return (
    <aside className="fixed inset-y-2 right-2 z-50 flex w-[calc(100vw-16px)] max-w-[401px] flex-col overflow-hidden rounded-[24px] bg-[#17191c] shadow-[-12px_0_40px_rgba(0,0,0,0.28)]">
      <div className="flex items-center justify-end gap-5 px-4 pt-3 text-[#d1d6e0]">
        <button className="text-[#d1d6e0]">
          <SettingsIcon />
        </button>
        <button onClick={onClose} className="rounded-full bg-[#e9ebf0] p-1 text-[#17191c]">
          <CloseIcon />
        </button>
      </div>

      <div className="px-5 pt-7">
        <h2 className="text-[36px] leading-[36px] font-normal text-[#d1d6e0]">Sign In</h2>
      </div>

      <div className="mt-4 border-t border-[#fbfbfd1a]" />

      <div className="px-5 py-5">
        <button className="flex items-center gap-2 text-[#9e79d2]">
          <span className="flex h-4 w-4 items-center justify-center rounded-[4px] bg-[#9e79d2] text-[#17191c]">
            <WalletIcon />
          </span>
          <span className="text-[16px] leading-[16px]">Connect Wallet</span>
        </button>

        <div className="mt-6 space-y-4">
          {walletOptions.map((option) => (
            <button key={option.name} className="flex w-full items-center justify-between text-left text-[#d1d6e0]">
              <span className="flex items-center gap-4">
                {option.icon}
                <span className="text-[17px] leading-[18px]">{option.name}</span>
              </span>
              <span className="flex items-center gap-2 text-[#9e79d2]">
                {option.meta ? <span className="text-[15px] leading-[15px]">{option.meta}</span> : null}
                <SelectorArrowIcon className="h-4 w-4 text-[#676b7e]" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function WalletModal({ onClose }: { onClose: () => void }) {
  const wallets = [
    { name: "WalletConnect", icon: <WalletConnectIcon /> },
    { name: "MetaMask", icon: <MetaMaskIcon /> },
    { name: "Coinbase Wallet", icon: <CoinbaseIcon /> },
    { name: "Browser Extension", icon: <BrowserExtensionIcon /> },
  ];

  return (
    <div className="bg-[linear-gradient(180deg,rgba(24,26,30,0.98)_0%,rgba(52,40,71,0.98)_100%)] p-10 pb-5">
      <div className="rounded-[26px] border border-white/10 bg-[#2b2e35] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
        <div className="flex items-center gap-3 rounded-full border-2 border-[#9e79d2] px-4 py-3 text-[#6f7591] shadow-[0_0_0_3px_rgba(158,121,210,0.08)]">
          <SearchIcon />
          <span className="text-[18px]">Select your wallet</span>
        </div>

        <div className="mt-4 space-y-2 pb-56">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              className="flex w-full items-center justify-between rounded-2xl px-2 py-2 text-left text-[#d8d9e1] transition hover:bg-white/4"
            >
              <span className="flex items-center gap-4 text-[20px] font-medium">
                {wallet.icon}
                <span>{wallet.name}</span>
              </span>
              <span className="text-[28px] leading-none text-[#7d8192]">›</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onClose}
        className="mt-5 flex h-[60px] w-full items-center justify-center rounded-full bg-white text-[22px] font-medium text-[#2a2c31] shadow-[0_0_30px_rgba(158,121,210,0.45)]"
      >
        Cancel
      </button>
    </div>
  );
}

export default function Home() {
  const [cardView, setCardView] = useState<CardView>("swap");
  const [isSignInSidebarOpen, setIsSignInSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsLeftSidebarOpen(false);
      setIsSignInSidebarOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const contentShiftClass =
    isLeftSidebarOpen && isSignInSidebarOpen
      ? "translate-x-0"
      : isLeftSidebarOpen
        ? "md:translate-x-6 lg:translate-x-10"
        : isSignInSidebarOpen
          ? "md:-translate-x-6 lg:-translate-x-10"
          : "translate-x-0";

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-3 pt-1 sm:px-4 sm:pt-2">
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={isLeftSidebarOpen}
          aria-controls="left-sidebar"
          onClick={() => setIsLeftSidebarOpen((open) => !open)}
          className={`flex h-12 items-center gap-3 rounded-full bg-[#191b21] px-4 shadow-[0_8px_20px_rgba(0,0,0,0.2)] ring-1 ring-white/6 transition-colors hover:bg-[#1b1d25] transition-transform duration-300 ease-out md:will-change-transform ${
            isLeftSidebarOpen ? "md:translate-x-6 lg:translate-x-10" : "translate-x-0"
          }`}
        >
          <SquidMark />
          <span className="text-[#e8e6ef]">
            <MenuIcon />
          </span>
        </button>

        <button
          onClick={() => setIsSignInSidebarOpen(true)}
          className={`relative z-10 rounded-full bg-[#191b21] px-5 py-3 text-[15px] font-medium text-white shadow-[0_8px_18px_rgba(0,0,0,0.2)] ring-1 ring-white/6 transition-transform duration-300 ease-out ${
            isSignInSidebarOpen ? "md:-translate-x-6 lg:-translate-x-10" : "translate-x-0"
          }`}
        >
          Sign In
        </button>
      </div>

      <section
        className={`flex min-h-screen items-center justify-center px-4 pb-10 pt-24 transition-transform duration-300 ease-out sm:px-6 md:pt-14 ${contentShiftClass}`}
      >
        <div className="w-full max-w-[480px] overflow-hidden rounded-[30px] border border-[#fbfbfd1a] bg-[#17191c] text-[#d1d6e0] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2),0px_5px_50px_-1px_rgba(0,0,0,0.33)] outline outline-1 outline-[#fbfbfd1a]">
          {cardView === "wallet" ? (
            <WalletModal onClose={() => setCardView("swap")} />
          ) : cardView === "settings" ? (
            <SettingsView onClose={() => setCardView("swap")} />
          ) : cardView === "history" ? (
            <HistoryView onBack={() => setCardView("swap")} />
          ) : cardView === "token" ? (
            <TokenPicker onBack={() => setCardView("swap")} />
          ) : (
            <>
              <nav className="flex max-h-[120px] flex-row-reverse bg-[#17191c] px-[15px] pt-6 text-[#d1d6e0]">
                <span className="flex flex-1 items-center justify-end gap-2">
                  <button
                    onClick={() => setCardView("history")}
                    className="flex h-10 min-w-[60px] items-center justify-center rounded-[20px] border border-[#fbfbfd1a] bg-[#292c32] text-[#d1d6e0] transition hover:border-[#fbfbfd54]"
                  >
                    <ClockIcon />
                  </button>
                  <button
                    onClick={() => setCardView("settings")}
                    className="flex h-10 min-w-[60px] items-center justify-center rounded-[20px] border border-[#fbfbfd1a] bg-[#292c32] text-[#d1d6e0] transition hover:border-[#fbfbfd54]"
                  >
                    <SettingsIcon />
                  </button>
                </span>
              </nav>

              <div className="px-6">
                <nav className="relative flex items-center">
                  <button className="relative flex h-12 items-center text-[#d1d6e0]">
                    <span className="text-[27px] leading-[28px] font-normal">Swap</span>
                  </button>
                  <div className="absolute bottom-0 h-0.5 w-[69px] rounded-[1px] bg-[#9e79d2]" />
                </nav>
              </div>

              <section className="relative flex w-full flex-col border-t border-[#fbfbfd1a] bg-[#17191c] pb-4">
                <header className="flex h-12 items-center px-4 py-1">
                  <button
                    onClick={() => setCardView("wallet")}
                    className="flex h-8 items-center gap-2 rounded-[10px] px-2 text-[#676b7e] transition hover:bg-[#fbfbfd1a]"
                  >
                    <span className="text-[17px] leading-[18px]">Pay</span>
                    <span className="text-[17px] leading-[18px] text-[#676b7e]">:</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#fbfbfd1a] bg-[#9e79d2] text-[#17191c]">
                      <WalletIcon />
                    </span>
                    <span className="text-[17px] leading-[18px] text-[#9e79d2]">Connect wallet</span>
                    <SelectorArrowIcon className="h-4 w-4 text-[#9e79d2] opacity-70" />
                  </button>
                </header>

                <div className="px-4">
                  <div className="relative w-fit">
                    <PayAssetSelector />
                  </div>
                </div>

                <div className="flex w-full flex-col">
                  <div className="h-[65px] px-2 pt-1 text-[54px] font-normal text-[#676b7e] md:h-[75px] md:px-4">
                    <div className="flex h-[55px] w-full items-center rounded-[10px] bg-transparent px-2">0</div>
                  </div>

                  <footer className="flex h-8 items-center justify-between gap-2 px-2 text-[#676b7e] md:px-4">
                    <button className="flex h-7 items-center gap-1.5 rounded-[10px] px-2 transition hover:bg-[#fbfbfd1a]">
                      <MoneyIcon />
                      <span className="flex items-center text-[#676b7e]">
                        <span className="text-[14px] opacity-70">$</span>
                        <span className="text-[14px]">0</span>
                      </span>
                    </button>
                    <div className="flex h-7 items-center gap-1.5 rounded-[10px] px-2">
                      <span className="text-[14px] opacity-70">Balance</span>
                      <span className="text-[14px]">0</span>
                    </div>
                  </footer>
                </div>
              </section>

              <aside className="flex h-[50px] w-full items-center justify-center border-t border-[#fbfbfd1a] bg-[#17191c] px-2 py-1 text-[#676b7e] md:px-4">
                <div className="flex h-10 w-8 items-center justify-center">
                  <button className="flex h-10 min-w-[60px] items-center justify-center rounded-[15px] px-2 text-[#d1d6e0]">
                    <FlipArrowIcon />
                  </button>
                </div>
              </aside>

              <section className="relative flex w-full flex-col border-t border-[#fbfbfd1a] bg-[#17191c] pb-4">
                <header className="flex h-12 items-center px-4 py-1">
                  <div className="flex h-8 items-center gap-2 rounded-[10px] px-2 text-[#676b7e]">
                    <span className="text-[17px] leading-[18px]">Receive</span>
                  </div>
                </header>

                <div className="px-4">
                  <div className="relative w-fit">
                    <ReceiveAssetSelector onClick={() => setCardView("token")} />
                  </div>
                </div>

                <div className="flex w-full flex-col">
                  <div className="h-[65px] px-2 pt-1 text-[54px] font-normal text-[#676b7e] opacity-50 md:h-[75px] md:px-4">
                    <div className="flex h-[55px] w-full items-center rounded-[10px] bg-transparent px-2">0</div>
                  </div>

                  <footer className="flex h-8 items-center justify-between gap-2 px-2 text-[#676b7e] md:px-4">
                    <div className="flex h-7 items-center gap-1.5 rounded-[10px] px-2">
                      <MoneyIcon />
                      <span className="flex items-center text-[#676b7e]">
                        <span className="text-[14px] opacity-70">$</span>
                        <span className="text-[14px]">0</span>
                      </span>
                    </div>
                    <div className="flex h-7 items-center gap-1.5 rounded-[10px] px-2">
                      <span className="text-[14px] opacity-70">Balance</span>
                      <span className="text-[14px]">0</span>
                    </div>
                  </footer>
                </div>
              </section>

              <div className="h-full max-h-[80px] px-4 pb-4">
                <button
                  onClick={() => setCardView("wallet")}
                  className="relative flex h-[60px] w-full items-center justify-center overflow-hidden rounded-full border border-[#fbfbfd1a] bg-[#9e79d2] text-[#fbfbfd] transition hover:border-[#fbfbfd54]"
                >
                  <span className="relative z-10 px-6 text-[22px] leading-[22px] font-normal">Connect</span>
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <div className="fixed bottom-4 right-4">
        <button className="flex items-center gap-2 rounded-full bg-[#363946]/90 px-4 py-2 text-[16px] text-[#ededf3] ring-1 ring-white/10 backdrop-blur">
          <span>Get help</span>
          <ExternalIcon />
        </button>
      </div>

      {isSignInSidebarOpen ? <SignInSidebar onClose={() => setIsSignInSidebarOpen(false)} /> : null}

      {isLeftSidebarOpen ? <LeftSidebar onClose={() => setIsLeftSidebarOpen(false)} /> : null}

    </main>
  );
}
