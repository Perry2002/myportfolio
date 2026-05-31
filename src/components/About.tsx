import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SKILLS = [
  { icon: '⚡', label: 'Interfaces modernes et rapides', sub: 'React, UX optimisée' },
  { icon: '🔒', label: 'Backends robustes et sécurisés', sub: 'Laravel, Node.js' },
  { icon: '💳', label: 'Intégration de paiements', sub: 'Stripe, PayDunya' },
  { icon: '🤖', label: 'Automatisation & IA', sub: 'Intégration sur mesure' },
  { icon: '🧱', label: 'Code propre et maintenable', sub: 'Structuré, scalable' },
];

const NEEDS = [
  'Un MVP pour lancer rapidement',
  'Une plateforme complète',
  'Améliorer un produit existant',
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} id="about" className="bg-bg py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Qui suis-je</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Colonne gauche ── */}
          <div>
            {/* Titre accroche */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-display italic leading-[1.1] text-text-primary mb-8"
            >
              Vous avez une idée ?<br />
              <span className="text-muted text-3xl md:text-4xl lg:text-5xl not-italic font-light">
                Je la transforme en<br />application réelle.
              </span>
            </motion.h2>

            {/* Paragraphe principal */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-sm md:text-base text-muted leading-relaxed mb-6"
            >
              Je suis développeur web <span className="text-text-primary font-medium">full stack</span> et j'aide les entrepreneurs,
              startups et porteurs de projets à lancer rapidement des produits digitaux
              <span className="text-text-primary font-medium"> performants, modernes et rentables</span>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-sm md:text-base text-muted leading-relaxed mb-10"
            >
              Des résultats, pas des discours ni de solutions bricolées. Je conçois des applications
              <span className="text-text-primary font-medium"> solides, scalables</span> et prêtes à être utilisées par de vrais utilisateurs.
            </motion.p>

            {/* Besoins */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-10"
            >
              <p className="text-xs text-muted uppercase tracking-[0.2em] mb-4">Vous avez besoin de</p>
              <div className="flex flex-col gap-2">
                {NEEDS.map((need, i) => (
                  <motion.div
                    key={need}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC] shrink-0" />
                    <span className="text-sm text-muted">{need}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 bg-text-primary text-bg text-sm font-medium hover:bg-bg hover:text-text-primary hover:ring-2 hover:ring-[#89AACC] transition-all duration-300 hover:scale-105"
              >
                Parlons de votre projet
                <span className="text-sm">→</span>
              </a>
            </motion.div>
          </div>

          {/* ── Colonne droite — Skills ── */}
          <div className="flex flex-col gap-4">

            {/* Citation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-surface border border-stroke rounded-2xl p-6 mb-2"
            >
              <p className="text-sm text-muted leading-relaxed italic">
                "Je travaille avec une approche orientée business : respect des délais,
                communication claire, et surtout…{' '}
                <span className="text-text-primary not-italic font-medium">des solutions qui fonctionnent</span>."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-stroke">
                  <img
                    src="https://res.cloudinary.com/djvqjz65z/image/upload/q_auto/f_auto/v1780093882/IMG_5641_a0vxmj.heic"
                    alt="Perry DOYIGBE"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-text-primary font-medium">Perry DOYIGBE</p>
                  <p className="text-xs text-muted">Développeur Full Stack</p>
                </div>
              </div>
            </motion.div>

            {/* Skills list */}
            <div className="flex flex-col gap-3">
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="group flex items-center gap-4 bg-surface border border-stroke rounded-xl px-5 py-4 hover:border-[#89AACC]/40 hover:bg-surface/80 transition-all duration-300"
                >
                  <span className="text-xl shrink-0">{skill.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary font-medium leading-tight">{skill.label}</p>
                    <p className="text-xs text-muted mt-0.5">{skill.sub}</p>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-stroke group-hover:bg-[#89AACC] transition-colors duration-300 shrink-0" />
                </motion.div>
              ))}
            </div>

            {/* Approche business */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-2 flex items-center gap-3 px-5 py-4 rounded-xl border border-[#89AACC]/20 bg-[#89AACC]/5"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#89AACC] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#89AACC]" />
              </span>
              <p className="text-xs text-muted">
                Chaque projet a un objectif clair :{' '}
                <span className="text-text-primary font-medium">créer de la valeur et obtenir des résultats concrets.</span>
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}