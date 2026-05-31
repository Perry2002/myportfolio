import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

const GITHUB_USERNAME = 'Perry2002';

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  PHP: '#777bb4',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dart: '#00b4ab',
};

export default function GitHubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=public`
        );
        if (!res.ok) throw new Error('GitHub API error');
        const data: Repo[] = await res.json();
        setRepos(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  if (loading) {
    return (
      <section className="bg-bg py-16 md:py-24 border-t border-stroke">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#89AACC]/30 border-t-[#89AACC] rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (error || repos.length === 0) {
    return null; // Silently hide if GitHub fetch fails (graceful degradation)
  }

  return (
    <section className="bg-bg py-16 md:py-24 border-t border-stroke relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#89AACC]/3 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Open Source</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic leading-[1.1] text-text-primary">
                GitHub <span className="font-display italic">repos</span>
              </h2>
              <p className="text-sm md:text-base text-muted mt-3">
                Mes derniers dépôts publics. Code ouvert, collaboration et apprentissage continu.
              </p>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-muted border border-stroke hover:ring-2 hover:ring-[#89AACC] hover:border-transparent transition-all duration-300"
            >
              GitHub <span className="text-xs">↗</span>
            </a>
          </div>
        </motion.div>

        {/* Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative bg-surface/30 border border-stroke rounded-xl p-5 hover:border-[#89AACC]/30 transition-all duration-500"
            >
              {/* Hover glow */}
              <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-[#89AACC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                {/* Repo name */}
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 shrink-0 text-muted" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 0 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8.5V1.5Z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-text-primary truncate group-hover:text-[#89AACC] transition-colors">
                    {repo.name}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-muted line-clamp-2 mb-3 min-h-[2.5em]">
                  {repo.description || 'Aucune description'}
                </p>

                {/* Bottom row */}
                <div className="flex items-center gap-4 text-xs text-muted">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#8b8b8b' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .25a12 12 0 0 0-3.8 23.38c.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.43-4.04-1.43-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1-.33 3.3 1.23a11.47 11.47 0 0 1 6 0c2.28-1.56 3.3-1.23 3.3-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.6-2.82 5.63-5.5 5.92.43.38.82 1.12.82 2.26v3.35c0 .32.22.7.83.58A12 12 0 0 0 12 .25Z" />
                    </svg>
                    {repo.forks_count}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}