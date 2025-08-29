import { TrendingUp, TrendingDown } from "lucide-react"
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
}

interface StockHeaderProps {
  stock: StockData
}

export function StockHeader({ stock }: StockHeaderProps) {
  const isPositive = stock.change >= 0

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-card-foreground">{stock.symbol}</h1>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{stock.name}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold">₹{stock.price.toFixed(2)}</span>
            <div className={`flex items-center space-x-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
              <span className="font-medium">
                {isPositive ? "+" : ""}
                {stock.change.toFixed(2)}
              </span>
              <span className="font-medium">
                ({isPositive ? "+" : ""}
                {stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="space-y-1">
            <div className="text-muted-foreground">Open</div>
            <div className="font-medium">₹{stock.open.toFixed(2)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">High</div>
            <div className="font-medium text-green-600">₹{stock.high.toFixed(2)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">Low</div>
            <div className="font-medium text-red-600">₹{stock.low.toFixed(2)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">Volume</div>
            <div className="font-medium">{stock.volume.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
