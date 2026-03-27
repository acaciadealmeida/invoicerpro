"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { customers } from "@/lib/data/customers";
import { Button } from "@/components/ui/Button";
import { MandateStatusBadge } from "@/components/ui/Badge";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);

const PAGE_SIZE = 10;

export default function CustomersPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="px-4 md:px-8 py-8">
      <div className="mx-auto w-full max-w-[1000px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-bold leading-10" style={{ fontSize: 18, color: "var(--color-ink-placeholder)" }}>Customers</h1>
          <p className="text-[14px] leading-6" style={{ color: "var(--color-ink-muted)" }}>All your active and inactive customers</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => {}}>Import GoCardless customers</Button>
          <Button onClick={() => router.push("/customers/new")}>New customer</Button>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-surface rounded-lg border border-border">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border">
          <div className="flex items-center gap-10">
            <button className="flex items-center gap-2 text-[12px] font-semibold text-ink-muted hover:text-ink cursor-pointer">
              Sort by
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <button className="flex items-center gap-2 text-[12px] font-semibold text-ink-muted hover:text-ink cursor-pointer">
              Filter
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>
            </button>
          </div>
          <div className="relative flex-1 max-w-[400px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full h-8 pl-8 pr-3 rounded-lg border border-border bg-surface text-[12px] text-ink placeholder:text-ink-muted outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-ink-secondary px-4 py-3">Customer</th>
              <th className="text-left text-xs font-medium text-ink-secondary px-4 py-3">Email</th>
              <th className="text-left text-xs font-medium text-ink-secondary px-4 py-3">Mandate Status</th>
              <th className="text-left text-xs font-medium text-ink-secondary px-4 py-3">Mandate Reference</th>
              <th className="text-right text-xs font-medium text-ink-secondary px-4 py-3">View</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((c) => (
              <tr
                key={c.id}
                className="border-b border-border last:border-0 hover:bg-page cursor-pointer transition-colors"
                onClick={() => router.push(`/customers/${c.id}`)}
              >
                <td className="px-4 py-3 font-medium text-ink">{c.name}</td>
                <td className="px-4 py-3 text-ink-secondary">{c.email}</td>
                <td className="px-4 py-3"><MandateStatusBadge status={c.mandateStatus} /></td>
                <td className="px-4 py-3 text-ink-secondary">{c.mandateReference}</td>
                <td className="px-4 py-3 text-right text-ink-secondary"><ArrowIcon /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 px-4 py-3 border-t border-border">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={[
                    "w-7 h-7 rounded text-xs font-medium cursor-pointer",
                    p === page ? "bg-fill text-ink-placeholder font-semibold" : "text-ink-muted hover:bg-page",
                  ].join(" ")}
                >
                  {p}
                </button>
              );
            })}
            {totalPages > 5 && <span className="text-ink-secondary text-xs px-1">…</span>}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
