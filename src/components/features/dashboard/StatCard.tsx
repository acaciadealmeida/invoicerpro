import { Card } from "@/components/ui/Card";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
}

export function StatCard({ label, value, change, trend, icon }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-ink-secondary">{label}</p>
          <p className="text-2xl font-semibold text-ink mt-1">{value}</p>
        </div>
        <span className="text-ink-secondary">{icon}</span>
      </div>
      <p className={`text-xs ${trend === "up" ? "text-status-confirmed" : "text-brand"}`}>
        {change} {trend === "up" ? "more" : "less"} than last month
      </p>
    </Card>
  );
}
