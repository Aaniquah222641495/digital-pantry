import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { INDUSTRIES } from "../lib/guides";

// "What are you cooking up?" (DPW-14): send each visitor to the page for their kind of business.
// One small row under the jar shelf on Pricing, where people choose a package (founder 2026-10-27:
// the big photo grid sat after the choice and pulled people away from it). Only pages that exist.
export function BusinessPicker() {
  return (
    <nav aria-labelledby="cooking-heading" className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" data-testid="segment-selector">
      <p id="cooking-heading" className="text-[15px] font-medium text-dp-ink">
        Not sure which jar? <span className="text-dp-muted">Pick your business:</span>
      </p>
      <ul className="flex flex-wrap gap-2">
        {INDUSTRIES.map((ind) => (
          <li key={ind.path}>
            <Link
              href={ind.path}
              className="group inline-flex min-h-11 items-center gap-1.5 rounded-full bg-dp-surface px-4 text-[14px] font-medium text-dp-ink shadow-[0_8px_20px_-16px_rgba(22,18,20,0.4)] transition-colors hover:bg-dp-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dp-accent"
            >
              {ind.card.title}
              <ArrowUpRight aria-hidden="true" size={14} className="text-dp-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
