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
    amount: d.amount / 100, // convert to pounds for chart display
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barSize={16} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#E5E7EB" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "#6B7280" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#6B7280" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v / 1000}K`}
        />
        <Tooltip
          formatter={(value) => [formatAmount(Number(value) * 100), "Revenue"]}
          cursor={{ fill: "#F4F5F7" }}
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E5E7EB" }}
        />
        <Bar dataKey="amount" fill="#3B6FEB" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
