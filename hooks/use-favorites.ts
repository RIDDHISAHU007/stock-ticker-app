"use client"

import { useState, useEffect } from "react"

interface FavoriteStock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteStock[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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

  const addFavorite = (stock: FavoriteStock) => {
    const updatedFavorites = [...favorites.filter((f) => f.symbol !== stock.symbol), stock]
    setFavorites(updatedFavorites)
    localStorage.setItem("stockFavorites", JSON.stringify(updatedFavorites))
  }

  const removeFavorite = (symbol: string) => {
    const updatedFavorites = favorites.filter((stock) => stock.symbol !== symbol)
    setFavorites(updatedFavorites)
    localStorage.setItem("stockFavorites", JSON.stringify(updatedFavorites))
  }

  const isFavorite = (symbol: string) => {
    return favorites.some((stock) => stock.symbol === symbol)
  }

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
  }
}
