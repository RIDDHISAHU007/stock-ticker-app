"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, TrendingUp, TrendingDown, X } from "lucide-react"
import Link from "next/link"

interface FavoriteStock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

export function FavoritesSection() {
  const [favorites, setFavorites] = useState<FavoriteStock[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("stockFavorites")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error("Error parsing favorites:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const removeFavorite = (symbol: string) => {
    const updatedFavorites = favorites.filter((stock) => stock.symbol !== symbol)
    setFavorites(updatedFavorites)
    localStorage.setItem("stockFavorites", JSON.stringify(updatedFavorites))
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Your Favorites</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/4"></div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (favorites.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Your Favorites</h3>
        </div>
        <Card className="p-8 text-center border-2 border-dashed border-border">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="font-medium mb-2">No favorites yet</h4>
          <p className="text-sm text-muted-foreground">
            Search for stocks and add them to your favorites to see them here
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Your Favorites</h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {favorites.length} stock{favorites.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((stock) => (
          <Card key={stock.symbol} className="p-4 hover:shadow-lg transition-shadow duration-200 group">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <Link
                  href={`/stock/${stock.symbol}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {stock.symbol}
                </Link>
                <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFavorite(stock.symbol)}
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-mono text-lg font-semibold">₹{stock.price.toFixed(2)}</span>
              <div
                className={`flex items-center space-x-1 text-sm ${
                  stock.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
