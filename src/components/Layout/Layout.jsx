/**
 * Layout — root shell: Header + Sidebar + main content area + Footer.
 */
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useLastTool } from '../../hooks/useLastTool';

export default function Layout({ theme, onThemeToggle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Persist last visited tool
  useLastTool();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 500,
            padding: '10px 14px',
            background: theme === 'dark' ? '#1e293b' : '#fff',
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
            border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />

      {/* Header */}
      <Header
        theme={theme}
        onThemeToggle={onThemeToggle}
        onMenuToggle={() => setSidebarOpen(true)}
      />

      {/* Body: sidebar + page content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 flex flex-col overflow-y-auto">
          <div className="flex-1 p-5 lg:p-7 max-w-5xl w-full mx-auto">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
