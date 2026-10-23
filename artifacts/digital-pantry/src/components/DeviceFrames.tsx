
// Real screenshots of a client site in a browser and a phone frame. The phone drifts
// against the browser as the section scrolls past: CSS scroll-driven animation in index.css,
// static where unsupported or for reduced motion.
export function DeviceFrames({
  desktop,
  phone,
  alt,
  url,
  flip = false,
}: {
  desktop: string;
  phone: string;
  alt: string;
  url: string;
  flip?: boolean;
}) {
  return (
    <div className={`dp-par relative pb-10 ${flip ? "pl-10 sm:pl-16" : "pr-10 sm:pr-16"}`}>
      <figure
        className="dp-par-browser overflow-hidden rounded-[18px] border border-dp-line bg-dp-surface shadow-[0_40px_80px_-40px_rgba(12,11,13,0.45)]"
      >
        <div className="flex h-9 items-center gap-3 border-b border-dp-line px-4" aria-hidden="true">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-dp-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-dp-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-dp-line" />
          </span>
          <span className="mx-auto truncate rounded-full bg-dp-soft px-4 py-1 font-mono text-[11px] text-dp-muted">{url}</span>
        </div>
        <img
          src={desktop}
          alt={`${alt} on a computer`}
          width={1440}
          height={1600}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top"
        />
      </figure>
      <figure
        className={`dp-par-phone absolute bottom-0 w-[30%] max-w-[220px] overflow-hidden rounded-[26px] border-[5px] border-[#0C0B0D] bg-[#0C0B0D] shadow-[0_30px_60px_-20px_rgba(12,11,13,0.55)] ${
          flip ? "left-0" : "right-0"
        }`}
      >
        <img
          src={phone}
          alt={`${alt} on a phone`}
          width={780}
          height={1688}
          loading="lazy"
          decoding="async"
          className="aspect-[390/844] w-full rounded-[21px] object-cover object-top"
        />
      </figure>
    </div>
  );
}
