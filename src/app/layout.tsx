import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Profound Derby Drive | Profound Referral Hub",
  description: "Profound's Derby Drive referral contest — submit referrals, check the leaderboard, and earn up to $30K.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-[var(--font-body)]">
        {children}
        <Analytics />
        <div className="scanlines" />
      </body>
    </html>
  );
}
