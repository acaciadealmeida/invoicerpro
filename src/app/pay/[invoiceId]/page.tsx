"use client";

import { useParams } from "next/navigation";
import { invoices } from "@/lib/data/invoices";
import { config } from "@/lib/config";

function formatCurrency(pence: number) {
  return `${config.currencySymbol}${(pence / 100).toFixed(2)}`;
}

export default function PublicPaymentPage() {
  const params = useParams();
  const invoiceId = params.invoiceId as string;

  // Find invoice by ID or use a demo invoice
  const invoice = invoices.find((inv) => inv.id === invoiceId) || invoices[5];
  const subtotal = invoice.lineItems.reduce((s, li) => s + li.quantity * li.unitCost, 0);
  const totalTax = invoice.lineItems.reduce((s, li) => s + li.quantity * li.unitCost * (li.taxRate / 100), 0);
  const total = subtotal + totalTax;

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4" style={{ minWidth: 1280 }}>
      <div className="w-full max-w-lg bg-surface rounded-2xl overflow-hidden border border-border">
        {/* GoCardless header */}
        <div className="bg-ink px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#f5de00] flex items-center justify-center">
              <span className="text-ink text-[10px] font-bold">GC</span>
            </div>
            <span className="text-white text-sm font-semibold">GoCardless</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            <span className="text-xs text-ink-secondary">Secure payment</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          {/* Merchant + amount */}
          <div className="flex items-start justify-between mb-6 pb-6 border-b border-border">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">A</div>
                <span className="font-semibold text-ink">{config.companyName}</span>
              </div>
              <p className="text-xs text-ink-secondary">Invoice #{invoice.reference}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-ink">{formatCurrency(total)}</p>
              <p className="text-xs text-ink-secondary mt-0.5">via Direct Debit</p>
            </div>
          </div>

          {/* Line items */}
          <div className="flex flex-col gap-2 mb-6">
            {invoice.lineItems.map((li, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-ink-secondary">{li.term} × {li.quantity}</span>
                <span className="text-ink">{formatCurrency(li.quantity * li.unitCost)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm border-t border-border pt-2 mt-1">
              <span className="text-ink-secondary">Tax</span>
              <span className="text-ink">{formatCurrency(totalTax)}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-ink">Total</span>
              <span className="text-ink">{formatCurrency(total)}</span>
            </div>
          </div>

          {/* Pay button */}
          <button className="w-full h-12 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-hover transition-colors cursor-pointer">
            Pay {formatCurrency(total)} via Direct Debit
          </button>

          <p className="text-xs text-ink-secondary text-center mt-4">
            By paying, you agree to GoCardless&apos; terms of service. Your payment is protected.
          </p>
        </div>
      </div>
    </div>
  );
}
