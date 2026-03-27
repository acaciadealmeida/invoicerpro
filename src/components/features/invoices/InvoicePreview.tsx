import { Invoice } from "@/lib/data/invoices";
import { config } from "@/lib/config";

function formatCurrency(pence: number) {
  return `${config.currencySymbol}${(pence / 100).toFixed(2)}`;
}

export function InvoicePreview({ invoice }: { invoice: Invoice }) {
  const subtotal = invoice.lineItems.reduce((s, li) => s + li.quantity * li.unitCost, 0);
  const totalTax = invoice.lineItems.reduce((s, li) => s + li.quantity * li.unitCost * (li.taxRate / 100), 0);
  const total = subtotal + totalTax;

  return (
    <div className="bg-surface rounded-xl border border-border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
      {/* Header */}
      <div className="flex items-start justify-between pb-4 mb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">A</div>
            <span className="font-semibold text-ink">Alpha</span>
          </div>
          <p className="text-xs text-ink-secondary">Invoice #{invoice.reference.replace("Inv ", "0")}</p>
        </div>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-2 gap-6 mb-5">
        <div>
          <p className="text-xs text-ink-secondary font-medium mb-1">To</p>
          <p className="text-sm text-ink font-medium">{invoice.customerName}</p>
          <p className="text-xs text-ink-secondary mt-0.5">2, Oak Street<br />San Francisco, CA 94102</p>
        </div>
        <div>
          <p className="text-xs text-ink-secondary font-medium mb-1">From</p>
          <p className="text-sm text-ink font-medium">{config.companyName}</p>
          <p className="text-xs text-ink-secondary mt-0.5">{config.companyAddress}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <p className="text-xs text-ink-secondary font-medium">Issue date</p>
          <p className="text-sm text-ink mt-0.5">{invoice.createdAt}</p>
        </div>
        <div>
          <p className="text-xs text-ink-secondary font-medium">Due date</p>
          <p className="text-sm text-ink mt-0.5">{invoice.dueDate}</p>
        </div>
      </div>

      {/* Line items */}
      <div className="border-t border-border pt-4 mb-4">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-ink-secondary">
              <th className="text-left pb-2 font-medium">Term</th>
              <th className="text-right pb-2 font-medium">Qty</th>
              <th className="text-right pb-2 font-medium">Tax</th>
              <th className="text-right pb-2 font-medium">Cost</th>
              <th className="text-right pb-2 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((li, i) => (
              <tr key={i} className="border-t border-border">
                <td className="py-2 text-ink">{li.term}</td>
                <td className="py-2 text-right text-ink">{li.quantity.toString().padStart(2, "0")}</td>
                <td className="py-2 text-right text-ink">{li.taxRate}%</td>
                <td className="py-2 text-right text-ink">{(li.unitCost / 100).toFixed(2)}</td>
                <td className="py-2 text-right text-ink">{formatCurrency(li.quantity * li.unitCost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="border-t border-border pt-3 flex flex-col gap-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-ink-secondary">Subtotal</span>
          <span className="text-ink">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-ink-secondary">Total tax</span>
          <span className="text-ink">{formatCurrency(totalTax)}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold mt-1">
          <span className="text-ink">Amount due</span>
          <span className="text-ink">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
