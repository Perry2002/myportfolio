import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const WORDS = ['Design', 'Create', 'Inspire'];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const DURATION = 2700; // ms

    function tick(timestamp: number) {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const currentCount = Math.round(progress * 100);
      setCount(currentCount);
      setWordIndex(Math.floor((elapsed / 900) % WORDS.length));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 400);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 md:p-10">
      {/* Top-left label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-xs text-muted uppercase tracking-[0.3em]"
      >
        Portfolio
      </motion.div>

      {/* Center: rotating words */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative h-20 md:h-24 lg:h-28">
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="block text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
            >
              {WORDS[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-end gap-4">
        {/* Counter */}
        <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none">
          {String(count).padStart(3, '0')}
        </div>

        {/* Progress bar */}
        <div className="w-full h-[3px] bg-stroke/50 overflow-hidden rounded-full">
          <div
            className="accent-gradient h-full origin-left transition-transform duration-75"
            style={{ transform: `scaleX(${count / 100})`, boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)' }}
          />
        </div>
      </div>
    </div>
  );
}