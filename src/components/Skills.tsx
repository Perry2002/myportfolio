import { motion } from 'framer-motion';

const SKILL_CATEGORIES = [
  {
    title: 'Langages de programmation',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    skills: ['JavaScript', 'TypeScript', 'Python', 'JAVA'],
  },
  {
    title: 'Développement Web',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    skills: ['HTML', 'CSS', 'Bootstrap 5', 'React.js', 'Tailwind CSS'],
  },
  {
    title: 'Développement Backend',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    skills: ['PHP', 'MySQL', 'MongoDB', 'Laravel', 'JAVA-JEE'],
  },
  {
    title: 'Outils & Méthodologies',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.3M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
      </svg>
    ),
    skills: [
      'Analyse de Données (Python)',
      'Admin. BDD Oracle',
      'Méthodologies Agile / SCRUM',
      'Git / GitHub',
      'Postman',
      'Jira',
      'Canva',
      'Figma',
      'WordPress',
      'Maintenance Informatique',
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="bg-bg py-16 md:py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#89AACC]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Compétences</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic leading-[1.1] text-text-primary">
            Mes <span className="font-display italic">expertises</span>
          </h2>
          <p className="text-sm md:text-base text-muted mt-3 max-w-lg">
            Un ensemble de compétences techniques couvrant le développement web, le backend, et l'analyse de données.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {SKILL_CATEGORIES.map((cat) => (
            <motion.div
              key={cat.title}
              variants={itemVariants}
              className="group relative bg-surface/30 border border-stroke rounded-2xl p-6 md:p-8 hover:border-[#89AACC]/30 transition-all duration-500"
            >
              {/* Hover glow */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#89AACC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#89AACC]/10 text-[#89AACC]">
                    {cat.icon}
                  </span>
                  <h3 className="text-base md:text-lg font-medium text-text-primary">
                    {cat.title}
                  </h3>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm bg-surface border border-stroke text-muted hover:text-text-primary hover:border-[#89AACC]/40 hover:bg-[#89AACC]/5 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}