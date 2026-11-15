import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type V = CSSProperties & Record<`--${string}`, string | number>;

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const n = ref.current;
    if (!n || !("IntersectionObserver" in window)) return;
    n.classList.add("pending");
    const o = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { setTimeout(() => n.classList.remove("pending"), delay); o.disconnect(); }
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    o.observe(n);
    return () => o.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function AnimatedBackground() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <>
      <div className="aurora" aria-hidden><i /><i /><i /></div>
      <div className="stars" aria-hidden>
        {ready && Array.from({ length: 70 }, (_, i) => (
          <span key={i} className="star" style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%`, "--s": `${1 + (i % 3)}px`, "--d": `${2 + (i % 5)}s`, "--delay": `-${i % 7}s` } as V} />
        ))}
        {ready && [12, 30, 55].map((y, i) => <span key={y} className="shooting" style={{ "--y": `${y}%`, "--delay": `${i * 3.2}s` } as V} />)}
      </div>
      <div className="petals" aria-hidden>
        {ready && Array.from({ length: 22 }, (_, i) => (
          <span key={i} className="petal" style={{ "--x": `${(i * 41) % 100}%`, "--s": `${10 + (i % 4) * 4}px`, "--d": `${14 + (i % 6) * 3}s`, "--delay": `-${(i * 2.3) % 20}s` } as V} />
        ))}
      </div>
    </>
  );
}

const colors = ["var(--gold)", "var(--rose)", "var(--paper)", "var(--primary)"];
export function launchConfetti(count = 80) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "confetti";
    el.style.setProperty("--x", `${Math.random() * 100}vw`);
    el.style.setProperty("--dx", `${(Math.random() - 0.5) * 260}px`);
    el.style.setProperty("--d", `${3 + Math.random() * 3}s`);
    el.style.setProperty("--c", colors[i % colors.length] ?? "gold");
    el.style.animationDelay = `${Math.random()}s`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 7500);
  }
}

export function useSparkles() {
  useEffect(() => {
    const h = (e: MouseEvent) => {
      for (let i = 0; i < 8; i++) {
        const el = document.createElement("span");
        el.className = "spark";
        el.style.left = `${e.clientX}px`; el.style.top = `${e.clientY}px`;
        const a = (Math.PI * 2 * i) / 8;
        el.style.setProperty("--dx", `${Math.cos(a) * 40}px`);
        el.style.setProperty("--dy", `${Math.sin(a) * 40}px`);
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 950);
      }
    };
    window.addEventListener("click", h);
    return () => window.removeEventListener("click", h);
  }, []);
}

export function Letters({ text, base = 0, className = "" }: { text: string; base?: number; className?: string }) {
  return <span className={`letters ${className}`} style={{ "--base": `${base}s` } as V}>{[...text].map((c, i) => <span key={i} style={{ "--i": i } as V}>{c === " " ? "\u00a0" : c}</span>)}</span>;
}

export function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-14 text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-5xl font-light italic md:text-6xl">{title}</h2>
      <div className="divider mt-5"><span className="text-xs">&#10086;</span></div>
      {sub && <p className="mt-4 font-serif text-lg italic text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}
