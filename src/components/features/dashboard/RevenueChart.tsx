"use client";

import { useState, useEffect } from "react";
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
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const check = () => setDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const data = revenueChartData.map((d) => ({
    label: d.label,
    amount: d.amount / 100,
  }));

  const gridColor   = dark ? "#2e2e3c" : "#dfddda";
  const tickColor   = dark ? "#9898b0" : "#5a5c69";
  const cursorColor = dark ? "#2a2a36" : "#f5f5fa";
  const tooltipBg   = dark ? "#1e1e26" : "#ffffff";
  const tooltipBorder = dark ? "#3a3a4e" : "#dfddda";
  const tooltipColor  = dark ? "#f0f0f4" : "#1c1b18";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={gridColor} strokeDasharray="0" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: tickColor }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tick={{ fontSize: 12, fill: tickColor }}
          axisLine={false}
          tickLine={false}
          width={50}
          tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}K`)}
        />
        <Tooltip
          formatter={(value) => [formatAmount(Number(value) * 100), "Revenue"]}
          cursor={{ fill: cursorColor }}
          contentStyle={{
            fontSize: 12,
            borderRadius: 8,
            border: `1px solid ${tooltipBorder}`,
            backgroundColor: tooltipBg,
            color: tooltipColor,
          }}
        />
        <Bar dataKey="amount" fill="#4476f9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
