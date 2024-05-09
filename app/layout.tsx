import React from "react";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Arimo as FontSans } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/auth";
import { PurchasesProvider } from "@/context/purchases";

const title = "tapped ai : create world tour from your iphone";
const description = "live music data with superpowers";

export const metadata: Metadata = {
  metadataBase: new URL("https://tapped.ai"),
  title,
  description,
  openGraph: {
    type: "website",
    url: "https://tapped.ai",
    title,
    description,
    siteName: "Tapped Ai",
    images: [{ url: "https://tapped.ai/map-og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tappedai",
    title,
    description,
    images: "https://tapped.ai/map-og.png",
  },
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
    children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href='https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css' rel='stylesheet' />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider>
          <PurchasesProvider>
            {children}
          </PurchasesProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
