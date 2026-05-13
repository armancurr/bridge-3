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

  // Swap hero image asset used by the snapshot landing page.
  const heroPatchedHtml = bridgePatchedHtml.replaceAll(
    "hero-composite.png",
    "7356fd7d-d9de-4b61-9b9e-6dc63b7e58a4.png"
  );

  // `squidrouter-source.html` is a single-line snapshot; patching inline keeps it byte-for-byte
  // except for our small script, and avoids trying to edit the huge file directly.
  const patched = heroPatchedHtml.includes("</head><body>")
    ? heroPatchedHtml.replace("</head><body>", `</head><body>${BRIDGE_FIX_SCRIPT_TAG}`)
    : heroPatchedHtml.replace("</head>", `</head>${BRIDGE_FIX_SCRIPT_TAG}`);

  return new Response(patched, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
