/**
 * Unix Timestamp Converter — Bidirectional timestamp ↔ date conversion.
 */
import { useState } from 'react';
import { Clock, Copy, RefreshCw, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { copyToClipboard } from '../utils/copyToClipboard';

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date);
}

export default function TimestampConverter() {
  // Timestamp → Date
  const [timestamp, setTimestamp] = useState(String(Math.floor(Date.now() / 1000)));
  const [tsResult, setTsResult]   = useState('');
  const [tsError, setTsError]     = useState('');

  // Date → Timestamp
  const [dateInput, setDateInput] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [dateResult, setDateResult] = useState('');
  const [dateError, setDateError]   = useState('');

  function convertTimestamp() {
    setTsError('');
    const n = Number(timestamp.trim());
    if (!timestamp.trim() || isNaN(n)) { setTsError('Enter a valid integer timestamp.'); return; }

    // Auto-detect ms vs seconds
    const ms = n > 1e12 ? n : n * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) { setTsError('Timestamp is out of range.'); return; }

    const result = formatDate(d);
    setTsResult(result);
    toast.success('Timestamp converted!');
  }

  function convertDate() {
    setDateError('');
    if (!dateInput) { setDateError('Please select a date/time.'); return; }
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) { setDateError('Invalid date value.'); return; }
    setDateResult(String(Math.floor(d.getTime() / 1000)));
    toast.success('Date converted!');
  }

  function useCurrentTimestamp() {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(String(now));
    setTsResult('');
    setTsError('');
    toast.success('Current timestamp loaded!');
  }

  async function handleCopyTs() {
    if (!tsResult) return;
    await copyToClipboard(tsResult);
    toast.success('Result copied!');
  }

  async function handleCopyDate() {
    if (!dateResult) return;
    await copyToClipboard(dateResult);
    toast.success('Timestamp copied!');
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30">
            <Clock size={16} className="text-orange-600 dark:text-orange-400" />
          </span>
          <h1 className="page-title">Timestamp Converter</h1>
        </div>
        <p className="page-subtitle ml-10">Convert between Unix timestamps and human-readable dates</p>
      </div>

      {/* Current timestamp reference */}
      <div className="card px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Current Unix Timestamp</p>
          <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white">
            {Math.floor(Date.now() / 1000)}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {formatDate(new Date())}
          </p>
        </div>
        <button className="btn-secondary" onClick={useCurrentTimestamp}>
          <RefreshCw size={14} /> Use Current
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timestamp → Date */}
        <div className="card p-5 space-y-4">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock size={15} className="text-orange-500" />
            Timestamp → Date
          </h2>

          <div>
            <label className="label">Unix Timestamp</label>
            <div className="flex gap-2">
              <input
                type="number"
                className="input flex-1"
                placeholder="e.g. 1716239022"
                value={timestamp}
                onChange={(e) => { setTimestamp(e.target.value); setTsError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && convertTimestamp()}
              />
            </div>
            {tsError && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1.5">{tsError}</p>
            )}
          </div>

          <button className="btn-primary w-full justify-center" onClick={convertTimestamp}>
            <ArrowRight size={14} /> Convert to Date
          </button>

          {tsResult && (
            <div className="rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold mb-1">
                    Result
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">{tsResult}</p>
                </div>
                <button onClick={handleCopyTs} className="btn-ghost p-1.5 shrink-0">
                  <Copy size={13} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Date → Timestamp */}
        <div className="card p-5 space-y-4">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <ArrowRight size={15} className="text-orange-500" />
            Date → Timestamp
          </h2>

          <div>
            <label className="label">Date & Time</label>
            <input
              type="datetime-local"
              className="input"
              value={dateInput}
              onChange={(e) => { setDateInput(e.target.value); setDateError(''); }}
            />
            {dateError && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1.5">{dateError}</p>
            )}
          </div>

          <button className="btn-primary w-full justify-center" onClick={convertDate}>
            <ArrowRight size={14} /> Convert to Timestamp
          </button>

          {dateResult && (
            <div className="rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold mb-1">
                    Unix Timestamp
                  </p>
                  <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white">{dateResult}</p>
                </div>
                <button onClick={handleCopyDate} className="btn-ghost p-1.5 shrink-0">
                  <Copy size={13} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reference table */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Quick Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-slate-600 dark:text-slate-400">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="text-left pb-2 font-semibold text-slate-700 dark:text-slate-300">Label</th>
                <th className="text-right pb-2 font-semibold text-slate-700 dark:text-slate-300">Seconds</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {[
                ['1 minute',  60],
                ['1 hour',    3600],
                ['1 day',     86400],
                ['1 week',    604800],
                ['1 month',   2592000],
                ['1 year',    31536000],
              ].map(([label, secs]) => (
                <tr key={label}>
                  <td className="py-1.5">{label}</td>
                  <td className="py-1.5 text-right font-mono">{secs.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
