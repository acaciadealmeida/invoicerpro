"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { revenueChartData } from "@/lib/data/dashboard";
import { config } from "@/lib/config";

function formatAmount(pence: number) {
  return `${config.currencySymbol}${(pence / 100).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`;
}

export function RevenueChart() {
  const data = revenueChartData.map((d) => ({
    label: d.label,
    amount: d.amount / 100,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#dfddda" strokeDasharray="0" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: "#5a5c69" }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#5a5c69" }}
          axisLine={false}
          tickLine={false}
          width={50}
          tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}K`)}
        />
        <Tooltip
          formatter={(value) => [formatAmount(Number(value) * 100), "Revenue"]}
          cursor={{ fill: "#f5f5fa" }}
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #dfddda" }}
        />
        <Bar dataKey="amount" fill="#4476f9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
