import { useEffect, useState } from "react";
import { X, Heart, Star } from "lucide-react";
import { Reveal, SectionTitle, launchConfetti } from "./cute";

export function Countdown() {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => {
      const d = new Date(); const end = new Date(d); end.setHours(24, 0, 0, 0);
      const s = Math.max(0, Math.floor((end.getTime() - d.getTime()) / 1000));
      setT([Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, "0")).join(" : "));
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return (
    <div className="text-center">
      <p className="eyebrow">lo que queda de tu día</p>
      <p className="mt-2 font-serif text-3xl tabular-nums tracking-widest text-gold">{t ?? "-- : -- : --"}</p>
    </div>
  );
}

const reasons = [
  ["Tu risa", "Es contagiosa y arregla hasta el día más gris."],
  ["Tu corazón", "Eres de las personas más cariñosas que conozco."],
  ["Tu fuerza", "Has crecido muchísimo, aunque no siempre lo notes."],
  ["Nuestras tonteras", "Nadie más entiende nuestros chistes raros."],
  ["Tu confianza", "Contigo puedo ser yo sin pensarlo tanto."],
  ["Que volviste", "Gracias por dejar la puerta abierta."],
  ["Que eres tú", "Única, irremplazable, nunca de sobra."],
  ["Que existes", "Hoy el mundo celebra que naciste."],
];
const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
export function Reasons() {
  const [on, setOn] = useState<Set<number>>(new Set());
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <SectionTitle eyebrow="ocho razones" title="Lo que adoro de ti" sub="toca cada tarjeta para descubrirla" />
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {reasons.map(([t, d], i) => (
          <Reveal key={i} delay={i * 90}>
            <div className={`flip ${on.has(i) ? "on" : ""}`} onClick={() => setOn((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; })}>
              <div className="flip-inner">
                <div className="flip-face glass">
                  <div>
                    <p className="font-serif text-5xl font-light text-gold">{roman[i]}</p>
                    <p className="mt-4 font-serif text-2xl italic">{t}</p>
                  </div>
                </div>
                <div className="flip-face flip-back">
                  <div>
                    <Heart className="mx-auto mb-3 fill-rose text-rose" size={18} />
                    <p className="font-serif text-xl italic leading-snug">{d}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const miniLetters = [
  { label: "cuando estés triste", text: "Sé que hoy pesa, pero no tienes que ser fuerte todo el tiempo. Llora si lo necesitas, abrázate fuerte y después escríbeme. Los días feos pasan, y tú siempre has salido adelante. Aquí estoy, siempre." },
  { label: "cuando no puedas dormir", text: "Respira hondo… cuenta hasta cuatro… suelta. Piensa en algo bonito: en nuestras risas tontas, en lo mucho que has crecido. Mañana será otro día y vas a estar bien. Que sueñes bonito." },
  { label: "cuando te sientas sola", text: "No estás sola, nunca lo has estado. Aunque estemos lejos o pasen días sin hablar, tienes un amigo que te quiere muchísimo y que siempre va a contestar. Mándame un hola y listo." },
  { label: "cuando logres algo", text: "Sabía que podías. Estoy orgullosísimo de ti. Cuéntamelo todo con detalles, que quiero celebrarlo contigo como se debe. Te lo mereces todo." },
  { label: "cuando dudes de ti", text: "Eres valiente, divertida, cariñosa y mucho más capaz de lo que crees. Si hoy no puedes verlo, préstame mis ojos un rato: yo lo veo clarísimo." },
  { label: "cuando me extrañes", text: "Yo también te extraño. Escríbeme ahora mismo, mándame un meme feo o un audio de cinco minutos. Ya sabes que siempre me alegra saber de ti." },
];
export function MoreLetters() {
  const [open, setOpen] = useState<number | null>(null);
  const l = open !== null ? miniLetters[open] : null;
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <SectionTitle eyebrow="correspondencia" title="Ábrela cuando…" sub="seis cartas para los días que las necesites" />
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
        {miniLetters.map((m, i) => (
          <Reveal key={i} delay={i * 100}>
            <button onClick={() => setOpen(i)} className="mini mx-auto block w-full max-w-[300px]">
              <div className="env mx-auto" style={{ width: "100%" }}>
                <div className="env-back" /><div className="env-front" /><div className="env-flap" />
                <div className="seal" style={{ width: 46, height: 46 }}><span className="font-script text-2xl leading-none">L</span></div>
              </div>
              <p className="mt-5 font-serif text-xl italic">Ábrela {m.label}</p>
            </button>
          </Reveal>
        ))}
      </div>
      {l && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-5 backdrop-blur-md" onClick={() => setOpen(null)}>
          <div className="paper modal-in relative max-w-lg p-10 md:p-14" onClick={(e) => e.stopPropagation()} style={{ perspective: 800 }}>
            <button onClick={() => setOpen(null)} className="absolute right-6 top-6 text-ink/60 transition hover:text-rose" aria-label="Cerrar"><X size={20} /></button>
            <p className="eyebrow" style={{ color: "var(--rose)" }}>ábrela {l.label}</p>
            <p className="mt-4 font-script text-4xl text-rose">Lyly,</p>
            <p className="mt-4 font-serif text-xl leading-relaxed">{l.text}</p>
            <p className="mt-8 text-right font-script text-3xl text-rose">con cariño, tu amigo</p>
          </div>
        </div>
      )}
    </section>
  );
}

export function Candle() {
  const [out, setOut] = useState(false);
  return (
    <section className="mx-auto max-w-3xl px-6 py-28 text-center">
      <SectionTitle eyebrow="un pequeño ritual" title="Pide un deseo" sub="cierra los ojos, piensa en algo bonito y sopla la vela" />
      <Reveal>
        <div className="relative mx-auto flex h-80 w-60 flex-col items-center justify-end">
          {!out && <div className="halo top-0" />}
          <div className="relative h-16">{out ? <div className="smoke mx-auto mt-4" /> : <div className="candle-flame" />}</div>
          <div className="mx-auto h-2 w-[2px] bg-ink" />
          <div className="h-44 w-16 rounded-t-md" style={{ background: "linear-gradient(90deg, oklch(0.88 0.03 60), var(--paper) 45%, oklch(0.85 0.04 50))" }} />
          <div className="h-3 w-32 rounded-full bg-gold/70" />
        </div>
        <button className="btn-elegant mt-10" onClick={() => { if (out) setOut(false); else { setOut(true); launchConfetti(140); } }}>
          {out ? "Encender de nuevo" : "Soplar la vela"}
        </button>
        <p className="mt-6 min-h-8 font-serif text-2xl italic text-gold">{out ? "Tu deseo ya va en camino." : ""}</p>
      </Reveal>
    </section>
  );
}

const wishes = [
  "Que te rías hasta que te duela la panza.", "Que este año te trate con mucha ternura.", "Que cumplas cada cosa que te propongas.",
  "Que nunca te falte gente que te quiera bonito.", "Que encuentres paz cuando más la necesites.", "Que te des cuenta de lo increíble que eres.",
  "Que sigamos juntando recuerdos tontos.", "Que tus días malos sean pocos y cortitos.", "Que te sigas eligiendo a ti misma.",
];
const pos = [[12, 20], [30, 65], [48, 15], [62, 55], [80, 25], [22, 42], [70, 80], [88, 60], [40, 85]];
export function WishStars() {
  const [w, setW] = useState<number | null>(null);
  return (
    <section className="mx-auto max-w-5xl px-6 py-28 text-center">
      <SectionTitle eyebrow="constelación" title="Estrellas para ti" sub="cada estrella guarda un deseo, tócalas" />
      <Reveal>
        <div className="glass relative mx-auto h-80 overflow-hidden rounded-sm">
          {pos.map(([x, y], i) => (
            <button key={i} aria-label={`Estrella ${i + 1}`} className="wish-star" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.4}s` }} onClick={() => setW(i)}>
              <Star size={i % 3 === 0 ? 26 : 18} className="fill-current" />
            </button>
          ))}
          {w !== null && (
            <div key={w} className="rise absolute inset-x-6 bottom-6 mx-auto max-w-md font-serif text-2xl italic">{wishes[w]}</div>
          )}
        </div>
      </Reveal>
    </section>
  );
}