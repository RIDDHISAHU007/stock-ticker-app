import type { Metadata } from "next"
import { StockSearch } from "@/components/stock-search"
import { StockTicker } from "@/components/stock-ticker"
import { FavoritesSection } from "@/components/favorite-section"
import { TrendingUp, BarChart3, Search, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "StockTicker - Real-Time Stock Market Data & Analysis",
  description:
    "Search stocks, track market movements, and analyze financial data with our comprehensive stock ticker application. Get real-time prices, charts, and detailed stock information.",
  openGraph: {
    title: "StockTicker - Real-Time Stock Market Data",
    description:
      "Search stocks, track market movements, and analyze financial data with our comprehensive stock ticker application.",
    url: "https://stockticker.vercel.app",
    type: "website",
  },
  alternates: {
    canonical: "https://stockticker.vercel.app",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <span className="text-sm font-bold">ST</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">StockTicker</h1>
          </div>

          {/* Centered Search */}
          <div className="flex-1 max-w-md mx-8">
            <StockSearch />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Live Market Data</span>
            </div>
          </div>
        </div>
      </header>

      {/* Stock Ticker Banner */}
      <StockTicker />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-balance bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Real-Time Stock Market Data
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
              Search for stocks, view detailed information, and track market movements with our comprehensive stock
              ticker application powered by real-time data.
            </p>
          </div>

          {/* Featured Search Section */}
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 border-2 border-dashed border-border hover:border-primary/50 transition-colors duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-primary">
                  <Search className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Search Stocks</h3>
                </div>
                <StockSearch placeholder="Search for stocks like RELIANCE, TCS, INFY..." />
                <p className="text-sm text-muted-foreground">
                  Get instant access to stock prices, charts, and detailed analysis
                </p>
              </div>
            </Card>
          </div>

          {/* Favorites Section */}
          <div className="max-w-6xl mx-auto mb-12">
            <FavoritesSection />
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Real-Time Data</h3>
              <p className="text-sm text-muted-foreground">
                Live stock prices and market movements updated in real-time
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Interactive Charts</h3>
              <p className="text-sm text-muted-foreground">
                Detailed price charts with multiple timeframes and technical indicators
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-4">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Fast Search</h3>
              <p className="text-sm text-muted-foreground">
                Lightning-fast stock search with intelligent autocomplete suggestions
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
