"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

interface PricePoint {
  time: string
  price: number
  volume?: number
}

interface StockChartProps {
  symbol: string
}

const TIME_PERIODS = [
  { label: "1D", value: "1D", days: 1 },
  { label: "1W", value: "1W", days: 7 },
  { label: "1M", value: "1M", days: 30 },
  { label: "3M", value: "3M", days: 90 },
  { label: "1Y", value: "1Y", days: 365 },
]

export function StockChart({ symbol }: StockChartProps) {
  const [priceData, setPriceData] = useState<PricePoint[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState("1D")
  const [isLoading, setIsLoading] = useState(true)
  const [chartType, setChartType] = useState<"line" | "area">("area")

  useEffect(() => {
    const fetchPriceData = async () => {
      setIsLoading(true)
      try {
        const selectedPeriodData = TIME_PERIODS.find((p) => p.value === selectedPeriod)
        const days = selectedPeriodData?.days || 1
        
        // Determine the correct type based on selected period
        const type = selectedPeriod === "1D" ? "INTRADAY" : "DAILY"
        
        const response = await fetch(
          `https://portal.tradebrains.in/api/assignment/stock/${symbol}/prices?days=${days}&type=${type}&limit=100`,
        )

        if (response.ok) {
          const data = await response.json()
          if (data && Array.isArray(data)) {
            const formattedData = data.map((point: any, index: number) => ({
              time: point.time || point.timestamp || `${index}`,
              price: Number.parseFloat(point.price || point.close || point.ltp || 0),
              volume: point.volume ? Number.parseInt(point.volume) : undefined,
            }))
            setPriceData(formattedData)
          } else {
            // Generate mock data for demonstration
            generateMockData(days)
          }
        } else {
          generateMockData(days)
        }
      } catch (error) {
        console.error("Price data fetch error:", error)
        generateMockData(TIME_PERIODS.find((p) => p.value === selectedPeriod)?.days || 1)
      } finally {
        setIsLoading(false)
      }
    }

    const generateMockData = (days: number) => {
      const points = days === 1 ? 24 : Math.min(days * 2, 100)
      const basePrice = 1000 + Math.random() * 500
      const mockData: PricePoint[] = []

      for (let i = 0; i < points; i++) {
        const timeLabel =
          days === 1
            ? `${String(9 + Math.floor(i / 2)).padStart(2, "0")}:${i % 2 === 0 ? "00" : "30"}`
            : days <= 30
              ? `Day ${i + 1}`
              : `${Math.floor(i / 30) + 1}M ${i % 30}D`

        const priceChange = (Math.random() - 0.5) * 20
        const price = Math.max(basePrice + priceChange * (i / points), basePrice * 0.8)

        mockData.push({
          time: timeLabel,
          price: Number.parseFloat(price.toFixed(2)),
          volume: Math.floor(Math.random() * 100000) + 10000,
        })
      }
      setPriceData(mockData)
    }

    fetchPriceData()
  }, [symbol, selectedPeriod])

  const currentPrice = priceData[priceData.length - 1]?.price || 0
  const previousPrice = priceData[0]?.price || 0
  const priceChange = currentPrice - previousPrice
  const priceChangePercent = previousPrice ? (priceChange / previousPrice) * 100 : 0
  const isPositive = priceChange >= 0

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{`Time: ${label}`}</p>
          <p className="text-sm text-primary">{`Price: ₹${payload[0].value.toFixed(2)}`}</p>
          {payload[0].payload.volume && (
            <p className="text-xs text-muted-foreground">{`Volume: ${payload[0].payload.volume.toLocaleString()}`}</p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-card-foreground">Price Chart</h2>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">₹{currentPrice.toFixed(2)}</span>
              <div className={`flex items-center space-x-1 text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>
                  {isPositive ? "+" : ""}
                  {priceChange.toFixed(2)} ({isPositive ? "+" : ""}
                  {priceChangePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={chartType === "area" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("area")}
            >
              Area
            </Button>
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("line")}
            >
              Line
            </Button>
          </div>
        </div>

        {/* Time Period Selector */}
        <div className="flex flex-wrap gap-2">
          {TIME_PERIODS.map((period) => (
            <Button
              key={period.value}
              variant={selectedPeriod === period.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period.value)}
              className="text-xs"
            >
              {period.label}
            </Button>
          ))}
        </div>

        {/* Chart Container */}
        <div className="h-80 w-full">
          {isLoading ? (
            <div className="h-full bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto" />
                <p className="text-muted-foreground">Loading chart data...</p>
              </div>
            </div>
          ) : priceData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "area" ? (
                <AreaChart data={priceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                  <YAxis
                    domain={["dataMin - 10", "dataMax + 10"]}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `₹${value.toFixed(0)}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={isPositive ? "#10b981" : "#ef4444"}
                    fill={isPositive ? "#10b981" : "#ef4444"}
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              ) : (
                <LineChart data={priceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                  <YAxis
                    domain={["dataMin - 10", "dataMax + 10"]}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `₹${value.toFixed(0)}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={isPositive ? "#10b981" : "#ef4444"}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: isPositive ? "#10b981" : "#ef4444" }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          ) : (
            <div className="h-full bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">No chart data available for {symbol}</p>
                <p className="text-sm text-muted-foreground">Please try a different time period</p>
              </div>
            </div>
          )}
        </div>

        {/* Chart Info */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className={`w-3 h-3 rounded-full ${isPositive ? "bg-green-600" : "bg-red-600"}`} />
            <span>Price Movement</span>
          </div>
          <span>•</span>
          <span>Period: {selectedPeriod}</span>
          <span>•</span>
          <span>Data Points: {priceData.length}</span>
        </div>
      </div>
    </Card>
  )
}