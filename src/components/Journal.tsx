import { motion } from 'framer-motion';

const ENTRIES = [
  {
    title: 'The Art of Digital Craftsmanship',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&q=80',
    readTime: '5 min read',
    date: 'Dec 15, 2025',
  },
  {
    title: 'Building for Scale: Lessons Learned',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=300&q=80',
    readTime: '8 min read',
    date: 'Nov 28, 2025',
  },
  {
    title: 'Designing with Empathy',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=300&q=80',
    readTime: '6 min read',
    date: 'Oct 10, 2025',
  },
  {
    title: 'The Future of Web Animation',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&q=80',
    readTime: '7 min read',
    date: 'Sep 5, 2025',
  },
];

export default function Journal() {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-end justify-between mb-10 md:mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic leading-[1.1] text-text-primary">
              Recent <span className="font-display italic">thoughts</span>
            </h2>
            <p className="text-sm md:text-base text-muted mt-3">
              Insights and stories from my journey.
            </p>
          </div>
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-muted border border-stroke hover:ring-2 hover:ring-[#89AACC] hover:border-transparent transition-all duration-300"
          >
            View all <span className="text-xs">→</span>
          </a>
        </motion.div>

        {/* Journal Entries */}
        <div className="flex flex-col gap-4">
          {ENTRIES.map((entry, i) => (
            <motion.a
              key={entry.title}
              href="#"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-all duration-300 group"
            >
              {/* Image */}
              <div className="w-full sm:w-16 h-48 sm:h-16 rounded-[24px] sm:rounded-full overflow-hidden shrink-0">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 px-2 sm:px-0">
                <h3 className="text-base md:text-lg font-medium text-text-primary truncate">
                  {entry.title}
                </h3>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 px-2 sm:px-0 pb-2 sm:pb-0">
                <span className="text-xs text-muted whitespace-nowrap">{entry.readTime}</span>
                <span className="text-xs text-muted/60 whitespace-nowrap">{entry.date}</span>
              </div>

              {/* Arrow */}
              <span className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-stroke/30 text-muted group-hover:bg-stroke/60 transition-colors duration-300 mr-2">
                <span className="text-sm">→</span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}