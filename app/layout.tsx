import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Titillium_Web as FontSans } from "next/font/google";
import React from "react";

import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/auth";
import { PurchasesProvider } from "@/context/purchases";
import { ThemeProvider } from "@/context/themes";
import { cn } from "@/lib/utils";
import "./globals.css";

const title = "tapped ai : create world tour from your iphone";
const description =
  "live music data with superpowers - Tapped Ai predicts the future of the live performance industry and gives performers the means of creating a world tour from their phone. We use new tech to gather data across the US to analyze/predict trends in the live performance space to ultimately increase bookings and ticket sales";

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
  weight: ["200", "300", "400", "600", "700", "900"],
});

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css"
          rel="stylesheet"
        />
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      </head>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider>
          <PurchasesProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </PurchasesProvider>
        </AuthProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
