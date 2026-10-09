import { useState, useRef, useEffect } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  RadialBarChart, RadialBar, Legend
} from 'recharts';
import {
  Search, Check, X, AlertCircle, Info, CheckCircle2, AlertTriangle, Copy, Download,
  Eye, EyeOff, ChevronDown, ChevronRight, Plus, Minus, Edit, Trash2, Filter,
  ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal, Moon, Sun, Bell, User,
  Mail, Lock, Calendar, Clock, Upload, File, Star, Heart, Share2, Bookmark,
  Home, Settings, LogOut, Menu, Grid3X3, List, Palette, Type, Box, MousePointer,
  ToggleLeft, ToggleRight, Sliders, Hash, AtSign, CreditCard, Phone, Globe
} from 'lucide-react';
import { tableMockData, notificationExamples } from '../lib/mock-data';
import { useTheme, useNotifications, formatCurrency, formatNumber, formatPercent, cn } from '../lib/hooks';

const categories = [
  { id: 'foundations', label: 'Design Foundations', icon: Palette },
  { id: 'buttons', label: 'Buttons & Actions', icon: MousePointer },
  { id: 'cards', label: 'Cards', icon: Box },
  { id: 'kpi', label: 'KPI & Metrics', icon: Grid3X3 },
  { id: 'tables', label: 'Tables & Data', icon: List },
  { id: 'charts', label: 'Charts', icon: Grid3X3 },
  { id: 'forms', label: 'Forms & Inputs', icon: Edit },
  { id: 'validation', label: 'Form Validation', icon: CheckCircle2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'overlays', label: 'Overlays', icon: Eye },
  { id: 'navigation', label: 'Navigation', icon: Menu },
  { id: 'status', label: 'Status & Feedback', icon: AlertCircle },
  { id: 'layout', label: 'Layout & Content', icon: Grid3X3 },
  { id: 'advanced', label: 'Advanced Patterns', icon: Sliders },
  { id: 'accessibility', label: 'Accessibility', icon: ToggleLeft },
];

export function Components() {
  const [activeCategory, setActiveCategory] = useState('foundations');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(c =>
    c.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex gap-6">
      {/* Category Navigation */}
      <aside className="hidden lg:block w-56 flex-shrink-0">
        <div className="sticky top-20">
          <div className="relative mb-3">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text" placeholder="Search components..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-lg text-xs border outline-none"
              style={{ background: 'var(--bg-subtle)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}
            />
          </div>
          <nav className="space-y-0.5">
            {filteredCategories.map(cat => {
              const Icon = cat.icon;
              return (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left"
                  style={{
                    background: activeCategory === cat.id ? 'var(--primary-light)' : 'transparent',
                    color: activeCategory === cat.id ? 'var(--primary)' : 'var(--text-secondary)',
                  }}>
                  <Icon size={14} />
                  {cat.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-8">
        {/* Mobile category selector */}
        <div className="lg:hidden">
          <select value={activeCategory} onChange={e => setActiveCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}>
            {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>

        {activeCategory === 'foundations' && <FoundationsSection />}
        {activeCategory === 'buttons' && <ButtonsSection />}
        {activeCategory === 'cards' && <CardsSection />}
        {activeCategory === 'kpi' && <KPISection />}
        {activeCategory === 'tables' && <TablesSection />}
        {activeCategory === 'charts' && <ChartsSection />}
        {activeCategory === 'forms' && <FormsSection />}
        {activeCategory === 'validation' && <ValidationSection />}
        {activeCategory === 'notifications' && <NotificationsSection />}
        {activeCategory === 'overlays' && <OverlaysSection />}
        {activeCategory === 'navigation' && <NavigationSection />}
        {activeCategory === 'status' && <StatusSection />}
        {activeCategory === 'layout' && <LayoutSection />}
        {activeCategory === 'advanced' && <AdvancedSection />}
        {activeCategory === 'accessibility' && <AccessibilitySection />}
      </div>
    </div>
  );
}

// Section wrapper
function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border p-5" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
      <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      {description && <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>{description}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

// ==================== FOUNDATIONS ====================
function FoundationsSection() {
  const [copiedColor, setCopiedColor] = useState('');
  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(''), 2000);
  };

  const brandColors = [
    { name: 'Primary', hex: '#774AA4', token: '--primary' },
    { name: 'Primary Hover', hex: '#684092', token: '--primary-hover' },
    { name: 'Primary Light', hex: '#F2EAF8', token: '--primary-light' },
    { name: 'Primary Track', hex: '#E5DEEC', token: '--primary-track' },
  ];

  const semanticColors = [
    { name: 'Success', hex: '#22922F', soft: '#E7F7E9' },
    { name: 'Danger', hex: '#C64C64', soft: '#FCEAF0' },
    { name: 'Warning', hex: '#D59B14', soft: '#FFF7DD' },
    { name: 'Info', hex: '#4478BE', soft: '#EAF2FF' },
  ];

  const textColors = [
    { name: 'Text Primary', hex: '#35234C' },
    { name: 'Text Secondary', hex: '#77717F' },
    { name: 'Text Muted', hex: '#A8A7AA' },
  ];

  return (
    <div className="space-y-6">
      <Section title="Brand Colors" description="Click to copy hex value">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {brandColors.map(c => (
            <button key={c.hex} onClick={() => copyColor(c.hex)} className="group text-left">
              <div className="h-16 rounded-lg mb-2 transition-transform group-hover:scale-105" style={{ background: c.hex }} />
              <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{c.name}</p>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{copiedColor === c.hex ? '✓ Copied!' : c.hex}</p>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Semantic Colors" description="Status and feedback colors">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {semanticColors.map(c => (
            <div key={c.name}>
              <div className="flex gap-1 mb-2">
                <div className="h-12 flex-1 rounded-lg" style={{ background: c.hex }} />
                <div className="h-12 flex-1 rounded-lg border" style={{ background: c.soft, borderColor: 'var(--border-default)' }} />
              </div>
              <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{c.name}</p>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{c.hex}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Text Colors">
        <div className="grid grid-cols-3 gap-3">
          {textColors.map(c => (
            <div key={c.name} className="p-3 rounded-lg border" style={{ borderColor: 'var(--border-default)' }}>
              <div className="w-full h-8 rounded mb-2" style={{ background: c.hex }} />
              <p className="text-xs font-medium" style={{ color: c.hex }}>{c.name}</p>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{c.hex}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography Scale" description="Nunito Sans font family with various weights and sizes">
        <div className="space-y-3">
          {[
            { label: 'Display', size: '2rem', weight: 800 },
            { label: 'H1', size: '1.5rem', weight: 700 },
            { label: 'H2', size: '1.25rem', weight: 700 },
            { label: 'H3', size: '1.125rem', weight: 600 },
            { label: 'Body', size: '0.875rem', weight: 400 },
            { label: 'Small', size: '0.75rem', weight: 400 },
            { label: 'Caption', size: '0.6875rem', weight: 500 },
          ].map(t => (
            <div key={t.label} className="flex items-baseline gap-4 py-1 border-b" style={{ borderColor: 'var(--border-default)' }}>
              <span className="text-[10px] w-16 flex-shrink-0 font-mono" style={{ color: 'var(--text-muted)' }}>{t.label}</span>
              <span style={{ fontSize: t.size, fontWeight: t.weight, color: 'var(--text-primary)' }}>
                The quick brown fox jumps over the lazy dog
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Spacing Scale" description="4px-based spacing system">
        <div className="flex flex-wrap gap-3 items-end">
          {[4, 8, 12, 16, 20, 24, 32, 40, 48, 64].map(s => (
            <div key={s} className="text-center">
              <div className="rounded" style={{ width: s, height: s, background: 'var(--primary-light)', border: '1px solid var(--primary)' }} />
              <span className="text-[10px] mt-1 block" style={{ color: 'var(--text-muted)' }}>{s}px</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Border Radius">
        <div className="flex flex-wrap gap-4 items-end">
          {[
            { label: 'sm', value: '6px' },
            { label: 'md', value: '10px' },
            { label: 'lg', value: '16px' },
            { label: 'xl', value: '20px' },
            { label: 'full', value: '9999px' },
          ].map(r => (
            <div key={r.label} className="text-center">
              <div className="w-14 h-14 border-2" style={{ borderRadius: r.value, borderColor: 'var(--primary)', background: 'var(--primary-light)' }} />
              <span className="text-[10px] mt-1 block" style={{ color: 'var(--text-muted)' }}>{r.label} ({r.value})</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shadows & Elevation">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'None', shadow: 'none' },
            { label: 'Small', shadow: '0 1px 3px rgba(53,35,76,0.04)' },
            { label: 'Medium', shadow: '0 4px 12px rgba(53,35,76,0.06)' },
            { label: 'Large', shadow: '0 8px 24px rgba(53,35,76,0.08)' },
          ].map(s => (
            <div key={s.label} className="h-20 rounded-lg flex items-center justify-center border" style={{ boxShadow: s.shadow, background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ==================== BUTTONS ====================
function ButtonsSection() {
  const [loading, setLoading] = useState(false);
  const simulateLoading = () => { setLoading(true); setTimeout(() => setLoading(false), 2000); };

  return (
    <div className="space-y-6">
      <Section title="Button Variants" description="Available button styles and variants">
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors" style={{ background: 'var(--primary)' }}>Primary</button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors" style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)', background: 'var(--bg-surface)' }}>Secondary</button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>Outline</button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ color: 'var(--primary)' }}>Ghost</button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors" style={{ background: 'var(--danger)' }}>Destructive</button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors" style={{ background: 'var(--success)' }}>Success</button>
        </div>
      </Section>

      <Section title="Button Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-2.5 py-1 rounded text-xs font-medium text-white" style={{ background: 'var(--primary)' }}>Extra Small</button>
          <button className="px-3 py-1.5 rounded-md text-xs font-medium text-white" style={{ background: 'var(--primary)' }}>Small</button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: 'var(--primary)' }}>Medium</button>
          <button className="px-5 py-2.5 rounded-lg text-base font-medium text-white" style={{ background: 'var(--primary)' }}>Large</button>
        </div>
      </Section>

      <Section title="Button States">
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: 'var(--primary)' }}>Default</button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-white opacity-70 cursor-not-allowed" style={{ background: 'var(--primary)' }}>Disabled</button>
          <button onClick={simulateLoading} className="px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-2" style={{ background: 'var(--primary)' }}>
            {loading && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {loading ? 'Loading...' : 'Click to Load'}
          </button>
          <button className="p-2 rounded-lg border transition-colors" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)' }}>
            <Plus size={16} style={{ color: 'var(--text-primary)' }} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: 'var(--primary)' }}>
            <Download size={14} /> Download
          </button>
        </div>
      </Section>

      <Section title="Button Groups">
        <div className="flex rounded-lg overflow-hidden border w-fit" style={{ borderColor: 'var(--border-default)' }}>
          <button className="px-3 py-2 text-xs font-medium text-white" style={{ background: 'var(--primary)' }}>Left</button>
          <button className="px-3 py-2 text-xs font-medium border-l" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}>Center</button>
          <button className="px-3 py-2 text-xs font-medium border-l" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}>Right</button>
        </div>
      </Section>
    </div>
  );
}

// ==================== CARDS ====================
function CardsSection() {
  return (
    <div className="space-y-6">
      <Section title="Card Variants" description="Different card styles for various content types">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Basic Card */}
          <div className="rounded-xl border p-4" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
            <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Basic Card</h4>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>A simple card with border and padding.</p>
          </div>

          {/* KPI Card */}
          <div className="rounded-xl border p-4" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--primary-light)' }}>
                <Star size={14} style={{ color: 'var(--primary)' }} />
              </div>
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Revenue</span>
            </div>
            <p className="text-xl font-bold" style={{ color: 'var(--primary)' }}>$24,500</p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--success)' }}>+12.5% from last month</p>
          </div>

          {/* Profile Card */}
          <div className="rounded-xl border p-4 text-center" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
            <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold" style={{ background: 'var(--primary)' }}>JD</div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>John Doe</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Senior Developer</p>
            <div className="flex gap-2 mt-3 justify-center">
              <button className="px-3 py-1 rounded text-xs font-medium text-white" style={{ background: 'var(--primary)' }}>Follow</button>
              <button className="px-3 py-1 rounded text-xs font-medium border" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>Message</button>
            </div>
          </div>

          {/* Loading Card */}
          <div className="rounded-xl border p-4" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
            <div className="animate-pulse space-y-3">
              <div className="h-4 rounded w-3/4" style={{ background: 'var(--bg-subtle)' }} />
              <div className="h-3 rounded w-full" style={{ background: 'var(--bg-subtle)' }} />
              <div className="h-3 rounded w-5/6" style={{ background: 'var(--bg-subtle)' }} />
              <div className="h-20 rounded" style={{ background: 'var(--bg-subtle)' }} />
            </div>
          </div>

          {/* Empty State Card */}
          <div className="rounded-xl border p-6 text-center" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: 'var(--bg-subtle)' }}>
              <File size={20} style={{ color: 'var(--text-muted)' }} />
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>No data yet</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Start by adding your first item</p>
          </div>

          {/* Error State Card */}
          <div className="rounded-xl border p-4" style={{ background: 'var(--danger-soft)', borderColor: 'var(--danger)' }}>
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle size={14} style={{ color: 'var(--danger)' }} />
              <p className="text-sm font-semibold" style={{ color: 'var(--danger)' }}>Error</p>
            </div>
            <p className="text-xs" style={{ color: 'var(--danger)' }}>Failed to load data. Please try again.</p>
            <button className="mt-2 px-3 py-1 rounded text-xs font-medium text-white" style={{ background: 'var(--danger)' }}>Retry</button>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ==================== KPI ====================
function KPISection() {
  const sparkData = [12, 19, 15, 25, 22, 30, 28, 35, 32, 40];
  return (
    <div className="space-y-6">
      <Section title="KPI Components" description="Metric displays with trends and sparklines">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border p-4" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Total Revenue</p>
            <p className="text-xl font-bold" style={{ color: 'var(--primary)' }}>$48,250</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUp size={12} style={{ color: 'var(--success)' }} />
              <span className="text-[11px] font-medium" style={{ color: 'var(--success)' }}>+12.5%</span>
            </div>
          </div>

          <div className="rounded-xl border p-4" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Active Users</p>
            <p className="text-xl font-bold" style={{ color: 'var(--primary)' }}>2,847</p>
            <div className="h-8 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkData.map((v, i) => ({ v, i }))}>
                  <Area type="monotone" dataKey="v" stroke="var(--primary)" fill="var(--primary-light)" strokeWidth={1.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border p-4" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Conversion Rate</p>
            <p className="text-xl font-bold" style={{ color: 'var(--primary)' }}>3.24%</p>
            <div className="w-full h-2 rounded-full mt-2" style={{ background: 'var(--bg-subtle)' }}>
              <div className="h-full rounded-full" style={{ width: '65%', background: 'var(--primary)' }} />
            </div>
            <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>Target: 5%</p>
          </div>

          <div className="rounded-xl border p-4" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Avg. Order Value</p>
            <p className="text-xl font-bold" style={{ color: 'var(--primary)' }}>$127</p>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded mt-1" style={{ color: 'var(--danger)', background: 'var(--danger-soft)' }}>
              <ArrowDown size={10} /> -2.1%
            </span>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ==================== TABLES ====================
function TablesSection() {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const pageSize = 5;

  const filtered = tableMockData.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => {
    const aVal = (a as any)[sortField];
    const bVal = (b as any)[sortField];
    return sortDir === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
  });
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(sorted.length / pageSize);

  const toggleSelect = (id: number) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleAll = () => setSelected(prev => prev.length === paged.length ? [] : paged.map(r => r.id));

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Role', 'Status', 'Joined', 'Revenue'];
    const rows = sorted.map(r => [r.name, r.email, r.role, r.status, r.joined, r.revenue]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'users.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Section title="Interactive Data Table" description="Sortable, searchable, paginated, selectable table with CSV export">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search users..." value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}
              className="w-full pl-8 pr-3 py-2 rounded-lg text-xs border outline-none"
              style={{ background: 'var(--bg-subtle)', borderColor: 'var(--border-default)', color: 'var(--text-primary)' }} />
          </div>
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
            <Download size={12} /> Export CSV
          </button>
          {selected.length > 0 && (
            <span className="text-xs" style={{ color: 'var(--primary)' }}>{selected.length} selected</span>
          )}
        </div>
        <div className="overflow-x-auto border rounded-lg" style={{ borderColor: 'var(--border-default)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'var(--bg-subtle)' }}>
                <th className="px-3 py-2.5 w-8">
                  <input type="checkbox" checked={selected.length === paged.length && paged.length > 0} onChange={toggleAll} className="rounded" />
                </th>
                {['name', 'email', 'role', 'status', 'joined', 'revenue'].map(h => (
                  <th key={h} className="text-left px-3 py-2.5 font-semibold cursor-pointer hover:opacity-70 capitalize" style={{ color: 'var(--text-secondary)' }}
                    onClick={() => { if (sortField === h) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortField(h); setSortDir('asc'); } }}>
                    <span className="flex items-center gap-1">{h} {sortField === h && (sortDir === 'asc' ? <ArrowUp size={10} /> : <ArrowDown size={10} />)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map(row => (
                <tr key={row.id} className="border-t transition-colors" style={{ borderColor: 'var(--border-default)', background: selected.includes(row.id) ? 'var(--primary-light)' : 'transparent' }}>
                  <td className="px-3 py-2.5"><input type="checkbox" checked={selected.includes(row.id)} onChange={() => toggleSelect(row.id)} className="rounded" /></td>
                  <td className="px-3 py-2.5 font-medium" style={{ color: 'var(--text-primary)' }}>{row.name}</td>
                  <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.email}</td>
                  <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.role}</td>
                  <td className="px-3 py-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{ background: row.status === 'active' ? 'var(--success-soft)' : row.status === 'pending' ? 'var(--warning-soft)' : 'var(--danger-soft)', color: row.status === 'active' ? 'var(--success)' : row.status === 'pending' ? 'var(--warning)' : 'var(--danger)' }}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.joined}</td>
                  <td className="px-3 py-2.5 font-medium" style={{ color: 'var(--text-primary)' }}>{row.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Showing {page * pageSize + 1}-{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}</span>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i)} className="w-7 h-7 rounded text-xs font-medium"
                style={{ background: page === i ? 'var(--primary)' : 'var(--bg-subtle)', color: page === i ? 'white' : 'var(--text-secondary)' }}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

// ==================== CHARTS ====================
function ChartsSection() {
  const lineData = Array.from({ length: 12 }, (_, i) => ({ name: `W${i + 1}`, value: Math.floor(Math.random() * 50 + 30), prev: Math.floor(Math.random() * 40 + 20) }));
  const barData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => ({ name: d, value: Math.floor(Math.random() * 80 + 20) }));
  const pieData = [{ name: 'A', value: 40 }, { name: 'B', value: 30 }, { name: 'C', value: 20 }, { name: 'D', value: 10 }];
  const scatterData = Array.from({ length: 20 }, () => ({ x: Math.random() * 100, y: Math.random() * 100 }));

  return (
    <div className="space-y-6">
      <Section title="Line Chart" description="Smooth line with area fill">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineData}>
              <defs><linearGradient id="cgl" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} /><stop offset="95%" stopColor="var(--primary)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: '11px' }} />
              <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2} fill="url(#cgl)" />
              <Area type="monotone" dataKey="prev" stroke="var(--primary-track)" strokeWidth={1.5} fill="none" strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Bar Chart">
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Pie Chart">
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" stroke="none">
                  {pieData.map((_, i) => <Cell key={i} fill={['var(--primary)', '#5B2D8E', 'var(--primary-track)', 'var(--primary-light)'][i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: '11px' }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Scatter Plot">
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
                <XAxis type="number" dataKey="x" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <YAxis type="number" dataKey="y" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: '11px' }} />
                <Scatter data={scatterData} fill="var(--primary)" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Progress Bars">
          <div className="space-y-4">
            {[
              { label: 'Project Alpha', value: 75, color: 'var(--primary)' },
              { label: 'Project Beta', value: 45, color: 'var(--success)' },
              { label: 'Project Gamma', value: 90, color: 'var(--warning)' },
              { label: 'Project Delta', value: 30, color: 'var(--danger)' },
            ].map(p => (
              <div key={p.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{p.label}</span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{p.value}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: 'var(--bg-subtle)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${p.value}%`, background: p.color }} />
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

// ==================== FORMS ====================
function FormsSection() {
  const [showPass, setShowPass] = useState(false);
  const [toggleVal, setToggleVal] = useState(true);
  const [sliderVal, setSliderVal] = useState(60);
  const [selectVal, setSelectVal] = useState('');
  const [checkVals, setCheckVals] = useState<string[]>(['option1']);
  const [radioVal, setRadioVal] = useState('option1');

  return (
    <div className="space-y-6">
      <Section title="Text Inputs" description="Various input types and states">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>Text Input</label>
            <input type="text" placeholder="Enter text..." className="w-full px-3 py-2 rounded-lg text-sm border outline-none focus:border-[var(--primary)]" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>Email Input</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input type="email" placeholder="email@example.com" className="w-full pl-9 pr-3 py-2 rounded-lg text-sm border outline-none focus:border-[var(--primary)]" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input type={showPass ? 'text' : 'password'} placeholder="••••••••" className="w-full pl-9 pr-9 py-2 rounded-lg text-sm border outline-none focus:border-[var(--primary)]" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
              <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2">
                {showPass ? <EyeOff size={14} style={{ color: 'var(--text-muted)' }} /> : <Eye size={14} style={{ color: 'var(--text-muted)' }} />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>Search</label>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input type="search" placeholder="Search..." className="w-full pl-9 pr-3 py-2 rounded-lg text-sm border outline-none focus:border-[var(--primary)]" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>Disabled</label>
            <input type="text" disabled placeholder="Disabled input" className="w-full px-3 py-2 rounded-lg text-sm border outline-none opacity-50 cursor-not-allowed" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-muted)' }} />
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>With Error</label>
            <input type="text" defaultValue="Invalid value" className="w-full px-3 py-2 rounded-lg text-sm border outline-none" style={{ borderColor: 'var(--danger)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
            <p className="text-[11px] mt-1" style={{ color: 'var(--danger)' }}>This field is required</p>
          </div>
        </div>
      </Section>

      <Section title="Select & Textarea">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>Select</label>
            <select value={selectVal} onChange={e => setSelectVal(e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm border outline-none" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
              <option value="">Choose an option...</option>
              <option value="1">Option 1</option><option value="2">Option 2</option><option value="3">Option 3</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>Textarea</label>
            <textarea rows={3} placeholder="Enter description..." className="w-full px-3 py-2 rounded-lg text-sm border outline-none resize-none focus:border-[var(--primary)]" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
          </div>
        </div>
      </Section>

      <Section title="Toggle, Checkbox & Radio">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-primary)' }}>Toggle Switch</label>
            <button onClick={() => setToggleVal(!toggleVal)} className="w-10 h-5 rounded-full relative transition-colors" style={{ background: toggleVal ? 'var(--primary)' : 'var(--border-default)' }}>
              <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform" style={{ left: toggleVal ? '22px' : '2px' }} />
            </button>
          </div>
          <div>
            <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-primary)' }}>Checkboxes</label>
            {['option1', 'option2', 'option3'].map(opt => (
              <label key={opt} className="flex items-center gap-2 mb-1.5 cursor-pointer">
                <input type="checkbox" checked={checkVals.includes(opt)} onChange={() => setCheckVals(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} className="rounded" />
                <span className="text-xs capitalize" style={{ color: 'var(--text-primary)' }}>{opt}</span>
              </label>
            ))}
          </div>
          <div>
            <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-primary)' }}>Radio Group</label>
            {['option1', 'option2', 'option3'].map(opt => (
              <label key={opt} className="flex items-center gap-2 mb-1.5 cursor-pointer">
                <input type="radio" name="demo-radio" value={opt} checked={radioVal === opt} onChange={() => setRadioVal(opt)} />
                <span className="text-xs capitalize" style={{ color: 'var(--text-primary)' }}>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Slider & Range">
        <div>
          <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--text-primary)' }}>Value: {sliderVal}</label>
          <input type="range" min={0} max={100} value={sliderVal} onChange={e => setSliderVal(Number(e.target.value))} className="w-full accent-[var(--primary)]" />
        </div>
      </Section>
    </div>
  );
}

// ==================== VALIDATION ====================
function ValidationSection() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    else if (form.name.length < 2) errs.name = 'Name must be at least 2 characters';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <Section title="Form Validation" description="Registration form with Zod-style validation">
        <div className="text-center py-8">
          <CheckCircle2 size={40} className="mx-auto mb-3" style={{ color: 'var(--success)' }} />
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Form submitted successfully!</p>
          <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>All validations passed.</p>
          <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', password: '', confirm: '' }); }} className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: 'var(--primary)' }}>Reset Form</button>
        </div>
      </Section>
    );
  }

  return (
    <Section title="Form Validation" description="Complete registration form with inline validation">
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>Full Name *</label>
          <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none" style={{ borderColor: errors.name ? 'var(--danger)' : 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} placeholder="John Doe" />
          {errors.name && <p className="text-[11px] mt-1" style={{ color: 'var(--danger)' }}>{errors.name}</p>}
        </div>
        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>Email *</label>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none" style={{ borderColor: errors.email ? 'var(--danger)' : 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} placeholder="john@example.com" />
          {errors.email && <p className="text-[11px] mt-1" style={{ color: 'var(--danger)' }}>{errors.email}</p>}
        </div>
        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>Password *</label>
          <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none" style={{ borderColor: errors.password ? 'var(--danger)' : 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} placeholder="Min 8 characters" />
          {errors.password && <p className="text-[11px] mt-1" style={{ color: 'var(--danger)' }}>{errors.password}</p>}
        </div>
        <div>
          <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>Confirm Password *</label>
          <input type="password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-sm border outline-none" style={{ borderColor: errors.confirm ? 'var(--danger)' : 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} placeholder="Repeat password" />
          {errors.confirm && <p className="text-[11px] mt-1" style={{ color: 'var(--danger)' }}>{errors.confirm}</p>}
        </div>
        <button type="submit" className="px-5 py-2.5 rounded-lg text-sm font-medium text-white" style={{ background: 'var(--primary)' }}>Submit Registration</button>
      </form>
    </Section>
  );
}

// ==================== NOTIFICATIONS ====================
function NotificationsSection() {
  const { addNotification } = useNotifications();

  return (
    <div className="space-y-6">
      <Section title="Toast Notifications" description="Click buttons to trigger notifications">
        <div className="flex flex-wrap gap-3 mb-4">
          <button onClick={() => addNotification({ type: 'success', title: 'Success', message: 'Operation completed.' })} className="px-3 py-2 rounded-lg text-xs font-medium text-white" style={{ background: 'var(--success)' }}>Success Toast</button>
          <button onClick={() => addNotification({ type: 'error', title: 'Error', message: 'Something went wrong.' })} className="px-3 py-2 rounded-lg text-xs font-medium text-white" style={{ background: 'var(--danger)' }}>Error Toast</button>
          <button onClick={() => addNotification({ type: 'warning', title: 'Warning', message: 'Please review your input.' })} className="px-3 py-2 rounded-lg text-xs font-medium text-white" style={{ background: 'var(--warning)' }}>Warning Toast</button>
          <button onClick={() => addNotification({ type: 'info', title: 'Info', message: 'New update available.' })} className="px-3 py-2 rounded-lg text-xs font-medium text-white" style={{ background: 'var(--info)' }}>Info Toast</button>
        </div>
      </Section>

      <Section title="Inline Alerts" description="Static alert banners">
        <div className="space-y-3">
          {notificationExamples.map(n => (
            <div key={n.type} className="flex items-start gap-3 p-3 rounded-lg border" style={{
              background: n.type === 'success' ? 'var(--success-soft)' : n.type === 'error' ? 'var(--danger-soft)' : n.type === 'warning' ? 'var(--warning-soft)' : 'var(--info-soft)',
              borderColor: n.type === 'success' ? 'var(--success)' : n.type === 'error' ? 'var(--danger)' : n.type === 'warning' ? 'var(--warning)' : 'var(--info)',
            }}>
              {n.type === 'success' && <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />}
              {n.type === 'error' && <AlertCircle size={16} style={{ color: 'var(--danger)' }} />}
              {n.type === 'warning' && <AlertTriangle size={16} style={{ color: 'var(--warning)' }} />}
              {n.type === 'info' && <Info size={16} style={{ color: 'var(--info)' }} />}
              <div>
                <p className="text-xs font-semibold" style={{ color: n.type === 'success' ? 'var(--success)' : n.type === 'error' ? 'var(--danger)' : n.type === 'warning' ? 'var(--warning)' : 'var(--info)' }}>{n.title}</p>
                <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ==================== OVERLAYS ====================
function OverlaysSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div className="space-y-6">
      <Section title="Modal Dialog" description="Centered modal overlay">
        <button onClick={() => setModalOpen(true)} className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: 'var(--primary)' }}>Open Modal</button>
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setModalOpen(false)} />
            <div className="relative w-full max-w-md rounded-xl p-6 shadow-xl" style={{ background: 'var(--bg-surface)' }}>
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4"><X size={16} style={{ color: 'var(--text-muted)' }} /></button>
              <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Modal Title</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>This is a modal dialog. Press Escape or click outside to close.</p>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>Cancel</button>
                <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: 'var(--primary)' }}>Confirm</button>
              </div>
            </div>
          </div>
        )}
      </Section>

      <Section title="Confirmation Dialog" description="Destructive action confirmation">
        <button onClick={() => setConfirmOpen(true)} className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: 'var(--danger)' }}>Delete Item</button>
        {confirmOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setConfirmOpen(false)} />
            <div className="relative w-full max-w-sm rounded-xl p-6 shadow-xl text-center" style={{ background: 'var(--bg-surface)' }}>
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: 'var(--danger-soft)' }}>
                <AlertTriangle size={20} style={{ color: 'var(--danger)' }} />
              </div>
              <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Delete this item?</h3>
              <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>This action cannot be undone.</p>
              <div className="flex gap-2">
                <button onClick={() => setConfirmOpen(false)} className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>Cancel</button>
                <button onClick={() => setConfirmOpen(false)} className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: 'var(--danger)' }}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </Section>

      <Section title="Drawer" description="Side panel overlay">
        <button onClick={() => setDrawerOpen(true)} className="px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: 'var(--primary)' }}>Open Drawer</button>
        {drawerOpen && (
          <div className="fixed inset-0 z-[100]">
            <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full p-6 shadow-xl overflow-y-auto" style={{ background: 'var(--bg-surface)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Drawer Panel</h3>
                <button onClick={() => setDrawerOpen(false)}><X size={18} style={{ color: 'var(--text-muted)' }} /></button>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>This is a slide-out drawer panel. It can contain forms, details, or navigation.</p>
            </div>
          </div>
        )}
      </Section>

      <Section title="Tooltip" description="Hover to reveal tooltip">
        <div className="relative inline-block">
          <button onMouseEnter={() => setTooltipVisible(true)} onMouseLeave={() => setTooltipVisible(false)} className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}>Hover me</button>
          {tooltipVisible && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg text-xs text-white whitespace-nowrap" style={{ background: 'var(--text-primary)' }}>
              This is a tooltip
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" style={{ background: 'var(--text-primary)' }} />
            </div>
          )}
        </div>
      </Section>

      <Section title="Dropdown Menu">
        <DropdownMenu />
      </Section>
    </div>
  );
}

function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm border" style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)', background: 'var(--bg-surface)' }}>
        Options <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-44 rounded-lg border py-1 shadow-lg z-50" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
          {[{ icon: Edit, label: 'Edit' }, { icon: Copy, label: 'Duplicate' }, { icon: Share2, label: 'Share' }, { icon: Bookmark, label: 'Bookmark' }].map(item => (
            <button key={item.label} onClick={() => setOpen(false)} className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:opacity-80" style={{ color: 'var(--text-primary)' }}>
              <item.icon size={14} style={{ color: 'var(--text-muted)' }} /> {item.label}
            </button>
          ))}
          <div className="border-t my-1" style={{ borderColor: 'var(--border-default)' }} />
          <button onClick={() => setOpen(false)} className="w-full flex items-center gap-2 px-3 py-2 text-xs" style={{ color: 'var(--danger)' }}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ==================== NAVIGATION ====================
function NavigationSection() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [accordionOpen, setAccordionOpen] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-6">
      <Section title="Breadcrumbs">
        <nav className="flex items-center gap-1.5 text-xs">
          <span className="cursor-pointer hover:underline" style={{ color: 'var(--primary)' }}>Home</span>
          <ChevronRight size={12} style={{ color: 'var(--text-muted)' }} />
          <span className="cursor-pointer hover:underline" style={{ color: 'var(--primary)' }}>Products</span>
          <ChevronRight size={12} style={{ color: 'var(--text-muted)' }} />
          <span style={{ color: 'var(--text-primary)' }}>Dashboard</span>
        </nav>
      </Section>

      <Section title="Tabs">
        <div className="border-b mb-4" style={{ borderColor: 'var(--border-default)' }}>
          <div className="flex gap-0">
            {['Overview', 'Analytics', 'Reports', 'Settings'].map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(`tab${i}`)}
                className="px-4 py-2.5 text-xs font-medium border-b-2 transition-colors"
                style={{ borderColor: activeTab === `tab${i}` ? 'var(--primary)' : 'transparent', color: activeTab === `tab${i}` ? 'var(--primary)' : 'var(--text-muted)' }}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Content for {['Overview', 'Analytics', 'Reports', 'Settings'][['tab0', 'tab1', 'tab2', 'tab3'].indexOf(activeTab)]} tab</p>
      </Section>

      <Section title="Accordion">
        <div className="space-y-2">
          {['Getting Started', 'Configuration', 'API Reference', 'Troubleshooting'].map((item, i) => (
            <div key={item} className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border-default)' }}>
              <button onClick={() => setAccordionOpen(accordionOpen === i ? -1 : i)} className="w-full flex items-center justify-between px-4 py-3 text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                {item}
                <ChevronDown size={14} className={`transition-transform ${accordionOpen === i ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
              </button>
              {accordionOpen === i && (
                <div className="px-4 pb-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Content for {item}. This section provides detailed information about the topic.
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Stepper">
        <div className="flex items-center gap-2">
          {['Details', 'Payment', 'Review', 'Complete'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: step > i + 1 ? 'var(--success)' : step === i + 1 ? 'var(--primary)' : 'var(--bg-subtle)', color: step >= i + 1 ? 'white' : 'var(--text-muted)' }}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className="text-xs font-medium hidden sm:block" style={{ color: step >= i + 1 ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s}</span>
              </div>
              {i < 3 && <div className="w-8 h-0.5" style={{ background: step > i + 1 ? 'var(--success)' : 'var(--border-default)' }} />}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={() => setStep(Math.max(1, step - 1))} className="px-3 py-1.5 rounded text-xs border" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>Previous</button>
          <button onClick={() => setStep(Math.min(4, step + 1))} className="px-3 py-1.5 rounded text-xs text-white" style={{ background: 'var(--primary)' }}>Next</button>
        </div>
      </Section>

      <Section title="Pagination">
        <div className="flex items-center gap-1">
          <button className="px-2.5 py-1.5 rounded text-xs border" style={{ borderColor: 'var(--border-default)', color: 'var(--text-muted)' }}>← Prev</button>
          {[1, 2, 3, 4, 5].map(p => (
            <button key={p} className="w-8 h-8 rounded text-xs font-medium" style={{ background: p === 3 ? 'var(--primary)' : 'transparent', color: p === 3 ? 'white' : 'var(--text-secondary)' }}>{p}</button>
          ))}
          <button className="px-2.5 py-1.5 rounded text-xs border" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>Next →</button>
        </div>
      </Section>
    </div>
  );
}

// ==================== STATUS ====================
function StatusSection() {
  return (
    <div className="space-y-6">
      <Section title="Status Badges">
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Active', bg: 'var(--success-soft)', color: 'var(--success)' },
            { label: 'Pending', bg: 'var(--warning-soft)', color: 'var(--warning)' },
            { label: 'Inactive', bg: 'var(--danger-soft)', color: 'var(--danger)' },
            { label: 'Info', bg: 'var(--info-soft)', color: 'var(--info)' },
            { label: 'Default', bg: 'var(--bg-subtle)', color: 'var(--text-secondary)' },
          ].map(b => (
            <span key={b.label} className="px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: b.bg, color: b.color }}>{b.label}</span>
          ))}
        </div>
      </Section>

      <Section title="Tags">
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Tailwind', 'Vite', 'Node.js', 'PostgreSQL'].map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded-md text-[11px] font-medium border" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}>{tag}</span>
          ))}
        </div>
      </Section>

      <Section title="Avatars">
        <div className="flex items-center gap-3">
          {['JD', 'AB', 'CK', 'LM', 'NP'].map((initials, i) => (
            <div key={initials} className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: ['var(--primary)', '#5B2D8E', 'var(--success)', 'var(--warning)', 'var(--info)'][i] }}>{initials}</div>
          ))}
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium border-2 border-dashed" style={{ borderColor: 'var(--border-default)', color: 'var(--text-muted)' }}>+5</div>
        </div>
      </Section>

      <Section title="Progress Indicators">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1"><span className="text-xs" style={{ color: 'var(--text-primary)' }}>Linear Progress</span><span className="text-xs" style={{ color: 'var(--text-muted)' }}>75%</span></div>
            <div className="h-2 rounded-full" style={{ background: 'var(--bg-subtle)' }}><div className="h-full rounded-full w-3/4" style={{ background: 'var(--primary)' }} /></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--bg-subtle)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--primary)" strokeWidth="3" strokeDasharray="70 100" strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: 'var(--primary)' }}>70%</span>
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--bg-subtle)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--success)" strokeWidth="3" strokeDasharray="90 100" strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: 'var(--success)' }}>90%</span>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Skeleton Loading">
        <div className="space-y-3 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full" style={{ background: 'var(--bg-subtle)' }} />
            <div className="flex-1 space-y-2">
              <div className="h-3 rounded w-1/3" style={{ background: 'var(--bg-subtle)' }} />
              <div className="h-2 rounded w-1/2" style={{ background: 'var(--bg-subtle)' }} />
            </div>
          </div>
          <div className="h-4 rounded w-full" style={{ background: 'var(--bg-subtle)' }} />
          <div className="h-4 rounded w-4/5" style={{ background: 'var(--bg-subtle)' }} />
          <div className="h-20 rounded" style={{ background: 'var(--bg-subtle)' }} />
        </div>
      </Section>

      <Section title="Spinners">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
          <div className="w-10 h-10 border-3 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
        </div>
      </Section>
    </div>
  );
}

// ==================== LAYOUT ====================
function LayoutSection() {
  return (
    <div className="space-y-6">
      <Section title="Section Headers">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Page Title</h2>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Description text for the section</p>
          </div>
          <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--border-default)' }}>
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Section with Action</h3>
            <button className="text-xs font-medium" style={{ color: 'var(--primary)' }}>View All</button>
          </div>
        </div>
      </Section>

      <Section title="Definition List">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'Full Name', def: 'John Doe' },
            { term: 'Email', def: 'john@example.com' },
            { term: 'Role', def: 'Administrator' },
            { term: 'Status', def: 'Active' },
            { term: 'Joined', def: 'Jan 15, 2024' },
            { term: 'Last Login', def: '2 hours ago' },
          ].map(item => (
            <div key={item.term} className="py-2 border-b" style={{ borderColor: 'var(--border-default)' }}>
              <dt className="text-[11px] font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>{item.term}</dt>
              <dd className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{item.def}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Timeline">
        <div className="space-y-0">
          {[
            { time: '09:30', title: 'Meeting started', desc: 'Weekly team sync' },
            { time: '10:15', title: 'Code review', desc: 'PR #234 approved' },
            { time: '11:00', title: 'Deployment', desc: 'v2.1.0 released' },
            { time: '14:00', title: 'Client call', desc: 'Project update discussion' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 pb-4">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--primary)' }} />
                {i < 3 && <div className="w-0.5 flex-1 mt-1" style={{ background: 'var(--border-default)' }} />}
              </div>
              <div>
                <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>{item.time}</span>
                <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Grid Layout">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="h-20 rounded-lg border flex items-center justify-center text-xs" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
              Item {i + 1}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ==================== ADVANCED ====================
function AdvancedSection() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1500); };

  return (
    <div className="space-y-6">
      <Section title="Filter Toolbar" description="Combined search, filter and bulk actions">
        <div className="flex flex-wrap items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-subtle)' }}>
          <div className="relative flex-1 min-w-[180px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input type="text" placeholder="Search..." className="w-full pl-8 pr-3 py-2 rounded-lg text-xs border outline-none" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 rounded-lg text-xs border outline-none" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
            <option value="all">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option>
          </select>
          <button onClick={handleRefresh} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
            {refreshing ? <span className="w-3 h-3 border border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--text-secondary)', borderTopColor: 'transparent' }} /> : <Plus size={12} />}
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </Section>

      <Section title="Master/Detail View" description="Select an item to see details">
        <MasterDetail />
      </Section>

      <Section title="Multi-step Form" description="Step-by-step form wizard">
        <MultiStepForm />
      </Section>

      <Section title="Copyable Code Snippet">
        <CodeBlock code={`import { Button } from './components/ui';\n\nfunction App() {\n  return <Button variant="primary">Click me</Button>;\n}`} />
      </Section>
    </div>
  );
}

function MasterDetail() {
  const [selectedId, setSelectedId] = useState(1);
  const selected = tableMockData.find(r => r.id === selectedId)!;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border-default)' }}>
        {tableMockData.slice(0, 5).map(r => (
          <button key={r.id} onClick={() => setSelectedId(r.id)} className="w-full text-left px-4 py-3 border-b text-xs transition-colors"
            style={{ borderColor: 'var(--border-default)', background: selectedId === r.id ? 'var(--primary-light)' : 'transparent', color: 'var(--text-primary)' }}>
            <span className="font-medium">{r.name}</span>
            <span className="block mt-0.5" style={{ color: 'var(--text-muted)' }}>{r.email}</span>
          </button>
        ))}
      </div>
      <div className="border rounded-lg p-4" style={{ borderColor: 'var(--border-default)' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'var(--primary)' }}>
            {selected.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{selected.name}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{selected.email}</p>
          </div>
        </div>
        <dl className="space-y-2">
          <div className="flex justify-between"><dt className="text-xs" style={{ color: 'var(--text-muted)' }}>Role</dt><dd className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{selected.role}</dd></div>
          <div className="flex justify-between"><dt className="text-xs" style={{ color: 'var(--text-muted)' }}>Status</dt><dd className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{selected.status}</dd></div>
          <div className="flex justify-between"><dt className="text-xs" style={{ color: 'var(--text-muted)' }}>Revenue</dt><dd className="text-xs font-medium" style={{ color: 'var(--primary)' }}>{selected.revenue}</dd></div>
        </dl>
      </div>
    </div>
  );
}

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ name: '', email: '', plan: 'pro', confirm: false });

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {['Personal', 'Plan', 'Confirm'].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ background: step > i + 1 ? 'var(--success)' : step === i + 1 ? 'var(--primary)' : 'var(--bg-subtle)', color: step >= i + 1 ? 'white' : 'var(--text-muted)' }}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className="text-[11px] font-medium" style={{ color: step >= i + 1 ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s}</span>
            {i < 2 && <div className="w-6 h-0.5" style={{ background: step > i + 1 ? 'var(--success)' : 'var(--border-default)' }} />}
          </div>
        ))}
      </div>
      {step === 1 && (
        <div className="space-y-3">
          <input type="text" placeholder="Name" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} className="w-full px-3 py-2 rounded-lg text-sm border outline-none" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
          <input type="email" placeholder="Email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} className="w-full px-3 py-2 rounded-lg text-sm border outline-none" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
        </div>
      )}
      {step === 2 && (
        <div className="space-y-2">
          {['basic', 'pro', 'enterprise'].map(plan => (
            <label key={plan} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer" style={{ borderColor: data.plan === plan ? 'var(--primary)' : 'var(--border-default)', background: data.plan === plan ? 'var(--primary-light)' : 'transparent' }}>
              <input type="radio" name="plan" checked={data.plan === plan} onChange={() => setData({ ...data, plan })} />
              <span className="text-xs font-medium capitalize" style={{ color: 'var(--text-primary)' }}>{plan}</span>
            </label>
          ))}
        </div>
      )}
      {step === 3 && (
        <div className="space-y-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <p>Name: <strong style={{ color: 'var(--text-primary)' }}>{data.name || '—'}</strong></p>
          <p>Email: <strong style={{ color: 'var(--text-primary)' }}>{data.email || '—'}</strong></p>
          <p>Plan: <strong style={{ color: 'var(--text-primary)' }}>{data.plan}</strong></p>
          <label className="flex items-center gap-2 mt-3"><input type="checkbox" checked={data.confirm} onChange={e => setData({ ...data, confirm: e.target.checked })} /> I confirm the details</label>
        </div>
      )}
      <div className="flex gap-2 mt-4">
        {step > 1 && <button onClick={() => setStep(step - 1)} className="px-3 py-1.5 rounded text-xs border" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>Back</button>}
        {step < 3 && <button onClick={() => setStep(step + 1)} className="px-3 py-1.5 rounded text-xs text-white" style={{ background: 'var(--primary)' }}>Next</button>}
        {step === 3 && <button className="px-3 py-1.5 rounded text-xs text-white" style={{ background: 'var(--success)' }}>Submit</button>}
      </div>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="relative rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border-default)' }}>
      <div className="flex items-center justify-between px-3 py-2 border-b" style={{ background: 'var(--bg-subtle)', borderColor: 'var(--border-default)' }}>
        <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>tsx</span>
        <button onClick={handleCopy} className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-muted)' }}>
          {copied ? <><Check size={10} /> Copied</> : <><Copy size={10} /> Copy</>}
        </button>
      </div>
      <pre className="p-3 text-xs overflow-x-auto font-mono" style={{ color: 'var(--text-primary)', background: 'var(--bg-surface)' }}><code>{code}</code></pre>
    </div>
  );
}

// ==================== ACCESSIBILITY ====================
function AccessibilitySection() {
  return (
    <div className="space-y-6">
      <Section title="Component States" description="All interactive states demonstrated">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: 'Default', style: { background: 'var(--primary)', color: 'white' } },
            { label: 'Hover', style: { background: 'var(--primary-hover)', color: 'white' } },
            { label: 'Focus', style: { background: 'var(--primary)', color: 'white', outline: '2px solid var(--primary)', outlineOffset: '2px' } },
            { label: 'Disabled', style: { background: 'var(--primary)', color: 'white', opacity: 0.5, cursor: 'not-allowed' } },
            { label: 'Loading', style: { background: 'var(--primary)', color: 'white' }, loading: true },
          ].map(s => (
            <div key={s.label} className="text-center">
              <button className="w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5" style={s.style as any}>
                {s.loading && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {s.label}
              </button>
              <span className="text-[10px] mt-1 block" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Error & Success States">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>Error State</label>
            <input type="text" defaultValue="invalid@" className="w-full px-3 py-2 rounded-lg text-sm border outline-none" style={{ borderColor: 'var(--danger)', background: 'var(--danger-soft)', color: 'var(--text-primary)' }} />
            <p className="text-[11px] mt-1 flex items-center gap-1" style={{ color: 'var(--danger)' }}><AlertCircle size={10} /> Please enter a valid email</p>
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-primary)' }}>Success State</label>
            <input type="text" defaultValue="valid@email.com" className="w-full px-3 py-2 rounded-lg text-sm border outline-none" style={{ borderColor: 'var(--success)', background: 'var(--success-soft)', color: 'var(--text-primary)' }} />
            <p className="text-[11px] mt-1 flex items-center gap-1" style={{ color: 'var(--success)' }}><Check size={10} /> Email is valid</p>
          </div>
        </div>
      </Section>

      <Section title="Keyboard Navigation Guide">
        <div className="space-y-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
          <div className="flex items-center gap-3 py-1.5 border-b" style={{ borderColor: 'var(--border-default)' }}>
            <kbd className="px-2 py-0.5 rounded text-[10px] font-mono border" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-subtle)' }}>Tab</kbd>
            <span>Move focus to next interactive element</span>
          </div>
          <div className="flex items-center gap-3 py-1.5 border-b" style={{ borderColor: 'var(--border-default)' }}>
            <kbd className="px-2 py-0.5 rounded text-[10px] font-mono border" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-subtle)' }}>Shift+Tab</kbd>
            <span>Move focus to previous element</span>
          </div>
          <div className="flex items-center gap-3 py-1.5 border-b" style={{ borderColor: 'var(--border-default)' }}>
            <kbd className="px-2 py-0.5 rounded text-[10px] font-mono border" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-subtle)' }}>Enter / Space</kbd>
            <span>Activate focused element</span>
          </div>
          <div className="flex items-center gap-3 py-1.5 border-b" style={{ borderColor: 'var(--border-default)' }}>
            <kbd className="px-2 py-0.5 rounded text-[10px] font-mono border" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-subtle)' }}>Escape</kbd>
            <span>Close modal, dropdown, or popover</span>
          </div>
          <div className="flex items-center gap-3 py-1.5">
            <kbd className="px-2 py-0.5 rounded text-[10px] font-mono border" style={{ borderColor: 'var(--border-default)', background: 'var(--bg-subtle)' }}>Arrow Keys</kbd>
            <span>Navigate within menus and tab groups</span>
          </div>
        </div>
      </Section>
    </div>
  );
}
