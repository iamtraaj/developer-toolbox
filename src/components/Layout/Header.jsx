/**
 * Header — sticky top bar with logo, search, theme toggle, and GitHub link.
 */
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, GitBranch, Search, Wrench, X, Menu } from 'lucide-react';
import { NAV_ITEMS } from '../../router/navConfig';

export default function Header({ onMenuToggle, theme, onThemeToggle }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Filter tools from query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }
    const q = query.toLowerCase();
    const filtered = NAV_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q)) ||
        item.description.toLowerCase().includes(q)
    );
    setResults(filtered);
    setShowResults(true);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSelect(path) {
    navigate(path);
    setQuery('');
    setShowResults(false);
  }

  return (
    <header className="sticky top-0 z-40 h-14 flex items-center gap-3 px-4 lg:px-6
                       bg-white/80 dark:bg-slate-950/80 backdrop-blur-md
                       border-b border-slate-200 dark:border-slate-800">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="btn-ghost lg:hidden p-2"
        aria-label="Toggle menu"
      >
        <Menu size={18} />
      </button>

      {/* Logo */}
      <a
        href="/"
        onClick={(e) => { e.preventDefault(); navigate('/'); }}
        className="flex items-center gap-2 shrink-0 group"
      >
        <span className="flex items-center justify-center w-7 h-7 rounded-lg
                         bg-brand-600 text-white shadow-sm group-hover:bg-brand-700 transition-colors">
          <Wrench size={14} strokeWidth={2.5} />
        </span>
        <span className="hidden sm:block text-sm font-bold text-slate-900 dark:text-white">
          Developer <span className="text-brand-600">Toolbox</span>
        </span>
      </a>

      {/* Search */}
      <div className="relative flex-1 max-w-sm ml-2" ref={searchRef}>
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search tools…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowResults(true)}
          className="w-full pl-8 pr-8 py-1.5 text-sm rounded-lg
                     bg-slate-100 dark:bg-slate-800
                     border border-transparent focus:border-brand-500
                     text-slate-900 dark:text-slate-100 placeholder-slate-400
                     focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-all"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setResults([]); setShowResults(false); }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={13} />
          </button>
        )}

        {/* Dropdown results */}
        {showResults && (
          <div className="absolute top-full mt-1.5 left-0 right-0 z-50 card shadow-lg py-1 animate-fade-in">
            {results.length === 0 ? (
              <p className="px-3 py-2.5 text-xs text-slate-500">No tools found for "{query}"</p>
            ) : (
              results.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleSelect(item.path)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-left
                               hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Icon size={14} className="text-brand-600 dark:text-brand-400 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{item.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{item.description}</p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-1">
        {/* Theme toggle */}
        <button
          onClick={onThemeToggle}
          className="btn-ghost p-2"
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* GitHub */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost p-2"
          aria-label="GitHub"
          title="View on GitHub"
        >
          <GitBranch size={16} />
        </a>
      </div>
    </header>
  );
}
