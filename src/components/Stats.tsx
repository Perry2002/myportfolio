import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface StatItemProps {
  value: string;
  label: string;
  delay: number;
}

function AnimatedStat({ value, label, delay }: StatItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-center"
    >
      <div className={`text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary mb-2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {value}
      </div>
      <div className="text-sm text-muted uppercase tracking-[0.1em]">{label}</div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <AnimatedStat value="20+" label="Years Experience" delay={0} />
          <AnimatedStat value="95+" label="Projects Done" delay={0.15} />
          <AnimatedStat value="200%" label="Satisfied Clients" delay={0.3} />
        </div>
      </div>
    </section>
  );
}