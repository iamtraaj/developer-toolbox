/**
 * Footer — branding, developer credits, and the mandatory "Built for Digital Heroes" button.
 */
import { Heart, ExternalLink } from "lucide-react";

const DEVELOPER = {
  name: "Md Tauseef Alam",
  email: "mdtauseefalam16@gmail.com",
};

export default function Footer() {
  return (
    <footer
      className="border-t border-slate-200 dark:border-slate-800
                       bg-white dark:bg-slate-950 px-6 py-6 mt-auto"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left — project info */}
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Developer Toolbox
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center justify-center md:justify-start gap-1">
            Built with{" "}
            <Heart size={11} className="text-rose-500 fill-rose-500" /> React +
            Vite + Tailwind CSS
          </p>
        </div>

        {/* Center — developer credits */}
        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {DEVELOPER.name}
            </span>
          </p>
          <a
            href={`mailto:${DEVELOPER.email}`}
            className="text-xs text-brand-600 dark:text-brand-400 hover:underline"
          >
            {DEVELOPER.email}
          </a>
        </div>

        {/* Right — Built for Digital Heroes CTA */}
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                     bg-gradient-to-r from-brand-600 to-violet-600
                     hover:from-brand-700 hover:to-violet-700
                     text-white text-sm font-semibold shadow-md
                     hover:shadow-lg transition-all duration-200 active:scale-95
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Built for Digital Heroes
          <ExternalLink size={13} />
        </a>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-900 text-center">
        <p className="text-[11px] text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} Developer Toolbox — Free Developer
          Utilities in One Place
        </p>
      </div>
    </footer>
  );
}
