import { Card } from "@/components/ui/card"

interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  high: number
  low: number
  open: number
  volume: number
  marketCap?: number
  pe?: number
  eps?: number
}

interface StockMetricsProps {
  stock: StockData
}

export function StockMetrics({ stock }: StockMetricsProps) {
  const formatLargeNumber = (num: number) => {
    if (num >= 1000000000) {
      return `₹${(num / 1000000000).toFixed(2)}B`
    }
    if (num >= 1000000) {
      return `₹${(num / 1000000).toFixed(2)}M`
    }
    if (num >= 1000) {
      return `₹${(num / 1000).toFixed(2)}K`
    }
    return `₹${num.toFixed(2)}`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Market Cap</h3>
          <p className="text-2xl font-bold text-card-foreground">
            {stock.marketCap ? formatLargeNumber(stock.marketCap * 1000000) : "N/A"}
          </p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">P/E Ratio</h3>
          <p className="text-2xl font-bold text-card-foreground">{stock.pe ? stock.pe.toFixed(2) : "N/A"}</p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">EPS</h3>
          <p className="text-2xl font-bold text-card-foreground">{stock.eps ? `₹${stock.eps.toFixed(2)}` : "N/A"}</p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Day Range</h3>
          <p className="text-lg font-medium text-card-foreground">
            ₹{stock.low.toFixed(2)} - ₹{stock.high.toFixed(2)}
          </p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Volume</h3>
          <p className="text-lg font-medium text-card-foreground">{stock.volume.toLocaleString()}</p>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Previous Close</h3>
          <p className="text-lg font-medium text-card-foreground">₹{(stock.price - stock.change).toFixed(2)}</p>
        </div>
      </Card>
    </div>
  )
}
