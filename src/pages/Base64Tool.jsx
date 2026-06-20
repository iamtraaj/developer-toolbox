/**
 * Base64 Tool — Encode and decode Base64 strings with error handling.
 */
import { useState } from 'react';
import { Binary, Copy, Trash2, ArrowDownUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { encodeBase64, decodeBase64 } from '../utils/base64Utils';
import { copyToClipboard } from '../utils/copyToClipboard';

export default function Base64Tool() {
  const [mode, setMode]   = useState('encode'); // 'encode' | 'decode'
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError]   = useState('');

  function process() {
    setError('');
    if (!input.trim()) { toast.error('Please enter some text.'); return; }

    const fn = mode === 'encode' ? encodeBase64 : decodeBase64;
    const { result, error: err } = fn(input);

    if (err) {
      setError(err);
      setOutput('');
      toast.error('Decoding failed. Check your input.');
    } else {
      setOutput(result);
      toast.success(mode === 'encode' ? 'Encoded successfully!' : 'Decoded successfully!');
    }
  }

  function handleSwap() {
    setMode((m) => (m === 'encode' ? 'decode' : 'encode'));
    setInput(output);
    setOutput('');
    setError('');
  }

  function handleClear() {
    setInput(''); setOutput(''); setError('');
  }

  async function handleCopy() {
    if (!output) { toast.error('Nothing to copy.'); return; }
    await copyToClipboard(output);
    toast.success('Copied to clipboard!');
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
            <Binary size={16} className="text-cyan-600 dark:text-cyan-400" />
          </span>
          <h1 className="page-title">Base64 Tool</h1>
        </div>
        <p className="page-subtitle ml-10">Encode plain text to Base64 or decode Base64 to text</p>
      </div>

      {/* Mode toggle */}
      <div className="card p-1.5 inline-flex rounded-xl gap-1">
        {['encode', 'decode'].map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setOutput(''); setError(''); }}
            className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-150
                        ${mode === m
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="card p-4 space-y-2">
          <label className="label">
            {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
          </label>
          <textarea
            className="textarea h-64"
            placeholder={
              mode === 'encode'
                ? 'Enter plain text to encode…'
                : 'Enter Base64 string to decode…'
            }
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(''); }}
            spellCheck={mode === 'encode'}
          />
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800
                            px-3 py-2 text-xs text-red-700 dark:text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* Output */}
        <div className="card p-4 space-y-2">
          <div className="flex items-center justify-between">
            <label className="label">
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
            </label>
            <button className="btn-ghost text-xs py-1 px-2" onClick={handleCopy}>
              <Copy size={12} /> Copy
            </button>
          </div>
          <pre className="code-output h-64">
            {output || <span className="text-slate-500 font-sans text-xs not-italic">Output will appear here…</span>}
          </pre>
        </div>
      </div>

      {/* Action row */}
      <div className="flex flex-wrap gap-3">
        <button className="btn-primary" onClick={process}>
          <Binary size={14} />
          {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
        </button>
        <button className="btn-secondary" onClick={handleSwap} disabled={!output}>
          <ArrowDownUp size={14} /> Swap Input/Output
        </button>
        <button className="btn-ghost" onClick={handleClear}>
          <Trash2 size={14} /> Clear
        </button>
      </div>
    </div>
  );
}
