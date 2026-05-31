import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 group"
    >
      {/* Subtle ring */}
      <span className="absolute inset-0 rounded-full border border-stroke group-hover:border-[#89AACC]/50 transition-colors duration-300" />

      {/* Inner content */}
      <span className="relative flex items-center justify-center">
        {theme === 'dark' ? (
          /* Sun icon (switch to light) */
          <svg className="w-4 h-4 text-muted group-hover:text-[#89AACC] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        ) : (
          /* Moon icon (switch to dark) */
          <svg className="w-4 h-4 text-muted group-hover:text-[#89AACC] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        )}
      </span>
    </button>
  );
}