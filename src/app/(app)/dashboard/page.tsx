import { config } from "@/lib/config";
import { dashboardStats } from "@/lib/data/dashboard";
import { StatCard } from "@/components/features/dashboard/StatCard";
import { RevenueChart } from "@/components/features/dashboard/RevenueChart";
import { QuickActions } from "@/components/features/dashboard/QuickActions";

const CustomerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

function formatCurrency(pence: number) {
  return `${config.currencySymbol}${(pence / 100).toLocaleString("en-GB", { minimumFractionDigits: 0 })}`;
}

export default function DashboardPage() {
  const { activeCustomers, totalProfit, overduePayments, revenue } = dashboardStats;

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-ink">Welcome, {config.companyName}</h1>
            <p className="text-sm text-ink-secondary mt-0.5">Here&apos;s how your business is doing.</p>
          </div>
          <button className="flex items-center gap-1.5 text-sm text-primary hover:underline cursor-pointer">
            <DownloadIcon />
            Generate report
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard
            label="Active Customers"
            value={activeCustomers.value.toString()}
            change={activeCustomers.change}
            trend={activeCustomers.trend}
            icon={<CustomerIcon />}
          />
          <StatCard
            label="Total Profit"
            value={formatCurrency(totalProfit.value)}
            change={totalProfit.change}
            trend={totalProfit.trend}
            icon={<ChartIcon />}
          />
          <StatCard
            label="Overdue payments"
            value={overduePayments.value.toString().padStart(2, "0")}
            change={overduePayments.change}
            trend={overduePayments.trend}
            icon={<ClockIcon />}
          />
        </div>

        {/* Revenue chart */}
        <div className="bg-surface rounded-lg border border-border p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-xs text-ink-secondary">Revenue</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-xl font-semibold text-ink">{formatCurrency(revenue.value)}</p>
                <span className="text-sm text-status-confirmed font-medium">{revenue.change}</span>
              </div>
            </div>
            <button className="flex items-center gap-1 text-xs text-ink-secondary border border-border rounded px-2.5 py-1.5 hover:border-primary/40 cursor-pointer">
              Last Month
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
          </div>
          <RevenueChart />
        </div>
      </div>

      {/* Quick actions sidebar */}
      <div className="w-44 flex-shrink-0 border-l border-border bg-surface px-4 py-8">
        <QuickActions />
      </div>
    </div>
  );
}
