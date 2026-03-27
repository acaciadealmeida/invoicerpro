"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { invoices } from "@/lib/data/invoices";
import { Button } from "@/components/ui/Button";
import { InvoiceStatusBadge, PaymentStatusText } from "@/components/ui/Badge";
import { config } from "@/lib/config";

function formatCurrency(pence: number) {
  return `${config.currencySymbol}${(pence / 100).toLocaleString("en-GB", { minimumFractionDigits: 2 })} GBD`;
}

const SearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);

const SortIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
  </svg>
);

const PAGE_SIZE = 10;

export default function InvoicesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = invoices.filter(
    (inv) =>
      inv.reference.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-ink">Invoices</h1>
          <p className="text-sm text-ink-secondary mt-0.5">All your past, current and incoming invoices.</p>
        </div>
        <Button onClick={() => router.push("/invoices/new")}>New invoice</Button>
      </div>

      {/* Table card */}
      <div className="bg-surface rounded-lg border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-sm text-ink-secondary hover:text-ink cursor-pointer">
              Sort by <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <button className="flex items-center gap-1 text-sm text-ink-secondary hover:text-ink cursor-pointer">
              Filter <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-secondary"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-56 h-8 pl-8 pr-3 rounded-md border border-border bg-page text-sm text-ink placeholder:text-ink-secondary outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-ink-secondary px-4 py-3">Status</th>
              <th className="text-left text-xs font-medium text-ink-secondary px-4 py-3">Invoice</th>
              <th className="text-left text-xs font-medium text-ink-secondary px-4 py-3">Customer</th>
              <th className="text-left text-xs font-medium text-ink-secondary px-4 py-3">
                <span className="flex items-center gap-1">Date <SortIcon /></span>
              </th>
              <th className="text-left text-xs font-medium text-ink-secondary px-4 py-3">Payment Status</th>
              <th className="text-left text-xs font-medium text-ink-secondary px-4 py-3">Payment ID</th>
              <th className="text-right text-xs font-medium text-ink-secondary px-4 py-3">
                <span className="flex items-center justify-end gap-1">Amount <SortIcon /></span>
              </th>
              <th className="text-right text-xs font-medium text-ink-secondary px-4 py-3">View</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((inv) => (
              <tr
                key={inv.id}
                className="border-b border-border last:border-0 hover:bg-page cursor-pointer transition-colors"
                onClick={() => router.push(`/invoices/${inv.id}`)}
              >
                <td className="px-4 py-3"><InvoiceStatusBadge status={inv.status} /></td>
                <td className="px-4 py-3 font-medium text-ink">{inv.reference}</td>
                <td className="px-4 py-3 text-ink">{inv.customerName}</td>
                <td className="px-4 py-3 text-ink-secondary">{inv.createdAt}</td>
                <td className="px-4 py-3"><PaymentStatusText status={inv.paymentStatus} /></td>
                <td className="px-4 py-3 text-ink-secondary font-mono text-xs">{inv.paymentId || "—"}</td>
                <td className="px-4 py-3 text-right text-ink">{formatCurrency(inv.amount)}</td>
                <td className="px-4 py-3 text-right text-ink-secondary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 px-4 py-3 border-t border-border">
            {[1, 2, "…", 4, 5].map((p, i) => (
              <button
                key={i}
                onClick={() => typeof p === "number" && setPage(p)}
                className={[
                  "w-7 h-7 rounded text-xs font-medium cursor-pointer",
                  p === page ? "bg-primary text-white" : "text-ink-secondary hover:bg-page",
                  p === "…" ? "cursor-default" : "",
                ].join(" ")}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
