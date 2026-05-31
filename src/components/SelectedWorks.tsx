import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createPortal } from 'react-dom';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);

const PROJECTS = [
  {
    title: 'Orchid Island',
    image: 'https://res.cloudinary.com/djvqjz65z/image/upload/q_auto/f_auto/v1780217368/Capture_d_%C3%A9cran_2026-05-31_094829_alz4t4.png',
    url: 'https://www.orchidisland.immo/',
    tags: ['React', 'TypeScript','Tailwind CSS', 'Express', 'MongoDB', ],
    index: '01',
  },
  {
    title: 'Sihati Fi Dar',
    image: 'https://res.cloudinary.com/djvqjz65z/image/upload/q_auto/f_auto/v1780094109/Capture_d_%C3%A9cran_2026-05-29_141010_gy8940.png',
    url: '#',
    tags: ['React', 'TypeScript', 'Laravel', 'MySQL', 'Tailwind CSS'],
    index: '02',
  },
  {
    title: 'ParaCado',
    image: 'https://res.cloudinary.com/djvqjz65z/image/upload/q_auto/f_auto/v1780094110/Capture_d_%C3%A9cran_2026-05-29_141207_o82bzw.png',
    url: 'https://paracado.com/',
    tags: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    index: '03',
  },
  {
    title: 'YOULIDA',
    image: 'https://res.cloudinary.com/djvqjz65z/image/upload/q_auto/f_auto/v1780094111/Capture_d_%C3%A9cran_2026-05-29_195131_vcktw9.png',
    url: 'https://youlida.vercel.app/',
    tags: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    index: '04',
  },
  {
    title: 'Planet Technologies',
    image: 'https://res.cloudinary.com/djvqjz65z/image/upload/q_auto/f_auto/v1780094110/Capture_d_%C3%A9cran_2026-05-29_193009_xqdtoo.png',
    url: 'https://planet-technologies-v1yb.vercel.app/',
    tags: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    index: '05',
  },
];

// ── Modal ─────────────────────────────────────────────────────────────────────
function PreviewModal({ project, onClose }: { project: typeof PROJECTS[0] | null; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!project) return;
    setLoaded(false);
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [project, onClose]);

  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  const modal = (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: 'fixed', inset: '2rem', zIndex: 9999, display: 'flex', flexDirection: 'column', borderRadius: '1rem', overflow: 'hidden' }}
            className="border border-stroke bg-bg shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-stroke bg-surface/80 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-2">
                <button onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 transition-colors" aria-label="Fermer" />
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-400" />
                <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-bg border border-stroke rounded-lg px-4 py-1.5 text-xs text-muted font-mono truncate max-w-sm mx-auto text-center">
                  {project.url === '#' ? 'projet en cours…' : project.url}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted hidden md:block font-display italic">{project.title}</span>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-stroke flex items-center justify-center text-muted hover:text-text-primary hover:border-[#89AACC] transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* iFrame */}
            <div className="relative flex-1 bg-black">
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-bg">
                  <div className="w-8 h-8 border-2 border-stroke border-t-[#89AACC] rounded-full animate-spin" />
                  <span className="text-xs text-muted">Chargement de {project.title}…</span>
                </div>
              )}
              {project.url === '#' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg">
                  <span className="text-4xl">🚧</span>
                  <p className="text-sm text-muted">Ce projet n'est pas encore en ligne.</p>
                </div>
              ) : (
                <iframe
                  src={project.url}
                  title={project.title}
                  className={`w-full h-full border-0 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setLoaded(true)}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // ✅ Portal — rendu directement dans document.body, hors de la portée de GSAP
  return createPortal(modal, document.body);
}

// ── Card ──────────────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: typeof PROJECTS[0]; onPreview: () => void }) {
  return (
    <div
      className="group relative shrink-0 rounded-2xl overflow-hidden bg-surface border border-stroke cursor-pointer select-none"
      style={{ width: '380px', aspectRatio: '4/3' }}
    >
      <img
        src={project.image}
        alt={project.title}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
      <span className="absolute top-4 right-4 font-mono text-xs text-white/30 pointer-events-none">
        {project.index}
      </span>

      <div className="absolute bottom-0 left-0 right-0 p-5 group-hover:-translate-y-1 transition-transform duration-300 pointer-events-none">
        <h3 className="text-lg font-display italic text-white mb-1 leading-tight">{project.title}</h3>
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] bg-white/10 border border-white/20 text-white/70 backdrop-blur-sm">
              {tag}
            </span>
          ))}      
      </div>

      {/* Overlay hover */}
      <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] pointer-events-none" />

      {/* Bouton — z-index élevé, pointer-events explicite */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
  <button
    data-preview={project.title}
    className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-text-primary text-bg text-sm font-medium shadow-lg hover:bg-[#89AACC] hover:text-white transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
    style={{ pointerEvents: 'auto', position: 'relative', zIndex: 20 }}
  >
    <svg className="w-4 h-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
    </svg>
    Aperçu
  </button>
</div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<typeof PROJECTS[0] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    // Distance totale à parcourir horizontalement
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1.5,          // lié au scroll — plus fluide
          pin: true,         // épingle la section pendant le scroll
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const newIndex = Math.round(self.progress * (PROJECTS.length - 1));
            setActiveIndex(newIndex);
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const progress = index / (PROJECTS.length - 1);
    const trigger = ScrollTrigger.getAll()[0];
    if (!trigger) return;
    const targetScroll = trigger.start + progress * (trigger.end - trigger.start);
    gsap.to(window, { scrollTo: targetScroll, duration: 0.8, ease: 'power2.out' });
    setActiveIndex(index);
  };

  return (
    <>
      <PreviewModal project={activeProject} onClose={() => setActiveProject(null)} />

      {/* Wrapper — ScrollTrigger s'accroche ici */}
      <div ref={wrapperRef} className="relative">
        <section ref={sectionRef} id="work" className="bg-bg h-screen flex flex-col justify-center overflow-hidden">

          {/* Header */}
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-end justify-between mb-10"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-px bg-stroke" />
                  <span className="text-xs text-muted uppercase tracking-[0.3em]">Projets</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic leading-[1.1] text-text-primary">
                  Mes <span className="font-display italic">réalisations</span>
                </h2>
                <p className="text-sm md:text-base text-muted mt-3 max-w-md">
                  Une sélection de projets sur lesquels j'ai travaillé, du concept au lancement.
                </p>
              </div>
              <a
                href="https://github.com/Perry2002"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-muted border border-stroke hover:ring-2 hover:ring-[#89AACC] hover:border-transparent transition-all duration-300"
              >
                Voir tout <span className="text-xs">→</span>
              </a>
            </motion.div>
          </div>

          {/* Track horizontal — translateX par GSAP */}
          <div
  ref={trackRef}
  className="flex gap-6 px-6 md:px-10 lg:px-16 will-change-transform"
  style={{ width: 'max-content', pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
  onClick={(e) => {
    // Remonter jusqu'au bouton cliqué
    const btn = (e.target as HTMLElement).closest('[data-preview]');
    if (btn) {
      const title = btn.getAttribute('data-preview');
      const found = PROJECTS.find(p => p.title === title);
      if (found) setActiveProject(found);
    }
  }}
>
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onPreview={() => setActiveProject(project)}
              />
            ))}
            <div className="shrink-0 w-16" />
          </div>

          {/* Dots + hint */}
          <div className="flex flex-col items-center gap-3 mt-8">
            <div className="flex items-center gap-2">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-6 h-2 bg-text-primary'
                      : 'w-2 h-2 bg-stroke hover:bg-muted'
                  }`}
                  aria-label={`Projet ${i + 1}`}
                />
              ))}
            </div>
            <p className="text-xs text-muted/50 tracking-widest uppercase">
              ↓ Défilez pour explorer →
            </p>
          </div>

        </section>
      </div>
    </>
  );
}