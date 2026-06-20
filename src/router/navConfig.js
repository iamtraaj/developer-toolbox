/**
 * Central navigation configuration used by the Sidebar, Header search,
 * Dashboard, and React Router route definitions.
 */
import {
  LayoutDashboard,
  FileJson,
  KeyRound,
  QrCode,
  Fingerprint,
  Binary,
  ShieldCheck,
  Clock,
} from 'lucide-react';

export const NAV_ITEMS = [
  {
    path: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Overview of all available developer tools',
    keywords: ['home', 'dashboard', 'overview'],
    color: 'brand',
  },
  {
    path: '/json-formatter',
    label: 'JSON Formatter',
    icon: FileJson,
    description: 'Beautify, minify, and validate JSON data',
    keywords: ['json', 'format', 'validate', 'minify', 'beautify', 'pretty'],
    color: 'violet',
  },
  {
    path: '/password-generator',
    label: 'Password Generator',
    icon: KeyRound,
    description: 'Generate secure, cryptographically random passwords',
    keywords: ['password', 'generate', 'secure', 'random', 'strength'],
    color: 'emerald',
  },
  {
    path: '/qr-generator',
    label: 'QR Generator',
    icon: QrCode,
    description: 'Create QR codes from any text or URL',
    keywords: ['qr', 'code', 'generator', 'barcode', 'url', 'image'],
    color: 'amber',
  },
  {
    path: '/uuid-generator',
    label: 'UUID Generator',
    icon: Fingerprint,
    description: 'Generate RFC-compliant UUID v4 identifiers',
    keywords: ['uuid', 'guid', 'unique', 'id', 'identifier'],
    color: 'pink',
  },
  {
    path: '/base64-tool',
    label: 'Base64 Tool',
    icon: Binary,
    description: 'Encode and decode Base64 strings',
    keywords: ['base64', 'encode', 'decode', 'binary', 'text'],
    color: 'cyan',
  },
  {
    path: '/jwt-decoder',
    label: 'JWT Decoder',
    icon: ShieldCheck,
    description: 'Decode and inspect JWT tokens without verification',
    keywords: ['jwt', 'token', 'decode', 'header', 'payload', 'auth'],
    color: 'rose',
  },
  {
    path: '/timestamp-converter',
    label: 'Timestamp Converter',
    icon: Clock,
    description: 'Convert Unix timestamps to human-readable dates',
    keywords: ['timestamp', 'unix', 'date', 'time', 'convert', 'epoch'],
    color: 'orange',
  },
];

/** Tailwind color maps for tool cards (safe-listed by hand) */
export const COLOR_MAP = {
  brand:   { bg: 'bg-brand-100 dark:bg-brand-900/30',   icon: 'text-brand-600 dark:text-brand-400',   ring: 'ring-brand-500' },
  violet:  { bg: 'bg-violet-100 dark:bg-violet-900/30', icon: 'text-violet-600 dark:text-violet-400', ring: 'ring-violet-500' },
  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', icon: 'text-emerald-600 dark:text-emerald-400', ring: 'ring-emerald-500' },
  amber:   { bg: 'bg-amber-100 dark:bg-amber-900/30',   icon: 'text-amber-600 dark:text-amber-400',   ring: 'ring-amber-500' },
  pink:    { bg: 'bg-pink-100 dark:bg-pink-900/30',     icon: 'text-pink-600 dark:text-pink-400',     ring: 'ring-pink-500' },
  cyan:    { bg: 'bg-cyan-100 dark:bg-cyan-900/30',     icon: 'text-cyan-600 dark:text-cyan-400',     ring: 'ring-cyan-500' },
  rose:    { bg: 'bg-rose-100 dark:bg-rose-900/30',     icon: 'text-rose-600 dark:text-rose-400',     ring: 'ring-rose-500' },
  orange:  { bg: 'bg-orange-100 dark:bg-orange-900/30', icon: 'text-orange-600 dark:text-orange-400', ring: 'ring-orange-500' },
};
