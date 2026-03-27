"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

const HomeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const CustomerIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const InvoiceIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <path d="M9 7h6M9 12h6M9 17h4"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
);

const navItems = [
  { href: "/dashboard", label: "Home",      Icon: HomeIcon },
  { href: "/customers", label: "Customers", Icon: CustomerIcon },
  { href: "/invoices",  label: "Invoices",  Icon: InvoiceIcon },
  { href: "/settings",  label: "Settings",  Icon: SettingsIcon },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-col bg-surface border-r border-border h-full"
      style={{ width: 210, minWidth: 210 }}
    >
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center px-[22px] py-[5px]" style={{ height: 69 }}>
        <Logo width={138} />
      </Link>

      {/* Separator */}
      <div className="border-b border-border mx-4" />

      {/* Nav links */}
      <ul className="flex flex-col px-4 pt-1">
        {navItems.map(({ href, label, Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <li key={href} className="py-2">
              <Link
                href={href}
                className={`flex items-center justify-between px-3 py-1.5 rounded-full text-[12px] transition-colors hover:bg-[var(--color-fill)] ${active ? "bg-[var(--color-fill)]" : ""}`}
                style={{
                  color: "var(--color-ink-placeholder)",
                  fontWeight: active ? 700 : 400,
                }}
              >
                <span>{label}</span>
                <Icon />
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Separator */}
      <div className="border-b border-border mx-4 mt-1" />
    </nav>
  );
}
