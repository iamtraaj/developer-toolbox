/**
 * JWT Decoder — Decode JWT tokens locally (no verification).
 * Displays header, payload as pretty JSON, and checks expiry.
 */
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { ShieldCheck, Copy, Trash2, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { copyToClipboard } from '../utils/copyToClipboard';

const SAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.' +
  'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

function JsonDisplay({ data, title }) {
  return (
    <div className="space-y-2">
      <label className="label">{title}</label>
      <pre className="code-output text-xs">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default function JwtDecoder() {
  const [token, setToken]     = useState('');
  const [decoded, setDecoded] = useState(null);
  const [rawHeader, setRawHeader] = useState(null);
  const [error, setError]     = useState('');

  function decodeToken() {
    const raw = token.trim();
    if (!raw) { toast.error('Please enter a JWT token.'); return; }
    try {
      // Decode payload
      const payload = jwtDecode(raw);

      // Manually decode header (jwt-decode only exposes payload by default)
      const parts = raw.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT structure (expected 3 parts).');
      const headerJson = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));

      setRawHeader(headerJson);
      setDecoded(payload);
      setError('');
      toast.success('JWT decoded successfully!');
    } catch (e) {
      setError(e.message || 'Invalid JWT token.');
      setDecoded(null);
      setRawHeader(null);
      toast.error('Failed to decode JWT.');
    }
  }

  function getStatus() {
    if (!decoded) return null;
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp) {
      if (decoded.exp < now) {
        const expiredAt = new Date(decoded.exp * 1000).toLocaleString();
        return { expired: true, message: `Expired on ${expiredAt}` };
      }
      const expiresAt = new Date(decoded.exp * 1000).toLocaleString();
      return { expired: false, message: `Valid — expires ${expiresAt}` };
    }
    return { expired: false, message: 'No expiry (exp claim absent)' };
  }

  async function handleCopyPayload() {
    if (!decoded) return;
    await copyToClipboard(JSON.stringify(decoded, null, 2));
    toast.success('Payload copied!');
  }

  const status = getStatus();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/30">
            <ShieldCheck size={16} className="text-rose-600 dark:text-rose-400" />
          </span>
          <h1 className="page-title">JWT Decoder</h1>
        </div>
        <p className="page-subtitle ml-10">Decode and inspect JWT tokens locally — no data leaves your browser</p>
      </div>

      {/* Input */}
      <div className="card p-5 space-y-3">
        <label className="label">JWT Token</label>
        <textarea
          className="textarea h-32 text-[11px]"
          placeholder="Paste your JWT token here…"
          value={token}
          onChange={(e) => { setToken(e.target.value); setError(''); setDecoded(null); }}
          spellCheck={false}
        />
        {error && (
          <div className="flex items-start gap-2 rounded-lg bg-red-50 dark:bg-red-900/20
                          border border-red-200 dark:border-red-800 px-3 py-2 text-xs text-red-700 dark:text-red-400">
            <AlertCircle size={13} className="shrink-0 mt-0.5" />
            {error}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary" onClick={decodeToken}>
            <ShieldCheck size={14} /> Decode Token
          </button>
          <button className="btn-ghost" onClick={() => { setToken(SAMPLE_JWT); setDecoded(null); setError(''); }}>
            Load Sample
          </button>
          <button className="btn-ghost" onClick={() => { setToken(''); setDecoded(null); setError(''); }}>
            <Trash2 size={14} /> Clear
          </button>
        </div>
      </div>

      {/* Decoded output */}
      {decoded && (
        <div className="space-y-4 animate-fade-in">
          {/* Status badge */}
          {status && (
            <div className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium
                             ${status.expired
                               ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
                               : 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'
                             }`}>
              {status.expired
                ? <AlertCircle size={15} className="shrink-0" />
                : <CheckCircle size={15} className="shrink-0" />
              }
              <span className="font-semibold">{status.expired ? 'Expired' : 'Valid'}</span>
              <span className="text-xs opacity-75 ml-1">— {status.message}</span>
            </div>
          )}

          {/* Issued / Expiry quick info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Subject (sub)', value: decoded.sub ?? '—' },
              { label: 'Issued At',     value: decoded.iat ? new Date(decoded.iat * 1000).toLocaleString() : '—' },
              { label: 'Expires At',    value: decoded.exp ? new Date(decoded.exp * 1000).toLocaleString() : '—' },
            ].map((s) => (
              <div key={s.label} className="card px-4 py-3">
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold mb-0.5">{s.label}</p>
                <p className="text-xs text-slate-800 dark:text-slate-200 font-mono break-all">{String(s.value)}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Header */}
            <div className="card p-4">
              <JsonDisplay data={rawHeader} title="Header" />
            </div>

            {/* Payload */}
            <div className="card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <JsonDisplay data={decoded} title="Payload" />
              </div>
              <button className="btn-secondary w-full justify-center" onClick={handleCopyPayload}>
                <Copy size={13} /> Copy Payload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
