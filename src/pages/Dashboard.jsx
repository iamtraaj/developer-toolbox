/**
 * Dashboard — hero section + tool cards grid with animated hover effects.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { NAV_ITEMS, COLOR_MAP } from '../router/navConfig';

function ToolCard({ item }) {
  const navigate = useNavigate();
  const Icon = item.icon;
  const colors = COLOR_MAP[item.color] || COLOR_MAP['brand'];
  const tools = NAV_ITEMS.filter((n) => n.path !== '/');

  return (
    <div
      className="card-hover p-5 flex flex-col gap-4 cursor-pointer group"
      onClick={() => navigate(item.path)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(item.path)}
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                       ${colors.bg} transition-transform duration-200 group-hover:scale-110`}>
        <Icon size={20} className={colors.icon} />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {item.label}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400
                      opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        Open Tool <ArrowRight size={12} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const tools = NAV_ITEMS.filter((n) => n.path !== '/');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl
                      bg-gradient-to-br from-brand-600 via-brand-700 to-violet-700
                      p-8 text-white shadow-xl">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full
                        bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full
                        bg-violet-400/20 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                          bg-white/20 text-xs font-semibold mb-4">
            <Zap size={11} className="fill-yellow-300 text-yellow-300" />
            Free Developer Utilities in One Place
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight">
            Developer<br />
            <span className="text-brand-200">Toolbox</span>
          </h1>
          <p className="mt-3 text-sm text-brand-100 max-w-md leading-relaxed">
            A collection of {tools.length} essential tools for developers. Fast, free,
            and works entirely in your browser — no servers, no sign-up.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-xs text-brand-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              No sign-up required
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              100% client-side
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Open source
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Tools', value: tools.length },
          { label: 'Cost', value: '$0' },
          { label: 'Privacy', value: '100%' },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">{s.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tools grid */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">All Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((item) => (
            <ToolCard key={item.path} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
