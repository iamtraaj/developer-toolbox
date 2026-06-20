/**
 * QR Code Generator — generates QR codes from text/URL using the qrcode library.
 */
import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Copy, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { copyToClipboard } from '../utils/copyToClipboard';

const DEFAULT_TEXT = 'https://digitalheroesco.com';

export default function QrGenerator() {
  const [text, setText]       = useState(DEFAULT_TEXT);
  const [qrUrl, setQrUrl]     = useState('');
  const [color, setColor]     = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize]       = useState(300);
  const canvasRef = useRef(null);

  // Auto-generate on text/color changes
  useEffect(() => {
    if (!text.trim()) { setQrUrl(''); return; }
    generateQR();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, color, bgColor, size]);

  async function generateQR() {
    if (!text.trim()) { toast.error('Enter text or URL to generate a QR code.'); return; }
    try {
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: {
          dark: color,
          light: bgColor,
        },
        errorCorrectionLevel: 'H',
      });
      setQrUrl(url);
      toast.success('QR code generated!');
    } catch (err) {
      toast.error('Failed to generate QR code: ' + err.message);
    }
  }

  function handleDownload() {
    if (!qrUrl) return;
    const a = document.createElement('a');
    a.href = qrUrl;
    a.download = 'qr-code.png';
    a.click();
    toast.success('QR code downloaded!');
  }

  async function handleCopyInput() {
    await copyToClipboard(text);
    toast.success('Input copied!');
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30">
            <QrCode size={16} className="text-amber-600 dark:text-amber-400" />
          </span>
          <h1 className="page-title">QR Code Generator</h1>
        </div>
        <p className="page-subtitle ml-10">Create QR codes from any text or URL instantly</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Controls */}
        <div className="lg:col-span-2 card p-5 space-y-5">
          {/* Input */}
          <div>
            <label className="label">Text or URL</label>
            <textarea
              className="textarea h-36"
              placeholder="https://example.com"
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Foreground</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border border-slate-200 dark:border-slate-700"
                />
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400">{color}</span>
              </div>
            </div>
            <div>
              <label className="label">Background</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border border-slate-200 dark:border-slate-700"
                />
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400">{bgColor}</span>
              </div>
            </div>
          </div>

          {/* Size slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="label mb-0">Size</label>
              <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400">{size}px</span>
            </div>
            <input
              type="range"
              min={128}
              max={512}
              step={16}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button className="btn-primary w-full justify-center" onClick={generateQR}>
              <QrCode size={14} /> Generate QR
            </button>
            <button className="btn-secondary w-full justify-center" onClick={handleCopyInput}>
              <Copy size={14} /> Copy Input
            </button>
            <button className="btn-ghost w-full justify-center" onClick={() => { setText(''); setQrUrl(''); }}>
              <Trash2 size={14} /> Clear
            </button>
          </div>
        </div>

        {/* QR Preview */}
        <div className="lg:col-span-3 card p-5 flex flex-col items-center justify-center gap-5">
          {qrUrl ? (
            <>
              <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
                <img src={qrUrl} alt="Generated QR Code" width={Math.min(size, 320)} height={Math.min(size, 320)} />
              </div>
              <button className="btn-primary" onClick={handleDownload}>
                <Download size={14} /> Download PNG
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 text-slate-400 dark:text-slate-600 py-12">
              <QrCode size={56} strokeWidth={1} />
              <p className="text-sm">Enter text or URL to generate a QR code</p>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
}
