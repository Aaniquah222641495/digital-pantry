import { useEffect } from "react";
import { CTAButton } from "../components/CTAButton";

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
    <main className="pt-20">
      <section className="min-h-[70vh] bg-[#FFF8FB] dark:bg-[#0A0A0A] flex items-center transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-4">Error 404</p>
          <h1
            className="font-display font-black text-gray-900 dark:text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            This page isn't in the pantry <span className="text-[#FFD700]">★</span>
          </h1>
          <p className="font-body text-gray-600 dark:text-white/60 text-base leading-relaxed mb-8">
            The link may be old or mistyped. Everything else is right where you left it.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <CTAButton href="/" data-testid="button-404-home">Back to home</CTAButton>
            <CTAButton href="/contact" variant="outline" data-testid="button-404-contact">Get in touch</CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
