import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "March Madness | January Referral Hub",
  description: "January's March Madness referral drive — submit referrals, check the leaderboard, and win prizes.",
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
        <div className="scanlines" />
      </body>
    </html>
  );
}
