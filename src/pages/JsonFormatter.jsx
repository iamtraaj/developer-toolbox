/**
 * JSON Formatter — Beautify, Minify, Validate JSON with error reporting.
 */
import { useState } from 'react';
import { FileJson, Copy, Minimize2, Maximize2, CheckCircle, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { copyToClipboard } from '../utils/copyToClipboard';

const SAMPLE = `{
  "name": "Developer Toolbox",
  "version": "1.0.0",
  "tools": ["JSON", "Password", "QR", "UUID"],
  "free": true,
  "author": { "name": "Dev", "site": "https://devtoolbox.app" }
}`;

export default function JsonFormatter() {
  const [input, setInput]   = useState('');
  const [output, setOutput] = useState('');
  const [error, setError]   = useState('');
  const [status, setStatus] = useState('idle'); // idle | valid | error

  function parseInput() {
    const src = input.trim();
    if (!src) { toast.error('Please enter JSON to process.'); return null; }
    try {
      const parsed = JSON.parse(src);
      setError('');
      return parsed;
    } catch (e) {
      setStatus('error');
      setError(e.message);
      setOutput('');
      return null;
    }
  }

  function handleBeautify() {
    const parsed = parseInput();
    if (!parsed) return;
    const pretty = JSON.stringify(parsed, null, 2);
    setOutput(pretty);
    setStatus('valid');
    toast.success('JSON beautified!');
  }

  function handleMinify() {
    const parsed = parseInput();
    if (!parsed) return;
    setOutput(JSON.stringify(parsed));
    setStatus('valid');
    toast.success('JSON minified!');
  }

  function handleValidate() {
    const parsed = parseInput();
    if (parsed !== null) {
      setStatus('valid');
      setOutput('✓ Valid JSON');
      toast.success('JSON is valid!');
    }
  }

  async function handleCopy() {
    if (!output) { toast.error('Nothing to copy.'); return; }
    await copyToClipboard(output);
    toast.success('Copied to clipboard!');
  }

  function handleClear() {
    setInput(''); setOutput(''); setError(''); setStatus('idle');
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30">
            <FileJson size={16} className="text-violet-600 dark:text-violet-400" />
          </span>
          <h1 className="page-title">JSON Formatter</h1>
        </div>
        <p className="page-subtitle ml-10">Beautify, minify, and validate JSON data</p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <button className="btn-primary" onClick={handleBeautify}>
          <Maximize2 size={14} /> Beautify
        </button>
        <button className="btn-secondary" onClick={handleMinify}>
          <Minimize2 size={14} /> Minify
        </button>
        <button className="btn-secondary" onClick={handleValidate}>
          <CheckCircle size={14} /> Validate
        </button>
        <button className="btn-ghost" onClick={() => { setInput(SAMPLE); setError(''); setStatus('idle'); }}>
          Load Sample
        </button>
        <button className="btn-ghost ml-auto" onClick={handleClear}>
          <Trash2 size={14} /> Clear
        </button>
      </div>

      {/* Editor grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="card p-4 space-y-2">
          <label className="label">Input JSON</label>
          <textarea
            className="textarea h-80 lg:h-96"
            placeholder='Paste your JSON here, e.g. {"key": "value"}'
            value={input}
            onChange={(e) => { setInput(e.target.value); setStatus('idle'); setError(''); }}
            spellCheck={false}
          />
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800
                            px-3 py-2 text-xs text-red-700 dark:text-red-400 font-mono">
              <span className="font-semibold">Parse Error: </span>{error}
            </div>
          )}
          {status === 'valid' && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle size={12} /> Valid JSON
            </p>
          )}
        </div>

        {/* Output */}
        <div className="card p-4 space-y-2">
          <div className="flex items-center justify-between">
            <label className="label">Output</label>
            <button className="btn-ghost text-xs py-1 px-2" onClick={handleCopy}>
              <Copy size={12} /> Copy
            </button>
          </div>
          <pre className="code-output h-80 lg:h-96">
            {output || <span className="text-slate-500 font-sans text-xs not-italic">Output will appear here…</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
