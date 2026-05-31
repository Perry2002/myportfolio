import { motion } from 'framer-motion';

const FORMATIONS = [
  {
    title: 'Licence Professionnelle en Génie Informatique et Intelligence Artificielle',
    subtitle: 'Formation Continue',
    school: 'Faculté des Sciences Ibn Tofail de Kénitra',
    location: 'Maroc',
    period: '2025 – 2026',
    index: 1,
  },
  {
    title: 'Diplôme de Technicien Spécialisé en Développement Web Full Stack',
    subtitle: 'Développement Web',
    school: 'Institut Spécialisé de Technologies Appliquées Settat',
    location: 'Maroc',
    period: '2023 – 2025',
    index: 2,
  },
  {
    title: 'Diplôme de Technicien en Installation et Maintenance Informatique',
    subtitle: 'Informatique',
    school: 'Lycée Technique et Professionnel de Porto-Novo',
    location: 'Bénin',
    period: '2019 – 2022',
    index: 3,
  },
];
const CERTIFICATIONS = [
  {
    title: 'Computer Hardware Basics',
    issuer: 'CISCO Networking Académie',
    date: 'Mars 2024',
    icon: '🖥️',
    badge: '/badges/computer-hardware-basics.png',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'CISCO Networking Académie',
    date: 'Avril 2025',
    icon: '🔐',
    badge: '/badges/1000576944 (600×600).png',
  },
  {
    title: 'Understanding and Visualizing Data with Python',
    issuer: 'University of Michigan',
    date: 'Février 2026',
    icon: '🐍',
    badge: '/badges/150226.png',
  },
];

export default function Formation() {
  return (
    <section id="formation" className="bg-bg py-16 md:py-24 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.02] pointer-events-none">
        <div className="w-full h-full rounded-full bg-text-primary blur-3xl" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Parcours</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic leading-[1.1] text-text-primary">
            Mes <span className="font-display italic">formations</span>
          </h2>
          <p className="text-sm md:text-base text-muted mt-3 max-w-lg">
            Un parcours académique et professionnel axé sur l'innovation, du développement web à l'intelligence artificielle.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-stroke md:-translate-x-px" />

          <div className="flex flex-col gap-10 md:gap-16">
            {FORMATIONS.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className={`relative flex flex-col md:flex-row items-start gap-4 md:gap-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot on timeline */}
                <div className="absolute left-0 md:left-1/2 top-1 md:-translate-x-1/2 z-10">
                  <div className="w-[15px] h-[15px] rounded-full bg-bg border-2 border-[#89AACC] shadow-[0_0_12px_rgba(137,170,204,0.3)]" />
                </div>

                {/* Spacer for mobile layout */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-surface/40 backdrop-blur-sm border border-stroke rounded-2xl p-6 md:p-8 hover:border-[#89AACC]/30 transition-all duration-500 group">
                    {/* Period badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#89AACC]/10 border border-[#89AACC]/20 text-xs text-[#89AACC] mb-4 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC] animate-pulse" />
                      {f.period}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-medium text-text-primary mb-2 leading-snug">
                      {f.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-sm text-[#89AACC] font-medium mb-3">
                      {f.subtitle}
                    </p>

                    {/* School & location */}
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                      </svg>
                      <span>{f.school}</span>
                      <span className="text-stroke">•</span>
                      <span>{f.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Certifications */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
  className="mt-20 md:mt-28"
>
  {/* Header certifications */}
  <div className="flex items-center gap-3 mb-8">
    <span className="w-8 h-px bg-stroke" />
    <span className="text-xs text-muted uppercase tracking-[0.3em]">Certifications</span>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {CERTIFICATIONS.map((cert, i) => (
      <motion.div
        key={cert.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
        className="group bg-surface/40 backdrop-blur-sm border border-stroke rounded-2xl p-6 hover:border-[#89AACC]/30 transition-all duration-500"
      >
        {/* Icon */}
        {/* Icon ou Badge */}
{cert.badge ? (
  <div className="w-16 h-16 mb-4 rounded-xl overflow-hidden border border-stroke">
    <img
      src={cert.badge}
      alt={`Badge ${cert.title}`}
      className="w-full h-full object-contain"
    />
  </div>
) : (
  <span className="text-2xl mb-4 block">{cert.icon}</span>
)}

        {/* Date badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#89AACC]/10 border border-[#89AACC]/20 text-xs text-[#89AACC] mb-3 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC]" />
          {cert.date}
        </div>

        {/* Title */}
        <h4 className="text-sm md:text-base font-medium text-text-primary mb-2 leading-snug">
          {cert.title}
        </h4>

        {/* Issuer */}
        <p className="text-xs text-muted flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.745 3.745 0 0 1 3.296-1.043A3.745 3.745 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12z" />
          </svg>
          {cert.issuer}
        </p>
      </motion.div>
    ))}
  </div>
</motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}