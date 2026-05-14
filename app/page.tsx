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
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-10 flex h-full flex-col">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex justify-center px-0 sm:top-[-3vh] sm:px-6 lg:top-[-4vh]">
            <div className="relative aspect-[1400/900] w-[min(80vw,420px)] max-w-none sm:w-full sm:max-w-[400px] md:max-w-[500px] lg:max-w-[720px] xl:max-w-[860px] 2xl:max-w-[1000px]">
<Image
                src="/7356fd7d-d9de-4b61-9b9e-6dc63b7e58a4.webp"
                alt="Squid hero artwork"
                fill
                priority
                sizes="(max-width: 639px) 130vw, (max-width: 1023px) 100vw, 1000px"
                className="hero-artwork object-contain object-top"
                style={{ animationDelay: "250ms" }}
              />
            </div>
          </div>

          <header className="relative z-20 flex items-center px-5 pt-5">
            <div>
              <Image
                src="/bwick.webp"
                alt="BWICK"
                width={37}
                height={37}
                className="h-[37px] w-[37px] object-contain"
              />
            </div>
          </header>

          <div className="relative z-30 flex flex-1 flex-col items-center justify-end pb-[10vh] text-center">
            <div className="flex flex-col items-center">
              <h1
                className={`${bagossCondensed.className} text-[64px] leading-[0.85] tracking-[-0.05em] text-[#111111] sm:text-[90px] md:text-[110px] lg:text-[128px]`}
              >
                <span className="hero-line-mask block">
                  <span className="hero-line-token inline-block" style={{ animationDelay: "0ms" }}>
                    100
                  </span>{" "}
                  <span className="hero-line-token inline-block" style={{ animationDelay: "70ms" }}>
                    CHAINS
                  </span>
                </span>
                <span className="hero-line-mask block">
                  <span className="hero-line-token inline-block" style={{ animationDelay: "140ms" }}>
                    20K
                  </span>{" "}
                  <span className="hero-line-token inline-block" style={{ animationDelay: "210ms" }}>
                    TOKENS
                  </span>
                </span>
                <span className="hero-line-mask block">
                  <span className="hero-line-token inline-block" style={{ animationDelay: "280ms" }}>
                    1 SQUID
                  </span>
                </span>
              </h1>

              <p className="hero-fade-up mt-6 text-[16px] font-medium text-[#111111]/80" style={{ animationDelay: "360ms" }}>
                Favoring degens, not extractors.
              </p>

              <div className="hero-fade-up mt-8 flex items-center gap-3" style={{ animationDelay: "430ms" }}>
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
