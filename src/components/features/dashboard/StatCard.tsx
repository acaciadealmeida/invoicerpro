interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
}

export function StatCard({ label, value, change, trend, icon }: StatCardProps) {
  const trendColor = trend === "up" ? "var(--color-success)" : "var(--color-danger)";
  const trendWord = trend === "up" ? "more" : "less";

  return (
    <div
      className="bg-surface flex flex-col gap-4 p-4 rounded-lg"
      style={{ border: "1px solid var(--color-border-strong)", flex: "1 1 0", minWidth: 0 }}
    >
      {/* Top row: label + icon */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-4">
          <p className="text-[12px] leading-4" style={{ color: "var(--color-ink-placeholder)" }}>
            {label}
          </p>
          <p className="text-[20px] font-medium leading-6" style={{ color: "var(--color-ink-placeholder)" }}>
            {value}
          </p>
        </div>
        <div
          className="flex items-center justify-center rounded-[4px] flex-shrink-0"
          style={{ backgroundColor: "var(--color-page)", padding: 8 }}
        >
          <span style={{ color: "var(--color-ink-placeholder)", display: "block", width: 12, height: 12 }}>
            {icon}
          </span>
        </div>
      </div>

      {/* Trend */}
      <p className="text-[11px] leading-4">
        <span className="font-bold" style={{ color: trendColor }}>{change}</span>
        <span style={{ color: "var(--color-ink-placeholder)" }}> {trendWord} than last month</span>
      </p>
    </div>
  );
}
