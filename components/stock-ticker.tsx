"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TrendingUp, TrendingDown, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TickerStock {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export function StockTicker() {
  const router = useRouter()
  const [stocks, setStocks] = useState<TickerStock[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Fetch stock data
  const fetchTickerData = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true)
    try {
      const response = await fetch("https://portal.tradebrains.in/api/assignment/index/NIFTY/movers/")
      if (!response.ok) throw new Error("API response not ok")
      const data = await response.json()
      const transformedData = (data?.gainers || [])
        .slice(0, 10)
        .map((stock: any) => ({
          symbol: stock.symbol || stock.name || "N/A",
          price: Number(stock.open || stock.ltp || 0),
          change: Number(stock.change || 0),
          changePercent: Number(stock.percent || stock.per_change || 0),
        }))
      setStocks(transformedData)
      setError(null)
    } catch (err) {
      console.error(err)
      setError("Unable to load market data")
      // fallback demo data
      setStocks([
        { symbol: "RELIANCE", price: 2456.75, change: 23.45, changePercent: 0.96 },
        { symbol: "TCS", price: 3234.5, change: -12.3, changePercent: -0.38 },
        { symbol: "INFY", price: 1567.8, change: 45.2, changePercent: 2.97 },
        { symbol: "HDFCBANK", price: 1678.9, change: 8.75, changePercent: 0.52 },
        { symbol: "ICICIBANK", price: 987.65, change: -5.4, changePercent: -0.54 },
      ])
    } finally {
      setIsLoading(false)
      if (showRefreshIndicator) setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchTickerData()
    const interval = setInterval(() => fetchTickerData(), 30000)
    return () => clearInterval(interval)
  }, [])

  const handleStockClick = (symbol: string) => {
    router.push(`/stock/${symbol}`)
  }

  if (isLoading) {
    return (
      <div className="bg-muted border-b py-3 px-4">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-sm font-medium">Loading market data...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-muted border-b overflow-hidden relative">
      {/* Refresh Button */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fetchTickerData(true)}
          disabled={isRefreshing}
          className="text-xs bg-black text-white hover:bg-black hover:text-white px-3 py-2 rounded transition-transform duration-150 hover:scale-105"
        >
          <RefreshCw className={`h-3 w-3 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 border-b border-destructive/20">
          <div className="container mx-auto px-4 py-2 flex items-center space-x-2 text-destructive text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error} - Showing demo data</span>
          </div>
        </div>
      )}

      {/* Stock Ticker */}
      <div className="relative">
        <div className="flex animate-scroll space-x-8 py-3 pr-24">
          {[...stocks, ...stocks].map((stock, index) => (
            <div
              key={`${stock.symbol}-${index}`}
              onClick={() => handleStockClick(stock.symbol)}
              className="flex items-center space-x-2 whitespace-nowrap hover:bg-background/50 px-2 py-1 rounded transition-colors duration-150 cursor-pointer"
            >
              <span className="font-semibold text-sm">{stock.symbol}</span>
              <span className="text-sm font-medium">₹{stock.price.toFixed(2)}</span>
              <div
                className={`flex items-center space-x-1 text-xs font-medium ${
                  stock.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)}
                </span>
                <span>
                  ({stock.changePercent >= 0 ? "+" : ""}
                  {stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
