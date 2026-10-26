// Real screenshots of a client site in a browser and a phone. The phone drifts against the
// browser as the section scrolls past: CSS scroll-driven animation in index.css, static where
// unsupported or for reduced motion. The phone is drawn like a real handset (founder
// 2026-10-26): metal rim, side buttons, black bezel, island, status bar, glass glare. Its
// parts are sized in container units (cqw) so it stays in proportion at any width.
function StatusIcons() {
  return (
    <span className="flex items-center gap-[1.6cqw]">
      <svg viewBox="0 0 18 12" className="h-[3.2cqw] w-auto" fill="currentColor">
        <rect x="0" y="8" width="3" height="4" rx="0.8" />
        <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
        <rect x="10" y="3" width="3" height="9" rx="0.8" />
        <rect x="15" y="0" width="3" height="12" rx="0.8" />
      </svg>
      <svg viewBox="0 0 16 12" className="h-[3.2cqw] w-auto" fill="currentColor">
        <path d="M8 2.2c2.5 0 4.8 1 6.5 2.6l1.2-1.3A11 11 0 0 0 8 .4 11 11 0 0 0 .3 3.5l1.2 1.3A9.2 9.2 0 0 1 8 2.2Z" />
        <path d="M8 5.6c1.6 0 3 .6 4.1 1.6l1.2-1.3A7.8 7.8 0 0 0 8 3.8c-2 0-3.9.8-5.3 2.1l1.2 1.3A6 6 0 0 1 8 5.6Z" />
        <path d="M8 9.2c.7 0 1.3.3 1.8.7L8 11.8 6.2 9.9c.5-.4 1.1-.7 1.8-.7Z" />
      </svg>
      <svg viewBox="0 0 27 12" className="h-[3.2cqw] w-auto">
        <rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.4" />
        <rect x="2" y="2" width="17" height="8" rx="1.8" fill="currentColor" />
        <path d="M24 4v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2Z" fill="currentColor" fillOpacity="0.45" />
      </svg>
    </span>
  );
}

const RIM = "bg-[linear-gradient(145deg,#6b6870_0%,#1d1c20_22%,#2e2c32_60%,#8a8790_100%)]";

export function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative [container-type:inline-size]">
      {/* Side buttons: action and volume on the left, power on the right. */}
      <span aria-hidden="true" className={`absolute -left-[1.1cqw] top-[17%] h-[5.5%] w-[1.6cqw] rounded-l-[1cqw] ${RIM}`} />
      <span aria-hidden="true" className={`absolute -left-[1.1cqw] top-[26%] h-[10%] w-[1.6cqw] rounded-l-[1cqw] ${RIM}`} />
      <span aria-hidden="true" className={`absolute -left-[1.1cqw] top-[38%] h-[10%] w-[1.6cqw] rounded-l-[1cqw] ${RIM}`} />
      <span aria-hidden="true" className={`absolute -right-[1.1cqw] top-[28%] h-[15%] w-[1.6cqw] rounded-r-[1cqw] ${RIM}`} />
      <div className={`relative rounded-[17cqw] p-[1.5cqw] ${RIM} shadow-[0_40px_70px_-25px_rgba(12,11,13,0.6),0_12px_24px_-12px_rgba(12,11,13,0.45)]`}>
        <div className="rounded-[15.5cqw] bg-[#050506] p-[3cqw] shadow-[inset_0_0_0_0.5cqw_rgba(255,255,255,0.06)]">
          <div className="relative flex aspect-[390/844] flex-col overflow-hidden rounded-[12.5cqw] bg-white">
            <div aria-hidden="true" className="h-[13cqw] shrink-0 bg-white" />
            <img
              src={src}
              alt={alt}
              width={780}
              height={1688}
              loading="lazy"
              decoding="async"
              className="min-h-0 w-full flex-1 object-cover object-top"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[8.5cqw] pt-[4.6cqw] text-[#0C0B0D]">
                <span className="text-[4.4cqw] font-semibold leading-none tracking-[-0.02em]">9:41</span>
                <StatusIcons />
              </div>
              <div className="absolute left-1/2 top-[2.8cqw] h-[8.6cqw] w-[30cqw] -translate-x-1/2 rounded-full bg-black" />
              <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.06)_32%,rgba(255,255,255,0)_33%)]" />
              <div className="absolute bottom-[2.4cqw] left-1/2 h-[1.3cqw] w-[34cqw] -translate-x-1/2 rounded-full bg-[#0C0B0D]/75" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
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
      <figure className={`dp-par-phone absolute bottom-0 w-[30%] max-w-[230px] ${flip ? "left-0" : "right-0"}`}>
        <Phone src={phone} alt={`${alt} on a phone`} />
      </figure>
    </div>
  );
}
