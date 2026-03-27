/**
 * InvoicerPRO — Company Config
 *
 * This is THE file to change when duplicating this prototype for a new industry or client.
 * Update companyName, logoUrl, industry, currency and mock data in /lib/data/*.
 */
export const config = {
  /** Shown in the dashboard welcome message and invoice headers */
  companyName: "Alpha Inc",
  companyAddress: "1, Westminster, London SW1A 1AA",
  /** Path to the platform logo (the SaaS app logo — shown in the sidebar) */
  platformLogoUrl: "/logos/invoicerpro.svg",
  /** Path to the merchant/client logo (shown in invoice previews) */
  merchantLogoUrl: "/logos/alpha.svg",
  /** Industry label — used in scenario descriptions */
  industry: "accounting",
  /** GBP, EUR, USD, etc. */
  currency: "GBP",
  /** Currency symbol */
  currencySymbol: "£",
  /** Logged-in user */
  userName: "Douglas McGee",
  userInitial: "D",
  /** Notification count (badge on bell icon) */
  notificationCount: 18,
};

export type Config = typeof config;
