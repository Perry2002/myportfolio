import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import HeroVideo from './HeroVideo';

const ROLES = ['Creative', 'Fullstack', 'Design', 'Create', 'Inspire'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const blurRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ ease: 'power3.out' });

      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      if (blurRef.current) {
        tl.fromTo(
          blurRef.current,
          { opacity: 0, y: 20, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, delay: 0.3 },
          '-=0.4'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background HLS Video */}
      <HeroVideo />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl">
        {/* Eyebrow */}
        <p
          ref={blurRef}
          className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8"
        >
          COLLECTION '26
        </p>

        {/* Avatar + Name side by side */}
{/* Avatar + Name side by side */}
<div className="flex items-center justify-center gap-8 md:gap-12 mb-6">
  
  {/* Avatar — agrandi */}
  <div ref={nameRef} className="relative w-40 h-40 md:w-45 md:h-45 shrink-0 rounded-full group">
    {/* Gradient ring */}
    <div className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift" />
    {/* Glow */}
    <div className="absolute inset-[-6px] rounded-full bg-[#89AACC]/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    {/* Image container */}
    <div className="absolute inset-[3px] rounded-full bg-surface overflow-hidden border-2 border-bg">
      <img
        src="https://res.cloudinary.com/djvqjz65z/image/upload/q_auto/f_auto/v1780093882/IMG_5641_a0vxmj.heic"
        alt="Perry DOYIGBE"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Name — agrandi */}
  <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary text-left">
    Perry DOYIGBE
  </h1>
</div>

        {/* Role line */}
        <p className="text-sm md:text-base text-muted mb-4 text-center ">
          {' '}
          <span
            key={roleIndex}
            className="animate-role-fade-in inline-block font-display italic text-text-primary"
          >
            {ROLES[roleIndex]}
          </span>{' '}
          {/* lives in Morocco. */}
        </p>

        {/* Description */}
        <p className="text-sm md:text-base text-muted max-w-md mx-auto mb-12 text-text-primary">
          Concevoir des interactions numériques fluides en mettant l'accent sur les nuances uniques
          qui donnent vie aux systèmes.
        </p>

        {/* CTA Buttons */}
        <div className="inline-flex gap-4">
          <a
            href="#work"
            className="rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg hover:bg-bg hover:text-text-primary hover:ring-2 hover:ring-[#89AACC] transition-all duration-300 hover:scale-105 font-medium"
          >
            Ce que j'ai conçu...
          </a>
          <a
            href="#contact"
            className="rounded-full text-sm px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary hover:border-transparent hover:ring-2 hover:ring-[#89AACC] transition-all duration-300 hover:scale-105 font-medium"
          >
            Parlons de votre projet...
          </a>
          <a
            href="/CV_Perry_DOYIGBE.pdf"
            download
            className="rounded-full text-sm px-7 py-3.5 border-2 border-[#89AACC]/40 bg-[#89AACC]/5 text-[#89AACC] hover:bg-[#89AACC]/10 hover:border-[#89AACC] transition-all duration-300 hover:scale-105 font-medium inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            CV
          </a>
        </div>
      </div>
      <br />

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute inset-x-0 w-px h-3 bg-text-primary animate-scroll-down" />
        </div>
      </div> */}
    </section>
  );
}