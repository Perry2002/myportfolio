import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const HLS_URL = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
const SOCIAL_LINKS = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/perry-doyigbe-0a121729b?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  { label: 'Instagram', url: 'https://www.instagram.com/perry_dgb?igsh=azN2MzZ0bnh4dHB0' },
  { label: 'Facebook', url: 'https://www.facebook.com/share/1F2iPABaXn/' },
  { label: 'GitHub', url: 'https://github.com/Perry2002' },
];

export default function ContactFooter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Background video (flipped)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: any = null;

    async function initHLS() {
      const Hls = (await import('hls.js')).default;
      if (Hls.isSupported()) {
        hlsInstance = new Hls();
        hlsInstance.loadSource(HLS_URL);
        hlsInstance.attachMedia(video);
      } else if (video!.canPlayType('application/vnd.apple.mpegurl')) {
        video!.src = HLS_URL;
      }
    }

    initHLS();
    return () => {
      if (hlsInstance) hlsInstance.destroy();
    };
  }, []);

  // GSAP Marquee
  useEffect(() => {
    if (!marqueeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const WORKER_URL = 'https://contact-worker.perrydoyigbe.workers.dev';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('sending');

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error();

    setStatus('sent');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  } catch {
    setStatus('error');
    setTimeout(() => setStatus('idle'), 3000);
  }
};

  return (
    <section id="contact" className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative">
      {/* Background Video (flipped) */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Marquee */}
        <div className="overflow-hidden mb-16 md:mb-20">
          <div ref={marqueeRef} className="flex whitespace-nowrap">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="text-[clamp(3rem,10vw,8rem)] font-display italic text-text-primary/10 leading-none mx-4"
              >
                CONTACT • CONTACT •{' '}
              </span>
            ))}
          </div>
        </div>

        {/* CTA + Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 md:mb-24"
        >
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary mb-4">
                Travaillons
                <br />
                <span className="inline-block mt-2">ensemble</span>
              </h2>
              <p className="text-sm md:text-base text-muted mb-10 max-w-md mx-auto">
                Vous avez un projet en tête ? N'hésitez pas à me contacter. Je serais ravi d'en discuter avec vous.
              </p>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 rounded-xl bg-surface/50 border border-stroke text-text-primary text-sm placeholder:text-muted/50 focus:outline-none focus:border-[#89AACC]/50 focus:ring-1 focus:ring-[#89AACC]/30 transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Votre email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 rounded-xl bg-surface/50 border border-stroke text-text-primary text-sm placeholder:text-muted/50 focus:outline-none focus:border-[#89AACC]/50 focus:ring-1 focus:ring-[#89AACC]/30 transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Votre message..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 rounded-xl bg-surface/50 border border-stroke text-text-primary text-sm placeholder:text-muted/50 focus:outline-none focus:border-[#89AACC]/50 focus:ring-1 focus:ring-[#89AACC]/30 transition-all duration-300 backdrop-blur-sm resize-none"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="relative inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-bg bg-text-primary hover:bg-text-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Envoi...
                      </>
                    ) : status === 'sent' ? (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        Message envoyé ✓
                      </>
                    ) : status === 'error' ? (
                      'Erreur — réessayer'
                    ) : (
                      <>
                        Envoyer le message
                        <span className="text-sm">→</span>
                      </>
                    )}
                  </button>
                  {status === 'idle' && (
                    <span className="text-xs text-muted/60">Ou écrivez à{' '}
                      <a href="mailto:perrydoyigbe197@gmail.com" className="text-text-primary hover:text-[#89AACC] transition-colors underline underline-offset-2">
                        perrydoyigbe197@gmail.com
                      </a>
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Footer Bar */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-stroke">
            {/* Social Links */}
            <div className="flex items-center gap-6">
  {SOCIAL_LINKS.map((link) => (
    <a
      key={link.label}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-muted hover:text-text-primary transition-colors duration-200"
    >
      {link.label}
    </a>
  ))}
</div>

            {/* Availability */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm text-muted">Disponible pour projets</span>
            </div>

            {/* Copyright */}
            <div className="text-sm text-muted">
              &copy; {new Date().getFullYear()} Perry DOYIGBE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}