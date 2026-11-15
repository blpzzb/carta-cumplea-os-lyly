import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type RefObject } from "react";
import { Heart, Pause, Play, ChevronDown } from "lucide-react";
import { letterParagraphs } from "@/lib/letter";
import { playBirthdayMusic } from "@/lib/birthday-music";
import { AnimatedBackground, Letters, Reveal, SectionTitle, launchConfetti, useSparkles, type V } from "@/components/cute";
import { Candle, Countdown, MoreLetters, Reasons, WishStars } from "@/components/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "¡Feliz cumpleaños, Lyly! · Una carta para ti" },
      { name: "description", content: "Una carta, recuerdos, cartitas y sorpresas tiernas para el cumpleaños de Lyly." },
      { property: "og:title", content: "¡Feliz cumpleaños, Lyly! · Una carta para ti" },
      { property: "og:description", content: "Una carta, recuerdos, cartitas y sorpresas tiernas para tu cumpleaños." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const memories = [
  { img: "/1000069735.jpg", r: "-1.5deg", title: "Cuando nos reíamos", text: "Cada que podíamos encontrábamos la forma de divertirnos y hacernos la vida más ligera con nuestra simple compañía." },
  { img: "/1000069734.gif", r: "1.5deg", title: "Nuestro trío", text: "Los tres con Luka (el pendejo), entre tonteras y momentos raros, armábamos un caos que se sentía como hogar." },
  { img: "/1000069733.jpg", r: "-1deg", title: "Ahí para el otro", text: "Estar ahí cuando más pesaba el mundo, sabiendo que podíamos contar el uno con el otro." },
];

function Intro({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`fixed inset-0 z-40 grid place-items-center px-6 ${open ? "intro-out" : ""}`}>
      <div className="flex flex-col items-center text-center">
        <p className="eyebrow rise">16 · noviembre</p>
        <p className="rise mt-4 font-serif text-2xl italic text-muted-foreground" style={{ "--delay": ".2s" } as V}>llegó algo para ti</p>
        <div className="float rise mt-12" style={{ "--delay": ".4s" } as V}>
          <div className={`env ${open ? "open" : ""}`}>
            <div className="env-back" />
            <div className="env-paper"><span className="font-script text-4xl">para Lyly</span></div>
            <div className="env-front" /><div className="env-flap" />
            <div className="seal"><span className="font-script text-3xl leading-none">L</span></div>
          </div>
        </div>
        <button className="btn-elegant rise mt-16" style={{ "--delay": ".7s" } as V} onClick={() => { if (open) return; setOpen(true); onOpen(); }}>
          <Heart size={18} className="fill-current" /> Una carta para ti
        </button>
      </div>
    </div>
  );
}

function Player({ audio, playing }: { audio: RefObject<HTMLAudioElement | null>; playing: boolean }) {
  return (
    <div className="glass rise fixed bottom-5 right-5 z-30 flex items-center gap-3 rounded-full py-2 pl-2 pr-5">
      <button aria-label={playing ? "Pausar música" : "Reproducir música"} onClick={() => (playing ? audio.current?.pause() : playBirthdayMusic(audio.current))}
        className="relative grid h-11 w-11 place-items-center rounded-full border border-gold/50 text-gold">
        <span className={`disc absolute inset-1 rounded-full border border-dashed border-gold/40 ${playing ? "" : "off"}`} />
        {playing ? <Pause size={15} /> : <Play size={15} />}
      </button>
      <span className="hidden font-serif italic sm:inline">nuestra canción</span>
      <div className={`wave ${playing ? "on" : ""}`}><i /><i /><i /><i /><i /></div>
    </div>
  );
}

function Page() {
  const audio = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  useSparkles();

  const open = () => {
    playBirthdayMusic(audio.current);
    setTimeout(() => { setStarted(true); launchConfetti(110); }, 2700);
  };

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <audio ref={audio} src="/cancion.mp3" loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      {!started && <Intro onOpen={open} />}
      {started && (
        <>
          <Player audio={audio} playing={playing} />
          <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <p className="eyebrow rise">hoy celebramos que naciste</p>
            <h1 className="mt-6 font-serif font-light leading-[0.9]">
              <span className="block text-5xl italic md:text-7xl"><Letters text="Feliz cumpleaños" base={0.3} /></span>
              <span className="text-shimmer rise mt-2 block font-script text-[7rem] md:text-[11rem]" style={{ "--delay": "1.3s" } as V}>Lyly</span>
            </h1>
            <div className="divider rise mt-6" style={{ "--delay": "1.8s" } as V}><Heart size={12} className="beat fill-current" /></div>
            <div className="rise mt-8" style={{ "--delay": "2.1s" } as V}><Countdown /></div>
            <a href="#recuerdos" className="float mt-16 text-gold/80" aria-label="Bajar"><ChevronDown size={30} strokeWidth={1} /></a>
          </section>

          <section id="recuerdos" className="mx-auto max-w-6xl px-6 py-28">
            <SectionTitle eyebrow="capítulo uno" title="Nuestros recuerdos" sub="pequeños pedacitos de nosotros" />
            <div className="grid gap-14 md:grid-cols-3">
              {memories.map((m, i) => (
                <Reveal key={i} delay={i * 150}>
                  <figure>
                    <div className="frame" style={{ "--r": m.r } as V}>
                      <div className="frame-inner"><img src={m.img} alt={m.title} className="aspect-[4/5] w-full object-cover" loading="lazy" /></div>
                    </div>
                    <figcaption className="mt-7 text-center">
                      <p className="font-serif text-2xl italic">{m.title}</p>
                      <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{m.text}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-3xl px-6 py-28">
            <SectionTitle eyebrow="capítulo dos" title="Mi carta para ti" sub="léela con calma" />
            <Reveal>
              <article className="paper px-8 py-14 md:px-16 md:py-20">
                <p className="mb-10 font-script text-5xl text-rose">Querida Lyly,</p>
                {letterParagraphs.map((p, i) => (
                  <Reveal key={i}><p className={`mb-7 font-serif text-[1.3rem] leading-[1.75] ${i === 0 ? "dropcap" : ""}`}>{p}</p></Reveal>
                ))}
                <Reveal>
                  <div className="mt-12 text-right">
                    <p className="font-serif italic">con todo mi cariño,</p>
                    <p className="font-script text-4xl text-rose">tu amigo de siempre</p>
                  </div>
                </Reveal>
              </article>
            </Reveal>
          </section>

          <Reasons />
          <MoreLetters />
          <WishStars />
          <Candle />

          <footer className="px-6 pb-32 pt-16 text-center">
            <Reveal>
              <Heart className="beat mx-auto fill-rose text-rose" size={40} strokeWidth={1} />
              <p className="text-shimmer mt-6 font-script text-6xl">Te quiero mucho</p>
              <p className="mt-4 font-serif text-lg italic text-muted-foreground">gracias por volver, por quedarte y por ser tú</p>
            </Reveal>
          </footer>
        </>
      )}
    </main>
  );
}