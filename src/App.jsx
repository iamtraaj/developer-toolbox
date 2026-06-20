/**
 * App.jsx — Root component.
 * Wires together the theme hook, React Router, and the Layout shell.
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Layout from './components/Layout/Layout';

// Pages
import Dashboard           from './pages/Dashboard';
import JsonFormatter       from './pages/JsonFormatter';
import PasswordGenerator   from './pages/PasswordGenerator';
import QrGenerator         from './pages/QrGenerator';
import UuidGenerator       from './pages/UuidGenerator';
import Base64Tool          from './pages/Base64Tool';
import JwtDecoder          from './pages/JwtDecoder';
import TimestampConverter  from './pages/TimestampConverter';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout theme={theme} onThemeToggle={toggle} />}>
          <Route index                       element={<Dashboard />} />
          <Route path="json-formatter"       element={<JsonFormatter />} />
          <Route path="password-generator"   element={<PasswordGenerator />} />
          <Route path="qr-generator"         element={<QrGenerator />} />
          <Route path="uuid-generator"       element={<UuidGenerator />} />
          <Route path="base64-tool"          element={<Base64Tool />} />
          <Route path="jwt-decoder"          element={<JwtDecoder />} />
          <Route path="timestamp-converter"  element={<TimestampConverter />} />

          {/* 404 fallback */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <p className="text-6xl font-extrabold text-slate-200 dark:text-slate-800">404</p>
              <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">Page not found</p>
              <a href="/" className="btn-primary">Go to Dashboard</a>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
