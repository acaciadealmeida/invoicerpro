import { config } from "@/lib/config";
import { dashboardStats } from "@/lib/data/dashboard";
import { StatCard } from "@/components/features/dashboard/StatCard";
import { RevenueChart } from "@/components/features/dashboard/RevenueChart";

// 12px icons for stat cards
const CustomerIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <div className="flex justify-center min-h-full px-4 md:px-8">
      <div className="flex flex-col gap-6 py-6 w-full max-w-[800px]">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1
              className="font-bold leading-10"
              style={{ fontSize: 18, color: "var(--color-ink-placeholder)" }}
            >
              Welcome, {config.companyName}
            </h1>
            <p className="text-[14px] leading-6" style={{ color: "var(--color-ink-muted)" }}>
              Here&apos;s how your business is doing.
            </p>
          </div>
          <button
            className="flex items-center gap-2 text-[14px] font-semibold cursor-pointer"
            style={{ color: "var(--color-primary)" }}
          >
            <DownloadIcon />
            Generate report
          </button>
        </div>

        {/* Stat cards */}
        <div className="flex flex-col md:flex-row gap-4">
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
          <StatCard
            label="Failed Payments"
            value="4%"
            change="2%"
            trend="down"
            icon={<AlertIcon />}
            trendColor="var(--color-success)"
          />
        </div>

        {/* Revenue chart */}
        <div
          className="bg-surface rounded-lg flex flex-col gap-8 p-4 min-h-[280px] md:min-h-[400px]"
          style={{ border: "1px solid var(--color-border-strong)", flexShrink: 0 }}
        >
          {/* Chart header */}
          <div className="flex items-start justify-between flex-shrink-0">
            <div className="flex flex-col gap-4">
              <p className="text-[12px] leading-4" style={{ color: "var(--color-ink-placeholder)" }}>
                Revenue
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-[20px] leading-6" style={{ color: "var(--color-ink-placeholder)" }}>
                  {formatCurrency(revenue.value)}
                </p>
                <span className="text-[11px] font-bold leading-4" style={{ color: "var(--color-success)" }}>
                  {revenue.change}
                </span>
              </div>
            </div>
            {/* Period select */}
            <div
              className="flex items-center gap-3 rounded-lg border border-border bg-surface text-[12px] flex-shrink-0"
              style={{ height: 36, width: 160, padding: "0 12px", color: "var(--color-ink-placeholder)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span className="flex-1">Last Year</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-0">
            <RevenueChart />
          </div>
        </div>
      </div>
    </div>
  );
}
