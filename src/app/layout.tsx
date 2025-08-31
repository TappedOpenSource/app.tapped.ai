import type { Metadata } from "next";
import { Titillium_Web as FontSans } from "next/font/google";
import React from "react";
import { CSPostHogProvider } from "@/context/analytics";

import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/auth";
import { PurchasesProvider } from "@/context/purchases";
import { ThemeProvider } from "@/context/themes";
import { cn } from "@/lib/utils";
import "stream-chat-react/dist/css/v2/index.css";
// import "stream-chat-react/dist/css/v2/index.layout.css";
import "./globals.css";

const title = "perform live | tapped ai";
const description =
  "Live Music Data Analytic - Tapped Ai predicts the future of the live performance industry and gives performers the means of creating a world tour from their phone. We use new tech to gather data across the US to analyze/predict trends in the live performance space to ultimately increase bookings and ticket sales";
const metadataBase = "https://tapped.ai";

export const metadata: Metadata = {
  metadataBase: new URL(metadataBase),
  title,
  description,
  openGraph: {
    type: "website",
    url: metadataBase,
    title,
    description,
    siteName: "Tapped Ai",
    images: [{ url: `${metadataBase}/map-og.png` }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tappedx",
    title,
    description,
    images: `${metadataBase}/map-og.png`,
  },
  appLinks: {
    ios: {
      url: "https://tapped.ai",
      app_store_id: "1574937614",
      app_name: "Tapped Ai",
    },
    android: {
      package: "com.intheloopstudio",
      app_name: "Tapped Ai",
    },
    web: {
      url: "https://tapped.ai",
      should_fallback: true,
    },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css" rel="stylesheet" />
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
        <script async src="https://cdn.tolt.io/tolt.js" data-tolt="c77a5dc4-85f0-4852-9474-d07e64a12ace"></script>
      </head>
      <body className={cn("bg-background min-h-screen font-sans antialiased", fontSans.variable)}>
        <CSPostHogProvider>
          <AuthProvider>
            <PurchasesProvider>
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                {children}
              </ThemeProvider>
            </PurchasesProvider>
          </AuthProvider>
        </CSPostHogProvider>
        <Toaster />
      </body>
    </html>
  );
}
