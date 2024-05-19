import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  "minimum-scale": "1",
  "initial-scale": "1",
  width: "device-width",
  "shrink-to-fit": "no",
  "viewport-fit": "cover",
  "theme-color": [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
};

export const metadata: Metadata = {
  title: "SuiviPaiement",
  description: "SuiviPaiement",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  authors: [
    { name: "Chedly rebai" },
    {
      name: "Chedly rebai",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-192x192.png" },
    { rel: "icon", url: "icons/icon-192x192.png" },
  ],
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
