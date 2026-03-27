import Link from "next/link";

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

const actions = [
  { label: "GC setup",                              href: "/settings" },
  { label: "New customer and mandate",              href: "/customers/new" },
  { label: "New invoice and mandate creation",      href: "/invoices/new?flow=dd-new" },
  { label: "New invoice with an existing mandate",  href: "/invoices/new?flow=dd-existing" },
  { label: "Mandate matching",                      href: "/customers" },
];

export function QuickActions() {
  return (
    <>
      {/* Title */}
      <div className="flex items-center px-6" style={{ height: 64 }}>
        <p
          className="font-bold text-[14px] leading-10"
          style={{ color: "var(--color-ink-placeholder)" }}
        >
          Manage
        </p>
      </div>

      {/* Flow items */}
      <div className="flex flex-col gap-6 px-4">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="bg-surface flex items-center justify-center rounded-lg flex-shrink-0"
              style={{ padding: 16 }}
            >
              <span style={{ color: "var(--color-ink-placeholder)" }}>
                <PlusIcon />
              </span>
            </div>
            <p
              className="text-[12px] text-center leading-normal"
              style={{ color: "var(--color-ink-placeholder)" }}
            >
              {action.label}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
