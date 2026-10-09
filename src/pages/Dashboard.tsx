import { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, MousePointer, DollarSign, TrendingDown, MoreHorizontal, ArrowUpRight, ArrowDownRight, Eye, Download } from 'lucide-react';
import { kpiData, salesData, performanceData, trafficSources, intradayData, distributionData, userRatings, recentActivity } from '../lib/mock-data';
import { formatPercent } from '../lib/hooks';

const iconMap: Record<string, React.ElementType> = { users: Users, 'mouse-pointer': MousePointer, 'dollar-sign': DollarSign, 'trending-down': TrendingDown };

export function Dashboard() {
  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Dashboard Overview</h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Welcome back! Here's what's happening with your data.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="text-xs border rounded-lg px-3 py-2 outline-none" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}>
            <option>Last 7 days</option><option>Last 30 days</option><option>Last 90 days</option>
          </select>
          <button className="px-3 py-2 rounded-lg text-xs font-medium text-white flex items-center gap-1.5" style={{ background: 'var(--primary)' }}>
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Section A: KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiData.map(kpi => <KPICard key={kpi.id} {...kpi} />)}
      </div>

      {/* Section B: Sales Overview */}
      <SalesOverview />

      {/* Section C + D Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2"><PerformanceChart /></div>
        <TrafficSources />
      </div>

      {/* Section E + F Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ClientTrend />
        <ClientDistribution />
      </div>

      {/* Section G + H Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <UserRating />
        <div className="xl:col-span-2"><RecentActivity /></div>
      </div>
    </div>
  );
}

function KPICard({ label, value, change, icon }: { id: string; label: string; value: string; change: number; icon: string }) {
  const Icon = iconMap[icon] || Users;
  const isPositive = change >= 0;
  return (
    <div className="rounded-xl p-4 border transition-all hover:shadow-md group" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary-light)' }}>
          <Icon size={18} style={{ color: 'var(--primary)' }} />
        </div>
        <button className="p-1 rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal size={16} style={{ color: 'var(--text-muted)' }} /></button>
      </div>
      <p className="text-[11px] font-medium mb-0.5 uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{label}</p>
      <p className="text-[22px] font-bold leading-tight mb-2" style={{ color: 'var(--primary)' }}>{value}</p>
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-md"
          style={{ color: isPositive ? 'var(--success)' : 'var(--danger)', background: isPositive ? 'var(--success-soft)' : 'var(--danger-soft)' }}>
          {isPositive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
          {formatPercent(change)}
        </span>
        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>From Last Month</span>
      </div>
    </div>
  );
}

function SalesOverview() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  const data = salesData[period];
  const chartData = data.labels.map((l, i) => ({
    name: l,
    value: data.values[i],
    change: i > 0 ? ((data.values[i] - data.values[i-1]) / data.values[i-1] * 100) : 0
  }));

  return (
    <div className="rounded-xl p-5 border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Sales Overview</h3>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>Revenue performance over time</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border-default)' }}>
            {(['7d', '30d', '90d', '1y'] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className="px-3 py-1.5 text-[11px] font-medium transition-colors"
                style={{ background: period === p ? 'var(--primary)' : 'transparent', color: period === p ? 'white' : 'var(--text-secondary)' }}>
                {p === '7d' ? '7D' : p === '30d' ? '30D' : p === '90d' ? '90D' : '1Y'}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#774AA4" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#774AA4" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={45} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const val = payload[0].value as number;
                const change = (payload[0].payload as any).change;
                return (
                  <div className="rounded-lg px-3 py-2 shadow-lg border text-xs" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
                    <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{label}</p>
                    <p style={{ color: 'var(--primary)' }}>${val.toLocaleString()}</p>
                    {change !== 0 && (
                      <p className="mt-0.5" style={{ color: change > 0 ? 'var(--success)' : 'var(--danger)' }}>
                        {change > 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
                      </p>
                    )}
                  </div>
                );
              }}
            />
            <Area type="monotone" dataKey="value" stroke="#774AA4" strokeWidth={2.5} fill="url(#salesGradient)" dot={false} activeDot={{ r: 5, fill: '#774AA4', stroke: 'white', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PerformanceChart() {
  const [year, setYear] = useState('2024');
  const chartData = performanceData.labels.map((label, i) => ({
    name: label,
    target: performanceData.target[i],
    paid: performanceData.paid[i],
    pending: performanceData.pending[i],
  }));

  return (
    <div className="rounded-xl p-5 border h-full" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Performance</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--primary)' }} /> Target</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--primary-track)' }} /> Paid</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--primary-light)' }} /> Pending</span>
          </div>
          <select value={year} onChange={e => setYear(e.target.value)} className="text-xs border rounded-lg px-2 py-1 outline-none" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-subtle)' }}>
            <option>2024</option><option>2023</option>
          </select>
        </div>
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: '11px' }} />
            <Bar dataKey="target" fill="var(--primary)" radius={[3, 3, 0, 0]} barSize={12} />
            <Bar dataKey="paid" fill="var(--primary-track)" radius={[3, 3, 0, 0]} barSize={12} />
            <Bar dataKey="pending" fill="var(--primary-light)" radius={[3, 3, 0, 0]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function TrafficSources() {
  const [period, setPeriod] = useState('month');
  return (
    <div className="rounded-xl p-5 border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Traffic Sources</h3>
        <select value={period} onChange={e => setPeriod(e.target.value)} className="text-xs border rounded-lg px-2 py-1 outline-none" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-subtle)' }}>
          <option value="week">This Week</option><option value="month">This Month</option><option value="year">This Year</option>
        </select>
      </div>
      <div className="space-y-4">
        {trafficSources.map(source => (
          <div key={source.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{source.name}</span>
              <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{source.value.toLocaleString()}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-subtle)' }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${source.percentage}%`, background: source.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClientTrend() {
  return (
    <div className="rounded-xl p-5 border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Client Responds Trend</h3>
        <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>Today</span>
      </div>
      <p className="text-2xl font-bold mb-3" style={{ color: 'var(--primary)' }}>16,468</p>
      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={intradayData.labels.map((l, i) => ({ name: l, value: intradayData.values[i] }))}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: '11px' }} />
            <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2} fill="url(#trendGradient)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ClientDistribution() {
  return (
    <div className="rounded-xl p-5 border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Client Responds Distribution</h3>
        <button className="text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-lg" style={{ color: 'var(--primary)' }}>
          <Eye size={12} /> View Details
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-[160px] w-[160px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={distributionData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" stroke="none">
                {distributionData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          {distributionData.map(item => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color }} />
              <div>
                <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{item.name}</p>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{item.value}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserRating() {
  return (
    <div className="rounded-xl p-5 border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
      <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>User Rating</h3>
      <div className="space-y-3">
        {userRatings.map(user => (
          <div key={user.rank} className="flex items-center gap-3">
            <span className="text-xs font-bold w-5 text-center" style={{ color: 'var(--text-muted)' }}>#{user.rank}</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: user.color }}>
              {user.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
            </div>
            <span className="text-xs font-semibold" style={{ color: 'var(--primary)' }}>${user.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentActivity() {
  const [sortField, setSortField] = useState<string>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const sorted = [...recentActivity].sort((a, b) => {
    const aVal = (a as any)[sortField];
    const bVal = (b as any)[sortField];
    if (sortDir === 'asc') return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(sorted.length / pageSize);

  const handleSort = (field: string) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex items-center justify-between p-4 pb-3">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Activity</h3>
        <select className="text-xs border rounded-lg px-2 py-1 outline-none" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)', background: 'var(--bg-subtle)' }}>
          <option>All Status</option><option>Success</option><option>Pending</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: 'var(--bg-subtle)' }}>
              {['User', 'Date & Time', 'Duration', 'Commission', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-2.5 font-semibold cursor-pointer hover:opacity-70" style={{ color: 'var(--text-secondary)' }} onClick={() => handleSort(h.toLowerCase())}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map(row => (
              <tr key={row.id} className="border-t" style={{ borderColor: 'var(--border-default)' }}>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold" style={{ background: 'var(--primary)' }}>
                      {row.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span style={{ color: 'var(--text-primary)' }}>{row.user}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.date}</td>
                <td className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.duration}</td>
                <td className="px-4 py-2.5 font-medium" style={{ color: 'var(--text-primary)' }}>{row.commission}</td>
                <td className="px-4 py-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{ background: row.status === 'success' ? 'var(--success-soft)' : 'var(--warning-soft)', color: row.status === 'success' ? 'var(--success)' : 'var(--warning)' }}>
                    {row.status === 'success' ? 'Success' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: 'var(--border-default)' }}>
        <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Showing {page * pageSize + 1}-{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}</span>
        <div className="flex gap-1">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="px-2 py-1 rounded text-[11px] border disabled:opacity-40" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>Prev</button>
          <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="px-2 py-1 rounded text-[11px] border disabled:opacity-40" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>Next</button>
        </div>
      </div>
    </div>
  );
}
