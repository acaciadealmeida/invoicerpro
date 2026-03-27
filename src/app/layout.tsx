import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AgentationWidget } from "@/components/AgentationWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "InvoicerPRO",
  description: "Professional invoicing powered by GoCardless",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <AgentationWidget />
      </body>
    </html>
  );
}
