import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZLAATA | Employee Fit Survey",
  description: "ZLAATA employee fit and size preference survey.",
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
