import { useState, useEffect } from "react";

// Resolve any CSS color string (including oklch, var(), etc.) to a hex string
// by briefly mounting a hidden element and reading back the computed rgb().
function resolveColor(css: string): string {
  const el = document.createElement("div");
  el.style.cssText = "position:absolute;width:0;height:0;color:" + css;
  document.body.appendChild(el);
  const rgb = getComputedStyle(el).color;
  document.body.removeChild(el);
  const m = rgb.match(/\d+/g);
  if (!m) return "#000000";
  return (
    "#" +
    [m[0], m[1], m[2]]
      .map((n) => parseInt(n).toString(16).padStart(2, "0"))
      .join("")
  );
}

function readVar(name: string): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  if (!raw) return "#000000";
  return resolveColor(raw);
}

// Returns a hex color string that stays in sync with the named CSS variable.
// Re-fires whenever data-color-preset or class changes on <html>.
export function useCssColor(varName: string): string {
  // Read synchronously so the shader gets the right colour on first paint,
  // not a black flash while waiting for useEffect.
  const [hex, setHex] = useState(() => readVar(varName));

  useEffect(() => {
    const update = () => setHex(readVar(varName));
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-color-preset", "class"],
    });
    return () => mo.disconnect();
  }, [varName]);

  return hex;
}
