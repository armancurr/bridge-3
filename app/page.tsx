import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

const bagossCondensed = localFont({
  src: "../public/BagossCondensed_Bold-s.p.0~s-cts193b44.otf",
  display: "swap",
});

export default function HomePage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black text-[#111111]">
      <section className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/new-bg-hero.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-10 flex h-full flex-col">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center px-4 sm:px-6">
            <div className="relative aspect-[1400/900] w-[92vw] max-w-[720px] sm:w-full sm:max-w-[860px] lg:max-w-[1000px]">
              <Image
                src="/7356fd7d-d9de-4b61-9b9e-6dc63b7e58a4.webp"
                alt="Squid hero artwork"
                fill
                priority
                className="object-contain object-top"
              />
            </div>
          </div>

          <header className="relative z-20 grid grid-cols-[1fr_auto_1fr] items-center px-5 pt-5">
            <nav className="flex items-center gap-7 text-[14px] font-normal text-[#111111]/80">
              <Image
                src="/bwick.webp"
                alt="BWICK"
                width={37}
                height={37}
                className="h-[37px] w-[37px] object-contain"
              />
              <a href="#" className="inline-flex items-center gap-1">
                Build <span aria-hidden="true">⌄</span>
              </a>
              <a href="#" className="inline-flex items-center gap-1">
                Connect <span aria-hidden="true">⌄</span>
              </a>
              <a href="#" className="inline-flex items-center gap-1">
                Institutions <span aria-hidden="true">⌄</span>
              </a>
              <a href="#" className="inline-flex items-center gap-1">
                About <span aria-hidden="true">⌄</span>
              </a>
            </nav>

            <div className="flex h-11 w-[250px] items-center gap-3 rounded-full bg-white/90 px-4 text-[16px] font-normal text-[#8b90a6] shadow-sm">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 flex-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 4 4" />
              </svg>
              <span>Search any token</span>
            </div>

            <Link
              href="/bridge"
              className="justify-self-end inline-flex h-10 items-center rounded-full bg-[#ecff3b] px-6 text-[14px] font-normal text-[#111111] shadow-[0_4px_12px_rgba(236,255,59,0.3)] transition hover:brightness-95"
            >
              Bridge
            </Link>
          </header>

          <div className="relative flex flex-1 flex-col items-center justify-end pb-[10vh] text-center">
            <div className="flex flex-col items-center">
              <h1
                className={`${bagossCondensed.className} text-[64px] leading-[0.85] tracking-[-0.05em] text-[#111111] sm:text-[90px] md:text-[110px] lg:text-[128px]`}
              >
                <span className="hero-line block [animation-delay:0ms]">100 CHAINS</span>
                <span className="hero-line block [animation-delay:140ms]">20K TOKENS</span>
                <span className="hero-line block [animation-delay:280ms]">1 SQUID</span>
              </h1>

              <p className="mt-6 text-[16px] font-medium text-[#111111]/80">
                Favoring degens, not extractors.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <Link
                  href="/bridge"
                  className="inline-flex h-11 items-center rounded-full bg-[#ecff3b] px-7 text-[15px] font-normal text-[#111111] transition hover:brightness-95"
                >
                  Bridge
                </Link>
                <a
                  href="#"
                  className="inline-flex h-11 items-center rounded-full bg-white px-7 text-[15px] font-normal text-[#111111] shadow-sm transition hover:bg-white/90"
                >
                  Start Building
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
