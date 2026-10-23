import { useEffect } from "react";
import { MagneticButton } from "../components/MagneticButton";
import { CutoutWord } from "../components/CutoutWord";

export default function NotFound() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <main className="mx-auto flex min-h-[80dvh] max-w-[1320px] flex-col items-start justify-center gap-8 px-5 pb-16 pt-32 sm:px-8 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-mono text-[13px] text-dp-accent">Error 404</p>
        <h1 className="mt-4 max-w-[14ch] text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1] tracking-[-0.05em]">
          This page isn't in the <CutoutWord word="PANTRY" />
        </h1>
        <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-dp-muted">
          The link may be old or mistyped. Everything else is right where you left it.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <MagneticButton href="/" data-testid="button-404-home">
            Back to home
          </MagneticButton>
          <MagneticButton href="/contact" variant="ghost" data-testid="button-404-contact">
            Let's Get Cooking
          </MagneticButton>
        </div>
      </div>
      <div className="dp-stage w-64 md:w-[26rem]"><img src="/images/art/empty-shelf.webp" alt="" width={600} height={600} className="w-full object-contain" /></div>
    </main>
  );
}
