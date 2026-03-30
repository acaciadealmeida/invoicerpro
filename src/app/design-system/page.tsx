"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Table } from "@/components/ui/Table";
import { Logo } from "@/components/ui/Logo";
import {
  InvoiceStatusBadge,
  PaymentStatusText,
  MandateStatusBadge,
} from "@/components/ui/Badge";

/* ─── Token definitions (mirrored from globals.css for display) ─────────── */

const colorTokens = {
  Brand: [
    { name: "brand", var: "--color-brand", hex: "#FB0001" },
    { name: "primary", var: "--color-primary", hex: "#4476f9" },
    { name: "primary-hover", var: "--color-primary-hover", hex: "#3366e8" },
  ],
  Surfaces: [
    { name: "surface", var: "--color-surface", hex: "#FFFFFF" },
    { name: "page", var: "--color-page", hex: "#f5f5fa" },
    { name: "fill", var: "--color-fill", hex: "#f1f5f9" },
  ],
  Borders: [
    { name: "border", var: "--color-border", hex: "#dfddda" },
    { name: "border-strong", var: "--color-border-strong", hex: "#d9dae8" },
  ],
  Text: [
    { name: "ink", var: "--color-ink", hex: "#1c1b18" },
    { name: "ink-secondary", var: "--color-ink-secondary", hex: "#545048" },
    { name: "ink-placeholder", var: "--color-ink-placeholder", hex: "#5a5c69" },
    { name: "ink-muted", var: "--color-ink-muted", hex: "#858796" },
  ],
  Feedback: [
    { name: "success", var: "--color-success", hex: "#71b771" },
    { name: "danger", var: "--color-danger", hex: "#ef2f2b" },
  ],
  Status: [
    { name: "status-pending", var: "--color-status-pending", hex: "#F97316" },
    { name: "status-confirmed", var: "--color-status-confirmed", hex: "#16A34A" },
    { name: "status-submitted", var: "--color-status-submitted", hex: "#7C3AED" },
    { name: "status-paid", var: "--color-status-paid", hex: "#4476f9" },
    { name: "status-draft", var: "--color-status-draft", hex: "#545048" },
  ],
};

const radiusTokens = [
  { name: "sm", var: "--radius-sm", value: "4px" },
  { name: "md", var: "--radius-md", value: "8px" },
  { name: "lg", var: "--radius-lg", value: "12px" },
  { name: "xl", var: "--radius-xl", value: "16px" },
];

const shadowTokens = [
  { name: "card", var: "--shadow-card" },
  { name: "modal", var: "--shadow-modal" },
];

/* ─── Nav sections ──────────────────────────────────────────────────────── */

const navGroups = [
  {
    label: "Foundations",
    items: [
      { id: "colors", label: "Colors" },
      { id: "typography", label: "Typography" },
      { id: "border-radius", label: "Border Radius" },
      { id: "shadows", label: "Shadows" },
      { id: "logo", label: "Logo" },
    ],
  },
  {
    label: "Components",
    items: [
      { id: "button", label: "Button" },
      { id: "input", label: "Input" },
      { id: "select", label: "Select" },
      { id: "card", label: "Card" },
      { id: "badges", label: "Badges" },
      { id: "table", label: "Table" },
      { id: "modal", label: "Modal" },
    ],
  },
];

const allSections = navGroups.flatMap((g) => g.items);

/* ─── Reusable section wrapper ──────────────────────────────────────────── */

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-14 scroll-mt-8">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-ink">{title}</h2>
        {description && (
          <p className="text-sm text-ink-muted mt-1">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Showcase({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-surface border border-border rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}

/* ─── Color swatch ──────────────────────────────────────────────────────── */

function Swatch({ name, cssVar, hex }: { name: string; cssVar: string; hex: string }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-all hover:border-primary/30">
      <div
        className="h-16 w-full"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <div className="px-3 py-2.5">
        <p className="text-sm font-medium text-ink">{name}</p>
        <p className="text-[11px] text-ink-muted font-mono mt-0.5">{hex}</p>
        <p className="text-[11px] text-ink-muted font-mono opacity-60">{cssVar}</p>
      </div>
    </div>
  );
}

/* ─── Sample table data ─────────────────────────────────────────────────── */

const sampleTableRows = [
  { id: "1", name: "Acme Corp", email: "billing@acme.com", status: "Active" },
  { id: "2", name: "Widgets Inc", email: "pay@widgets.io", status: "Pending" },
  { id: "3", name: "FooBar Ltd", email: "hello@foobar.co", status: "Inactive" },
];

const sampleColumns = [
  { key: "name", header: "Name", render: (row: typeof sampleTableRows[0]) => row.name },
  { key: "email", header: "Email", render: (row: typeof sampleTableRows[0]) => row.email },
  { key: "status", header: "Status", render: (row: typeof sampleTableRows[0]) => row.status },
];

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("colors");

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const container = e.currentTarget;
    for (const s of allSections) {
      const el = container.querySelector(`#${s.id}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140) setActiveSection(s.id);
      }
    }
  };

  return (
    <div className="h-screen bg-page flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-surface border-b border-border px-8 py-5 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-primary rounded-full" />
          <div>
            <h1 className="text-base font-semibold text-ink leading-tight">
              InvoicerPRO Design System
            </h1>
            <p className="text-xs text-ink-muted mt-0.5">
              Tokens, foundations, and component reference
            </p>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Side nav */}
        <nav className="w-56 shrink-0 bg-surface border-r border-border overflow-y-auto py-5 px-3">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider px-3 mb-1.5">
                {group.label}
              </p>
              <ul className="space-y-px">
                {group.items.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={[
                        "group flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] transition-all",
                        activeSection === s.id
                          ? "bg-primary/8 text-primary font-medium"
                          : "text-ink-secondary hover:bg-fill hover:text-ink",
                      ].join(" ")}
                      onClick={() => setActiveSection(s.id)}
                    >
                      <span
                        className={[
                          "w-1 h-1 rounded-full transition-all",
                          activeSection === s.id
                            ? "bg-primary scale-150"
                            : "bg-border group-hover:bg-ink-muted",
                        ].join(" ")}
                      />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto px-12 py-10" onScroll={handleScroll}>
          <div className="max-w-3xl">

            {/* ── Colors ──────────────────────────────────────────────── */}
            <Section
              id="colors"
              title="Colors"
              description="The color palette used across all surfaces, text, and interactive elements."
            >
              {Object.entries(colorTokens).map(([group, tokens]) => (
                <SubSection key={group} title={group}>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {tokens.map((t) => (
                      <Swatch key={t.name} name={t.name} cssVar={t.var} hex={t.hex} />
                    ))}
                  </div>
                </SubSection>
              ))}
            </Section>

            {/* ── Typography ──────────────────────────────────────────── */}
            <Section
              id="typography"
              title="Typography"
              description="Type scale and text color hierarchy, all set in Inter."
            >
              <Showcase>
                <div className="space-y-5">
                  {[
                    { label: "text-xl / bold", cls: "text-xl font-bold", use: "Page titles" },
                    { label: "text-lg / semibold", cls: "text-lg font-semibold", use: "Section headings" },
                    { label: "text-base / semibold", cls: "text-base font-semibold", use: "Card titles" },
                    { label: "text-sm / medium", cls: "text-sm font-medium", use: "Labels, nav items" },
                    { label: "text-sm / regular", cls: "text-sm", use: "Body text" },
                    { label: "text-xs / medium", cls: "text-xs font-medium", use: "Captions, meta" },
                    { label: "text-xs / regular", cls: "text-xs", use: "Helper text" },
                    { label: "text-[11px] / semibold", cls: "text-[11px] font-semibold", use: "Badges" },
                  ].map((t) => (
                    <div key={t.label} className="flex items-baseline gap-4 group">
                      <div className="w-48 shrink-0">
                        <p className="text-[11px] text-ink-muted font-mono">{t.label}</p>
                        <p className="text-[11px] text-ink-placeholder">{t.use}</p>
                      </div>
                      <span className={`text-ink ${t.cls}`}>
                        The quick brown fox
                      </span>
                    </div>
                  ))}
                </div>
              </Showcase>

              <div className="mt-6">
                <SubSection title="Text Colors">
                  <Showcase>
                    <div className="space-y-3">
                      {[
                        { color: "text-ink", label: "ink", desc: "Primary text, headings" },
                        { color: "text-ink-secondary", label: "ink-secondary", desc: "Labels, secondary content" },
                        { color: "text-ink-placeholder", label: "ink-placeholder", desc: "Placeholders, empty states" },
                        { color: "text-ink-muted", label: "ink-muted", desc: "Subtitles, de-emphasized" },
                      ].map((t) => (
                        <div key={t.label} className="flex items-center gap-4">
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: `var(--color-${t.label})` }} />
                          <span className={`text-sm font-medium ${t.color} w-36 shrink-0`}>{t.label}</span>
                          <span className="text-xs text-ink-muted">{t.desc}</span>
                        </div>
                      ))}
                    </div>
                  </Showcase>
                </SubSection>
              </div>
            </Section>

            {/* ── Border Radius ───────────────────────────────────────── */}
            <Section
              id="border-radius"
              title="Border Radius"
              description="Corner radius scale from subtle to rounded."
            >
              <Showcase>
                <div className="flex items-end gap-8">
                  {radiusTokens.map((r) => (
                    <div key={r.name} className="flex flex-col items-center gap-3">
                      <div
                        className="w-20 h-20 bg-primary/10 border-2 border-primary/40 transition-colors hover:bg-primary/20 hover:border-primary/60"
                        style={{ borderRadius: `var(${r.var})` }}
                      />
                      <div className="text-center">
                        <p className="text-sm font-medium text-ink">{r.name}</p>
                        <p className="text-[11px] text-ink-muted font-mono">{r.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Showcase>
            </Section>

            {/* ── Shadows ─────────────────────────────────────────────── */}
            <Section
              id="shadows"
              title="Shadows"
              description="Elevation levels for layered surfaces."
            >
              <Showcase className="bg-page">
                <div className="flex items-center gap-10">
                  {shadowTokens.map((s) => (
                    <div key={s.name} className="flex flex-col items-center gap-3">
                      <div
                        className="w-36 h-24 bg-surface rounded-xl"
                        style={{ boxShadow: `var(${s.var})` }}
                      />
                      <div className="text-center">
                        <p className="text-sm font-medium text-ink">{s.name}</p>
                        <p className="text-[11px] text-ink-muted font-mono">{s.var}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Showcase>
            </Section>

            {/* ── Logo ────────────────────────────────────────────────── */}
            <Section
              id="logo"
              title="Logo"
              description="The InvoicerPRO logo at standard sizes. Mark adapts to dark mode."
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { w: 200, label: "Large (200px)" },
                  { w: 160, label: "Default (160px)" },
                  { w: 100, label: "Compact (100px)" },
                ].map((l) => (
                  <Showcase key={l.w} className="flex flex-col items-center justify-center gap-3 py-8">
                    <Logo width={l.w} />
                    <p className="text-[11px] text-ink-muted">{l.label}</p>
                  </Showcase>
                ))}
              </div>
            </Section>

            {/* ── Button ──────────────────────────────────────────────── */}
            <Section
              id="button"
              title="Button"
              description="Four variants, two sizes, and interactive states."
            >
              <SubSection title="Variants">
                <Showcase>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                  </div>
                </Showcase>
              </SubSection>
              <SubSection title="Sizes">
                <Showcase>
                  <div className="flex items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                  </div>
                </Showcase>
              </SubSection>
              <SubSection title="States">
                <Showcase>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Button disabled>Disabled</Button>
                    <Button loading>Loading</Button>
                    <Button variant="secondary" disabled>Secondary Disabled</Button>
                    <Button variant="danger" disabled>Danger Disabled</Button>
                  </div>
                </Showcase>
              </SubSection>
            </Section>

            {/* ── Input ───────────────────────────────────────────────── */}
            <Section
              id="input"
              title="Input"
              description="Text input with label, icon, error, and disabled states."
            >
              <Showcase>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Default" placeholder="Enter text..." />
                  <Input label="With value" defaultValue="Andre de Almeida" />
                  <Input label="With error" defaultValue="bad@" error="Invalid email address" />
                  <Input label="With icon" leftIcon={<span className="text-sm">@</span>} placeholder="username" />
                  <Input label="Disabled" placeholder="Disabled" disabled />
                </div>
              </Showcase>
            </Section>

            {/* ── Select ──────────────────────────────────────────────── */}
            <Section
              id="select"
              title="Select"
              description="Native dropdown select with label."
            >
              <Showcase>
                <div className="max-w-xs">
                  <Select
                    label="Country"
                    options={[
                      { value: "gb", label: "United Kingdom" },
                      { value: "us", label: "United States" },
                      { value: "fr", label: "France" },
                      { value: "de", label: "Germany" },
                    ]}
                  />
                </div>
              </Showcase>
            </Section>

            {/* ── Card ────────────────────────────────────────────────── */}
            <Section
              id="card"
              title="Card"
              description="Container component with optional padding."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-page border border-dashed border-border rounded-xl p-4 flex items-center justify-center">
                  <Card>
                    <p className="text-sm font-medium text-ink">Default card</p>
                    <p className="text-xs text-ink-muted mt-1">With padding enabled</p>
                  </Card>
                </div>
                <div className="bg-page border border-dashed border-border rounded-xl p-4 flex items-center justify-center">
                  <Card padding={false} className="w-full">
                    <div className="p-4 border-b border-border">
                      <p className="text-sm font-medium text-ink">No-padding card</p>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-ink-muted">Custom internal layout</p>
                    </div>
                  </Card>
                </div>
              </div>
            </Section>

            {/* ── Badges ──────────────────────────────────────────────── */}
            <Section
              id="badges"
              title="Badges"
              description="Status indicators for invoices, payments, and mandates."
            >
              <SubSection title="Invoice Status">
                <Showcase>
                  <div className="flex items-center gap-4">
                    {(["draft", "waiting", "paid"] as const).map((s) => (
                      <div key={s} className="flex flex-col items-center gap-2">
                        <InvoiceStatusBadge status={s} />
                        <span className="text-[11px] text-ink-muted font-mono">{s}</span>
                      </div>
                    ))}
                  </div>
                </Showcase>
              </SubSection>
              <SubSection title="Payment Status">
                <Showcase>
                  <div className="flex items-center gap-5 flex-wrap">
                    {(["draft", "pending", "submitted", "confirmed", "paid_out", "failed", "cancelled"] as const).map((s) => (
                      <div key={s} className="flex flex-col items-center gap-2">
                        <PaymentStatusText status={s} />
                        <span className="text-[11px] text-ink-muted font-mono">{s}</span>
                      </div>
                    ))}
                  </div>
                </Showcase>
              </SubSection>
              <SubSection title="Mandate Status">
                <Showcase>
                  <div className="flex items-center gap-4">
                    {(["active", "pending", "cancelled", "expired"] as const).map((s) => (
                      <div key={s} className="flex flex-col items-center gap-2">
                        <MandateStatusBadge status={s} />
                        <span className="text-[11px] text-ink-muted font-mono">{s}</span>
                      </div>
                    ))}
                  </div>
                </Showcase>
              </SubSection>
            </Section>

            {/* ── Table ───────────────────────────────────────────────── */}
            <Section
              id="table"
              title="Table"
              description="Data table with clickable rows and empty state."
            >
              <SubSection title="With data">
                <Showcase className="p-0 overflow-hidden">
                  <div className="p-5">
                    <Table columns={sampleColumns} rows={sampleTableRows} />
                  </div>
                </Showcase>
              </SubSection>
              <SubSection title="Empty state">
                <Showcase className="p-0 overflow-hidden">
                  <div className="p-5">
                    <Table columns={sampleColumns} rows={[]} emptyMessage="No customers found" />
                  </div>
                </Showcase>
              </SubSection>
            </Section>

            {/* ── Modal ───────────────────────────────────────────────── */}
            <Section
              id="modal"
              title="Modal"
              description="Overlay dialog with backdrop blur. Closes on Escape or backdrop click."
            >
              <Showcase className="flex items-center gap-4">
                <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                <span className="text-xs text-ink-muted">Click to preview the modal component</span>
              </Showcase>
              <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Example Modal">
                <p className="text-sm text-ink-secondary mb-4">
                  This is a modal dialog. Press Escape or click the backdrop to close.
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setModalOpen(false)}>Confirm</Button>
                </div>
              </Modal>
            </Section>

          </div>
        </main>
      </div>
    </div>
  );
}
