(() => {
  const BRIDGE_PATH = "/bridge";

  function normalizeText(s) {
    return (s || "").replace(/\s+/g, " ").trim();
  }

  function isBridgeLinkCandidate(el) {
    if (!el) return false;

    // Buttons / link-like elements that literally say "Bridge".
    const text = normalizeText(el.textContent);
    if (/\bbridge\b/i.test(text)) return true;

    // Anchors that point at Squid's bridge app or contain "bridge".
    if (el.tagName === "A") {
      const href = el.getAttribute("href") || "";
      if (/app\.squidrouter\.com/i.test(href)) return true;
      if (/\bbridge\b/i.test(href)) return true;
    }

    return false;
  }

  function rewriteAnchors() {
    document
      .querySelectorAll('a[href*="app.squidrouter.com"],a[href*="bridge"]')
      .forEach((a) => {
        const href = a.getAttribute("href") || "";
        // Force bridge CTAs to stay local.
        if (/app\.squidrouter\.com/i.test(href) || /\bbridge\b/i.test(href)) {
          a.setAttribute("href", BRIDGE_PATH);
          a.removeAttribute("target");
          a.removeAttribute("rel");
        }
      });
  }

  function onClickCapture(e) {
    const target = e.target;
    const el = target && target.closest ? target.closest('a,button,[role="link"],[role="button"]') : null;
    if (!isBridgeLinkCandidate(el)) return;

    e.preventDefault();
    e.stopPropagation();
    window.location.assign(BRIDGE_PATH);
  }

  document.addEventListener("DOMContentLoaded", rewriteAnchors);
  document.addEventListener("click", onClickCapture, true);
})();
