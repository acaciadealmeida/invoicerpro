import Link from "next/link";

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

const actions = [
  { label: "GC setup",                      href: "/settings" },
  { label: "New customer and mandate",       href: "/customers/new" },
  { label: "New invoice and mandate creation", href: "/invoices/new?flow=dd-new" },
  { label: "New invoice with an existing mandate", href: "/invoices/new?flow=dd-existing" },
  { label: "Mandate matching",               href: "/customers" },
];

export function QuickActions() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-ink mb-1">Manage</p>
      {actions.map((action) => (
        <Link
          key={action.href + action.label}
          href={action.href}
          className="flex flex-col items-center justify-center gap-1.5 p-4 rounded-lg border border-border bg-surface hover:border-primary/40 hover:bg-primary/5 transition-colors text-center group"
        >
          <span className="text-ink-secondary group-hover:text-primary transition-colors">
            <PlusIcon />
          </span>
          <span className="text-xs text-ink-secondary group-hover:text-ink leading-snug">{action.label}</span>
        </Link>
      ))}
    </div>
  );
}
