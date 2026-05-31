import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80',
  'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&q=80',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
];

const COLUMN_1 = [IMAGES[0], IMAGES[2], IMAGES[4]];
const COLUMN_2 = [IMAGES[1], IMAGES[3], IMAGES[5]];

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the center content
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Parallax columns
      if (col1Ref.current) {
        gsap.to(col1Ref.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      if (col2Ref.current) {
        gsap.to(col2Ref.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative min-h-[300vh] bg-bg"
    >
      {/* Layer 1: Pinned Center Content */}
      <div ref={contentRef} className="relative z-10 h-screen flex items-center">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic leading-[1.1] text-text-primary mb-3">
              Visual <span className="font-display italic">playground</span>
            </h2>
            <p className="text-sm md:text-base text-muted max-w-md mb-8">
              A collection of visual experiments and creative explorations.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-muted border border-stroke hover:ring-2 hover:ring-[#89AACC] hover:border-transparent transition-all duration-300"
            >
              View on Dribbble <span className="text-xs">↗</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Layer 2: Parallax Columns */}
      <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-2 gap-12 md:gap-40">
            {/* Column 1 */}
            <div ref={col1Ref} className="flex flex-col gap-12 md:gap-20">
              {COLUMN_1.map((src, i) => (
                <div
                  key={i}
                  className="aspect-square max-w-[320px] mx-auto rounded-3xl overflow-hidden border border-stroke bg-surface shadow-lg"
                  style={{ transform: `rotate(${i % 2 === 0 ? '-3' : '2'}deg)` }}
                >
                  <img
                    src={src}
                    alt={`Exploration ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div ref={col2Ref} className="flex flex-col gap-12 md:gap-20 mt-20">
              {COLUMN_2.map((src, i) => (
                <div
                  key={i}
                  className="aspect-square max-w-[320px] mx-auto rounded-3xl overflow-hidden border border-stroke bg-surface shadow-lg"
                  style={{ transform: `rotate(${i % 2 === 0 ? '2' : '-3'}deg)` }}
                >
                  <img
                    src={src}
                    alt={`Exploration ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}