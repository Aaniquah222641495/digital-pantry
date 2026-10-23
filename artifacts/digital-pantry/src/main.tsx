import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/permanent-marker/400.css";
import "@fontsource/playfair-display/900.css";
import "./index.css";

const root = document.getElementById("root")!;
(window as unknown as { __dpReady?: boolean }).__dpReady = true;

// Pages are prerendered at build time (scripts/prerender.mjs), so React attaches to the
// existing HTML instead of redrawing it. Falls back to a normal render in dev.
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
