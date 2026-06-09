const TICKER_TEXT =
  "CAPE TOWN ★ WEB DEVELOPER ★ WOMEN IN STEM ★ SMALL BUSINESS SPECIALIST ★ BUILT FROM SCRATCH ★ ENGINEERING DIVA ★ ";

export function Ticker() {
  const repeated = TICKER_TEXT.repeat(4);

  return (
    <div
      className="bg-[#FF2D87] py-3.5 overflow-hidden whitespace-nowrap"
      aria-label="Scrolling ticker"
    >
      <div className="flex">
        <div className="ticker-track flex shrink-0">
          <span className="font-bebas text-white text-xl tracking-widest px-4">
            {repeated}
          </span>
          <span className="font-bebas text-white text-xl tracking-widest px-4">
            {repeated}
          </span>
        </div>
      </div>
    </div>
  );
}
