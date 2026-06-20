/**
 * Sidebar — fixed desktop nav + slide-over mobile drawer.
 */
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Wrench } from 'lucide-react';
import { NAV_ITEMS, COLOR_MAP } from '../../router/navConfig';

function NavItem({ item, onClick }) {
  const Icon = item.icon;
  const colors = COLOR_MAP[item.color] || COLOR_MAP['brand'];

  return (
    <NavLink
      to={item.path}
      end={item.path === '/'}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
         ${isActive
           ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 shadow-sm'
           : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
         }`
      }
    >
      {({ isActive }) => (
        <>
          <span className={`flex items-center justify-center w-7 h-7 rounded-md shrink-0
                            ${isActive ? colors.bg : 'bg-slate-100 dark:bg-slate-800'}`}>
            <Icon size={14} className={isActive ? colors.icon : 'text-slate-500 dark:text-slate-400'} />
          </span>
          <span className="truncate">{item.label}</span>
          {isActive && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500" />
          )}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  // Lock scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const sidebarContent = (
    <nav className="flex flex-col h-full">
      {/* Mobile header */}
      <div className="flex items-center justify-between px-4 py-3 lg:hidden border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-600 text-white">
            <Wrench size={14} strokeWidth={2.5} />
          </span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            Developer <span className="text-brand-600">Toolbox</span>
          </span>
        </div>
        <button onClick={onClose} className="btn-ghost p-2" aria-label="Close menu">
          <X size={16} />
        </button>
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="px-3 mb-2 text-xs font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
          Tools
        </p>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.path} item={item} onClick={onClose} />
        ))}
      </div>

      {/* Bottom badge */}
      <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800">
        <div className="rounded-lg bg-gradient-to-br from-brand-50 to-violet-50
                        dark:from-brand-900/20 dark:to-violet-900/20
                        border border-brand-100 dark:border-brand-800/50 p-3 text-center">
          <p className="text-xs font-semibold text-brand-700 dark:text-brand-300">
            {NAV_ITEMS.length - 1} Tools Available
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">100% Client-Side · Free Forever</p>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 h-[calc(100vh-3.5rem)]
                        sticky top-14 border-r border-slate-200 dark:border-slate-800
                        bg-white dark:bg-slate-950 overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Drawer */}
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-950
                            shadow-2xl animate-slide-in overflow-hidden">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
