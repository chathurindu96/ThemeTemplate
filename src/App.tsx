import { useState, useEffect } from 'react';
import { ThemeProvider, NotificationProvider, useNotifications } from './lib/hooks';
import { AppShell } from './components/AppShell';
import { Dashboard } from './pages/Dashboard';
import { Components } from './pages/Components';
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';

function NotificationToast() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-[200] space-y-2 max-w-sm">
      {notifications.map(n => (
        <div key={n.id} className="flex items-start gap-3 p-3 rounded-lg shadow-lg border animate-in"
          style={{
            background: 'var(--bg-surface)',
            borderColor: n.type === 'success' ? 'var(--success)' : n.type === 'error' ? 'var(--danger)' : n.type === 'warning' ? 'var(--warning)' : 'var(--info)',
          }}>
          <div className="flex-shrink-0 mt-0.5">
            {n.type === 'success' && <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />}
            {n.type === 'error' && <AlertCircle size={16} style={{ color: 'var(--danger)' }} />}
            {n.type === 'warning' && <AlertTriangle size={16} style={{ color: 'var(--warning)' }} />}
            {n.type === 'info' && <Info size={16} style={{ color: 'var(--info)' }} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{n.title}</p>
            <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{n.message}</p>
          </div>
          <button onClick={() => removeNotification(n.id)} className="flex-shrink-0">
            <X size={14} style={{ color: 'var(--text-muted)' }} />
          </button>
        </div>
      ))}
    </div>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash || 'dashboard';
  });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash) setCurrentPage(hash);
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
  };

  return (
    <>
      <AppShell currentPage={currentPage} onNavigate={navigate}>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'components' && <Components />}
        {(currentPage !== 'dashboard' && currentPage !== 'components') && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Page: {currentPage}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>This page is a placeholder in the demo.</p>
            </div>
          </div>
        )}
      </AppShell>
      <NotificationToast />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </ThemeProvider>
  );
}
