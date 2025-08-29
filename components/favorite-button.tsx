"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/hooks/use-favorites"
import { cn } from "@/lib/utils"

interface FavoriteButtonProps {
  stock: {
    symbol: string
    name: string
    price: number
    change: number
    changePercent: number
  }
  className?: string
}

export function FavoriteButton({ stock, className }: FavoriteButtonProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites()
  const [isAnimating, setIsAnimating] = useState(false)

  const isFavorite = favorites.some((fav) => fav.symbol === stock.symbol)

  const handleToggleFavorite = () => {
    setIsAnimating(true)

    if (isFavorite) {
      removeFavorite(stock.symbol)
    } else {
      addFavorite(stock)
    }

    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      size="sm"
      onClick={handleToggleFavorite}
      className={cn("transition-all duration-200", isAnimating && "scale-110", className)}
    >
      <Heart
        className={cn(
          "h-4 w-4 mr-2 transition-all duration-200",
          isFavorite ? "fill-current" : "",
          isAnimating && "scale-125",
        )}
      />
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  )
}
