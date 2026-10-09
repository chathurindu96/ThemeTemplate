import { useState, type ReactNode } from 'react';
import { useTheme } from '../lib/hooks';
import {
  LayoutDashboard, BarChart3, PieChart, Database, Settings, HelpCircle,
  Blocks, ChevronDown, ChevronRight, Search, Bell, Menu, X, Sun, Moon,
  Sparkles
} from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'analytics', label: 'Analytics', icon: PieChart },
  { id: 'datasources', label: 'Data Sources', icon: Database },
  { id: 'settings', label: 'Setting', icon: Settings },
  { id: 'help', label: 'Help', icon: HelpCircle },
  { id: 'components', label: 'Components', icon: Blocks },
];

export function AppShell({ children, currentPage, onNavigate }: AppShellProps) {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="min-h-screen w-full" style={{ background: `linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))` }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-[220px] flex-shrink-0
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `} style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border-default)' }}>
          <div className="flex flex-col h-full overflow-hidden">
            {/* Brand */}
            <div className="flex items-center gap-2.5 px-5 py-4 border-b flex-shrink-0" style={{ borderColor: 'var(--border-default)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--primary), #5B2D8E)' }}>
                <Sparkles size={16} color="white" />
              </div>
              <span className="font-bold text-[15px]" style={{ color: 'var(--text-primary)' }}>DataAI</span>
              <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
                <X size={18} style={{ color: 'var(--text-secondary)' }} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-3 px-3 overflow-y-auto">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { onNavigate(item.id); setSidebarOpen(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-[13px] font-medium transition-all relative"
                    style={{
                      background: isActive ? 'var(--primary-light)' : 'transparent',
                      color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full" style={{ background: 'var(--primary)' }} />}
                    <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Bottom promo card */}
            <div className="p-3 mt-auto">
              <div className="rounded-2xl p-4 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #774AA4 0%, #5B2D8E 50%, #4A1D7A 100%)' }}>
                <div className="absolute top-0 right-0 w-16 h-16 rounded-full opacity-20" style={{ background: 'white', transform: 'translate(30%, -30%)' }} />
                <div className="absolute bottom-0 left-0 w-12 h-12 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(-30%, 30%)' }} />
                <div className="relative">
                  <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}>
                    <Sparkles size={18} color="white" />
                  </div>
                  <p className="text-white text-xs font-bold mb-0.5">Upgrade to Pro</p>
                  <p className="text-white/60 text-[10px] mb-3">Get advanced analytics & reports</p>
                  <button className="w-full py-2 rounded-xl text-xs font-bold text-[#5B2D8E] bg-white hover:bg-gray-50 transition-colors shadow-sm">
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Application Shell Container */}
          <div className="flex-1 flex flex-col rounded-tl-[20px] rounded-tr-[20px] lg:rounded-tl-[24px] overflow-hidden min-h-screen" style={{ background: 'var(--bg-app)' }}>
            {/* Header */}
            <header className="sticky top-0 z-30 flex items-center gap-4 px-4 lg:px-6 h-[60px] border-b" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
              <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu size={20} style={{ color: 'var(--text-primary)' }} />
              </button>

              <h1 className="text-base font-semibold capitalize hidden sm:block" style={{ color: 'var(--text-primary)' }}>
                {currentPage === 'components' ? 'Component Showcase' : currentPage}
              </h1>

              {/* Search */}
              <div className={`flex-1 max-w-md mx-auto relative transition-all ${searchFocused ? 'max-w-lg' : ''}`}>
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg text-sm border outline-none transition-all"
                  style={{
                    background: 'var(--bg-subtle)',
                    borderColor: searchFocused ? 'var(--primary)' : 'var(--border-default)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>

              {/* Right controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg transition-colors hover:opacity-80"
                  style={{ background: 'var(--bg-subtle)' }}
                  title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? <Moon size={18} style={{ color: 'var(--text-secondary)' }} /> : <Sun size={18} style={{ color: 'var(--text-secondary)' }} />}
                </button>

                <button className="p-2 rounded-lg relative transition-colors hover:opacity-80" style={{ background: 'var(--bg-subtle)' }}>
                  <Bell size={18} style={{ color: 'var(--text-secondary)' }} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: 'var(--danger)' }} />
                </button>

                {/* Profile */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg transition-colors"
                    style={{ background: profileOpen ? 'var(--bg-subtle)' : 'transparent' }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'var(--primary)' }}>
                      JD
                    </div>
                    <span className="text-sm font-medium hidden md:block" style={{ color: 'var(--text-primary)' }}>John Doe</span>
                    <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border py-1 shadow-lg z-50" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
                      <button className="w-full text-left px-4 py-2 text-sm hover:opacity-80" style={{ color: 'var(--text-primary)' }} onClick={() => setProfileOpen(false)}>Profile</button>
                      <button className="w-full text-left px-4 py-2 text-sm hover:opacity-80" style={{ color: 'var(--text-primary)' }} onClick={() => setProfileOpen(false)}>Settings</button>
                      <div className="border-t my-1" style={{ borderColor: 'var(--border-default)' }} />
                      <button className="w-full text-left px-4 py-2 text-sm hover:opacity-80" style={{ color: 'var(--danger)' }} onClick={() => setProfileOpen(false)}>Logout</button>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
