import { StockHeaderSkeleton, StockMetricsSkeleton, StockChartSkeleton } from "@/components/loading-skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-16 bg-muted rounded animate-pulse" />
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-sm font-bold">ST</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">StockTicker</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Live Data</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <StockHeaderSkeleton />
          <StockMetricsSkeleton />
          <StockChartSkeleton />
        </div>
      </main>
    </div>
  )
}
