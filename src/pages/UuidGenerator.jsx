/**
 * UUID Generator — Generate multiple UUID v4 identifiers.
 */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Fingerprint, Copy, RefreshCw, Trash2, CheckCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { copyToClipboard } from '../utils/copyToClipboard';

const PRESETS = [
  { label: '1 UUID',   count: 1 },
  { label: '5 UUIDs',  count: 5 },
  { label: '10 UUIDs', count: 10 },
  { label: '20 UUIDs', count: 20 },
];

function generateUUIDs(count) {
  return Array.from({ length: count }, () => uuidv4());
}

export default function UuidGenerator() {
  const [uuids, setUuids]   = useState(generateUUIDs(5));
  const [count, setCount]   = useState(5);
  const [copiedIndex, setCopiedIndex] = useState(null);

  function handleGenerate(c = count) {
    setCount(c);
    const newUuids = generateUUIDs(c);
    setUuids(newUuids);
    toast.success(`Generated ${c} UUID${c > 1 ? 's' : ''}!`);
  }

  async function handleCopySingle(uuid, index) {
    await copyToClipboard(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
    toast.success('UUID copied!');
  }

  async function handleCopyAll() {
    await copyToClipboard(uuids.join('\n'));
    toast.success('All UUIDs copied!');
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900/30">
            <Fingerprint size={16} className="text-pink-600 dark:text-pink-400" />
          </span>
          <h1 className="page-title">UUID Generator</h1>
        </div>
        <p className="page-subtitle ml-10">Generate RFC-compliant UUID v4 identifiers</p>
      </div>

      {/* Controls */}
      <div className="card p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="label mb-0 shrink-0">Generate:</span>
          {PRESETS.map((p) => (
            <button
              key={p.count}
              onClick={() => handleGenerate(p.count)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 active:scale-95
                          ${count === p.count
                            ? 'bg-brand-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
            >
              {p.label}
            </button>
          ))}

          <div className="ml-auto flex gap-2">
            <button className="btn-secondary" onClick={() => handleGenerate(count)}>
              <RefreshCw size={14} /> Regenerate
            </button>
            <button className="btn-primary" onClick={handleCopyAll}>
              <CheckCheck size={14} /> Copy All
            </button>
          </div>
        </div>
      </div>

      {/* UUID list */}
      <div className="card divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
        {uuids.map((uuid, i) => (
          <div
            key={uuid}
            className="flex items-center gap-4 px-4 py-3 group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-600 w-6 shrink-0">
              {i + 1}
            </span>
            <code className="flex-1 font-mono text-sm text-slate-800 dark:text-slate-200 break-all">
              {uuid}
            </code>
            <button
              onClick={() => handleCopySingle(uuid, i)}
              className={`shrink-0 p-1.5 rounded-md transition-all duration-150
                          ${copiedIndex === i
                            ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30'
                            : 'text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-700 opacity-0 group-hover:opacity-100'
                          }`}
              aria-label="Copy UUID"
              title="Copy to clipboard"
            >
              {copiedIndex === i ? <CheckCheck size={14} /> : <Copy size={14} />}
            </button>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-4 py-3">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-300">UUID v4</span> —
          Randomly generated 128-bit identifiers. Cryptographically unique with 2¹²² possible values.
          Format: <code className="font-mono text-[11px]">xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>
        </p>
      </div>
    </div>
  );
}
