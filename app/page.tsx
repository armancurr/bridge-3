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
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center">
            <div className="relative w-full max-w-[1000px] aspect-[1400/900]">
              <Image
                src="/7356fd7d-d9de-4b61-9b9e-6dc63b7e58a4.webp"
                alt="Squid hero artwork"
                fill
                priority
                className="object-contain object-top"
              />
            </div>
          </div>

          <header className="relative z-20 grid grid-cols-[1fr_auto_1fr] items-center px-6 pt-6">
            <nav className="flex items-center gap-7 text-[16px] font-normal text-[#222222]">
              <Image src="/bwick.webp" alt="BWICK" width={40} height={40} className="h-10 w-10 object-contain" />
              <a href="#" className="inline-flex items-center gap-1">
                Build <span className="text-[14px]">⌄</span>
              </a>
              <a href="#" className="inline-flex items-center gap-1">
                Connect <span className="text-[14px]">⌄</span>
              </a>
              <a href="#" className="inline-flex items-center gap-1">
                Institutions <span className="text-[14px]">⌄</span>
              </a>
              <a href="#" className="inline-flex items-center gap-1">
                About <span className="text-[14px]">⌄</span>
              </a>
            </nav>

            <div className="flex h-12 w-[270px] items-center gap-3 rounded-full bg-white/85 px-4 text-[#8b91aa] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08),0_2px_10px_rgba(0,0,0,0.08)]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 4 4" />
              </svg>
              <span className="text-[18px] font-normal">Search any token</span>
            </div>

            <Link
              href="/bridge"
              className="ml-auto inline-flex h-12 items-center rounded-full bg-[#ecff3b] px-6 text-[16px] font-normal text-[#111111] shadow-[0_4px_12px_rgba(236,255,59,0.3)] transition hover:brightness-95"
            >
              Bridge
            </Link>
          </header>

          <div className="relative flex flex-1 flex-col items-center justify-end pb-[10vh] text-center">
            <div className="flex flex-col items-center">
              <h1
                className={`${bagossCondensed.className} text-[64px] leading-[0.85] tracking-[-0.05em] text-[#111111] sm:text-[90px] md:text-[110px] lg:text-[128px]`}
              >
                <span className="block">100 CHAINS</span>
                <span className="block">20K TOKENS</span>
                <span className="block">1SQUID</span>
              </h1>

              <p className="mt-6 text-[16px] font-medium text-[#111111]/80">
                The whole of crypto, connected.
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
