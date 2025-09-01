import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "StockTicker - Real-Time Stock Market Data & Analysis",
    template: "%s | StockTicker",
  },
  description:
    "Professional stock ticker application with real-time market data, detailed stock information, interactive charts, and comprehensive analysis tools. Track stocks, view price movements, and make informed investment decisions.",

  keywords: [
    "stocks",
    "stock market",
    "financial data",
    "trading",
    "investment",
    "market analysis",
    "real-time data",
    "stock prices",
    "financial charts",
    "portfolio tracking",
    "NSE",
    "BSE",
    "Indian stock market",
  ],
  authors: [{ name: "StockTicker Team" }],
  creator: "StockTicker",
  publisher: "StockTicker",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://stock-ticker-app-sable.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stockticker.app",
    title: "StockTicker - Real-Time Stock Market Data & Analysis",
    description:
      "Professional stock ticker application with real-time market data, detailed stock information, and comprehensive analysis tools.",
    siteName: "StockTicker",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "StockTicker - Real-Time Stock Market Data",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StockTicker - Real-Time Stock Market Data",
    description:
      "Track stocks, view price movements, and make informed investment decisions with our professional stock ticker application.",
    images: ["/twitter-image.png"],
    creator: "@stockticker",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#164e63" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="StockTicker" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "StockTicker",
              description: "Professional stock ticker application with real-time market data and analysis tools",
              url: "https://stockticker.vercel.app",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: "StockTicker Team",
              },
              publisher: {
                "@type": "Organization",
                name: "StockTicker",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
