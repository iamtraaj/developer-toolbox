/**
 * Password Generator — Cryptographically random, strength indicator.
 */
import { useState, useEffect, useCallback } from 'react';
import { KeyRound, Copy, RefreshCw, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { generatePassword, getPasswordStrength } from '../utils/passwordUtils';
import { copyToClipboard } from '../utils/copyToClipboard';

const STRENGTH_COLORS = {
  red:     { bar: 'bg-red-500',    text: 'text-red-500 dark:text-red-400' },
  orange:  { bar: 'bg-orange-500', text: 'text-orange-500 dark:text-orange-400' },
  amber:   { bar: 'bg-amber-500',  text: 'text-amber-500 dark:text-amber-400' },
  blue:    { bar: 'bg-brand-500',  text: 'text-brand-500 dark:text-brand-400' },
  emerald: { bar: 'bg-emerald-500',text: 'text-emerald-500 dark:text-emerald-400' },
};

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded"
      />
      <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
}

export default function PasswordGenerator() {
  const [opts, setOpts] = useState({
    length: 20,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const generate = useCallback(() => {
    const pwd = generatePassword(opts);
    setPassword(pwd);
    if (pwd) toast.success('Password generated!');
    else toast.error('Select at least one character type.');
  }, [opts]);

  // Auto-generate on mount and when opts change
  useEffect(() => { generate(); }, [generate]);

  const strength = getPasswordStrength(password);
  const colors = STRENGTH_COLORS[strength.color] || STRENGTH_COLORS.red;

  async function handleCopy() {
    if (!password) return;
    await copyToClipboard(password);
    toast.success('Password copied!');
  }

  function toggle(key) {
    setOpts((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
            <KeyRound size={16} className="text-emerald-600 dark:text-emerald-400" />
          </span>
          <h1 className="page-title">Password Generator</h1>
        </div>
        <p className="page-subtitle ml-10">Generate cryptographically secure random passwords</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Controls */}
        <div className="lg:col-span-2 card p-5 space-y-6">
          {/* Length */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="label mb-0">Length</label>
              <span className="text-sm font-mono font-bold text-brand-600 dark:text-brand-400">
                {opts.length}
              </span>
            </div>
            <input
              type="range"
              min={8}
              max={64}
              value={opts.length}
              onChange={(e) => setOpts((prev) => ({ ...prev, length: Number(e.target.value) }))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>8</span><span>64</span>
            </div>
          </div>

          {/* Character types */}
          <div className="space-y-3">
            <label className="label">Character Types</label>
            <Checkbox label="Uppercase (A-Z)" checked={opts.uppercase} onChange={() => toggle('uppercase')} />
            <Checkbox label="Lowercase (a-z)" checked={opts.lowercase} onChange={() => toggle('lowercase')} />
            <Checkbox label="Numbers (0-9)"   checked={opts.numbers}   onChange={() => toggle('numbers')} />
            <Checkbox label="Symbols (!@#…)"  checked={opts.symbols}   onChange={() => toggle('symbols')} />
          </div>

          <button className="btn-primary w-full justify-center" onClick={generate}>
            <RefreshCw size={14} /> Regenerate
          </button>
        </div>

        {/* Output */}
        <div className="lg:col-span-3 space-y-4">
          {/* Password display */}
          <div className="card p-5 space-y-4">
            <label className="label">Generated Password</label>
            <div className="relative">
              <div className="font-mono text-sm bg-slate-950 text-emerald-400 rounded-lg px-4 py-4
                              break-all leading-relaxed min-h-[80px] flex items-center pr-12">
                {password
                  ? (showPassword ? password : '•'.repeat(password.length))
                  : <span className="text-slate-500 font-sans text-xs">Your password will appear here…</span>
                }
              </div>
              <button
                onClick={() => setShowPassword((v) => !v)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-200 transition-colors"
                aria-label="Toggle visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Strength bar */}
            {password && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Strength</span>
                  <span className={`text-xs font-semibold ${colors.text}`}>{strength.label}</span>
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300
                                  ${i <= strength.score ? colors.bar : 'bg-slate-200 dark:bg-slate-700'}`}
                    />
                  ))}
                </div>
              </div>
            )}

            <button className="btn-primary w-full justify-center" onClick={handleCopy}>
              <Copy size={14} /> Copy Password
            </button>
          </div>

          {/* Password stats */}
          {password && (
            <div className="card p-4">
              <label className="label">Analysis</label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  { label: 'Length',    value: password.length },
                  { label: 'Uppercase', value: (password.match(/[A-Z]/g) || []).length },
                  { label: 'Lowercase', value: (password.match(/[a-z]/g) || []).length },
                  { label: 'Symbols',   value: (password.match(/[^A-Za-z0-9]/g) || []).length },
                ].map((s) => (
                  <div key={s.label} className="bg-slate-50 dark:bg-slate-800 rounded-lg px-3 py-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
