import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

const BRIDGE_FIX_SCRIPT_TAG =
  '<script defer src="/bridge-link-fix.js"></script>';

export async function GET() {
  const htmlPath = join(process.cwd(), "public", "squidrouter-source.html");
  const html = await readFile(htmlPath, "utf8");

  // The snapshot contains `<base href="https://www.squidrouter.com/"/>`.
  // That makes local links like `/bridge` resolve to Squid's domain.
  // Override it so in-app navigation stays on our origin.
  const basePatchedHtml = html
    .replace(
      '<base href="https://www.squidrouter.com/"/>',
      '<base href="/"/>'
    )
    .replace(
      '<base href="https://www.squidrouter.com/">',
      '<base href="/">'
    );

  // Force Squid's bridge app CTAs to route to our local `/bridge`.
  // Do this server-side so it doesn't depend on client JS executing.
  const bridgePatchedHtml = basePatchedHtml
    .replaceAll('href="https://app.squidrouter.com/"', 'href="/bridge"')
    .replaceAll('href="https://app.squidrouter.com"', 'href="/bridge"')
    .replaceAll("href='https://app.squidrouter.com/'", "href='/bridge'")
    .replaceAll("href='https://app.squidrouter.com'", "href='/bridge'");

  const titlePatchedHtml = bridgePatchedHtml
    .replaceAll(
      "Squid - Bridge, Swap &amp; Build Across 100+ Chains",
      "BWICK Bridge"
    )
    .replaceAll(
      "Squid - Bridge, Swap & Build Across 100+ Chains",
      "BWICK Bridge"
    );

  // Cover filename-based references if the snapshot changes later.
  const heroPatchedHtml = titlePatchedHtml
    .replaceAll(
      "hero-composite.png",
      "7356fd7d-d9de-4b61-9b9e-6dc63b7e58a4.png"
    )
    .replaceAll("bg-hero.png", "new-bg-hero.png");

  // Keep the landing page fully local: rewrite the few remaining external assets
  // (an OG image + CSS + fonts) to their checked-in copies in /public.
  const assetsPatchedHtml = heroPatchedHtml
    .replaceAll(
      "https://cdn.sanity.io/images/qbdchj8q/production/cdbd2a00837874b82abebb22a817ef155ca39869-2400x1350.png",
      "/landing-assets/og-image.png"
    )
    .replaceAll(
      "https://www.squidrouter.com/_next/static/chunks/0g6w98ytjquyj.css",
      "/landing-assets/0g6w98ytjquyj.css"
    )
    .replaceAll(
      "https://www.squidrouter.com/_next/static/media/BagossCondensed_Bold-s.p.0~s-cts193b44.otf",
      "/landing-assets/BagossCondensed_Bold-s.p.0~s-cts193b44.otf"
    )
    .replaceAll(
      "https://www.squidrouter.com/_next/static/media/BagossCondensed_Light-s.p.11j5fa0oah3w7.woff2",
      "/landing-assets/BagossCondensed_Light-s.p.11j5fa0oah3w7.woff2"
    )
    .replaceAll(
      "https://www.squidrouter.com/_next/static/media/BagossCondensed_SemiBold-s.p.17aaj.m8yo3~7.otf",
      "/landing-assets/BagossCondensed_SemiBold-s.p.17aaj.m8yo3~7.otf"
    )
    .replaceAll(
      "https://www.squidrouter.com/_next/static/media/Geist_Variable-s.p.0-te~ja_gpvcf.woff2",
      "/landing-assets/Geist_Variable-s.p.0-te~ja_gpvcf.woff2"
    )
    .replaceAll(
      "https://www.squidrouter.com/_next/static/media/Geist-Variable.0si68_l5hnsib.woff2",
      "/landing-assets/Geist-Variable.0si68_l5hnsib.woff2"
    );

  // `squidrouter-source.html` is a single-line snapshot; patching inline keeps it byte-for-byte
  // except for our small script, and avoids trying to edit the huge file directly.
  const patched = assetsPatchedHtml.includes("</head><body>")
    ? assetsPatchedHtml.replace(
        "</head><body>",
        `</head><body>${BRIDGE_FIX_SCRIPT_TAG}`
      )
    : assetsPatchedHtml.replace("</head>", `</head>${BRIDGE_FIX_SCRIPT_TAG}`);

  return new Response(patched, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
