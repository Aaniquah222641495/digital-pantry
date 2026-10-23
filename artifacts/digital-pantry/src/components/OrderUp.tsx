import { useRef, type CSSProperties } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Sprinkles } from "./Sprinkles";

// Portfolio hero: the launch-day illustration, with the two live client sites served up out of
// the tray on load (CSS keyframes, so it plays without waiting for JavaScript), a sprinkle burst,
// and a gentle tilt toward the pointer on desktop. Static for reduced motion.
const PLATES = [
  { src: "/images/work/stuffd-phone.webp", alt: "Stuff'd Bagels on a phone", x: "-170%", y: "-190%", r: "-9deg", left: "27%", top: "-17%", d: "0.5s" },
  { src: "/images/work/madrasah-phone.webp", alt: "Beginners Madrasah on a phone", x: "60%", y: "-205%", r: "7deg", left: "51%", top: "-23%", d: "0.75s" },
] as const;

export function OrderUp() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [5, -5]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-7, 7]), { stiffness: 120, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0); }} className="relative [perspective:1200px]">
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="dp-stage relative [transform-style:preserve-3d]">
        <img
          src="/images/art/launch-day.webp"
          alt="Aaniquah and Imaan serving a new website on a silver tray under falling sprinkles"
          width={1600}
          height={893}
          fetchPriority="high"
          className="relative w-full object-contain"
        />
        {PLATES.map((p) => (
          <figure
            key={p.src}
            className="dp-plate absolute w-[14%] overflow-hidden rounded-[14px] border-[3px] border-white bg-white shadow-[0_24px_40px_-16px_rgba(120,30,60,0.55)] dark:border-[#FBF2F3] dark:shadow-[0_24px_50px_-14px_rgba(0,0,0,0.75)]"
            style={{ left: p.left, top: p.top, "--fx": p.x, "--fy": p.y, "--r": p.r, "--d": p.d, transform: "translateZ(40px)" } as CSSProperties}
          >
            <img src={p.src} alt={p.alt} width={780} height={1688} className="aspect-[390/600] w-full object-cover object-top" />
          </figure>
        ))}
        <Sprinkles mode="burst" count={70} />
      </motion.div>
    </div>
  );
}
