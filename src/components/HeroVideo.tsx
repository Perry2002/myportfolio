import { useEffect, useRef } from 'react';

const HLS_URL = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}