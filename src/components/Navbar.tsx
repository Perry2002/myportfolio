import { useRef } from 'react';
// import ThemeToggle from './ThemeToggle';

const NAV_LINKS = ['Home', 'Work', 'Formation', 'Skills'];

interface NavbarProps {
  scrollY: number;
  activeSection: string;
  onNavClick: (section: string) => void;
}

export default function Navbar({ scrollY, activeSection, onNavClick }: NavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);

  const handleClick = (label: string) => {
    onNavClick(label);
  };

  return (
    <div ref={navRef} className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 dark:border-white/10 bg-surface/80 px-2 py-2 transition-shadow duration-300 ${
          scrollY > 100 ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleClick('Home'); }}
          className="group relative w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
        >
          {/* Accent gradient ring */}
          <span className="absolute inset-0 rounded-full accent-gradient transition-all duration-500 group-hover:[background:linear-gradient(270deg,#89AACC_0%,#4E85BF_100%)]" />
          {/* Inner circle */}
          <span className="absolute inset-[2px] rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary">DP</span>
          </span>
        </a>

        {/* Divider (desktop) */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Nav links */}
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={(e) => { e.preventDefault(); handleClick(link); }}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 ${
              activeSection === link ? 'text-text-primary bg-stroke/50' : 'text-muted hover:text-text-primary hover:bg-stroke/50'
            }`}
          >
            {link}
          </a>
        ))}

        {/* Divider */}
        <span className="w-px h-5 bg-stroke mx-1" />

        {/* Theme toggle */}
        {/* <ThemeToggle /> */}

        {/* Small spacer */}
        <span className="w-px h-5 bg-stroke mx-1" />

        {/* "Say hi" button */}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleClick('Contact'); }}
          className="relative group text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 overflow-hidden"
        >
          {/* Hover gradient border */}
          <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient" />
          <span className="relative bg-surface/80 rounded-full backdrop-blur-md flex items-center gap-1">
            Say hi
            <span className="text-xs">↗</span>
          </span>
        </a>
      </div>
    </div>
  );
}