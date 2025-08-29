"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, TrendingUp, Loader2, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
interface StockResult {
  symbol: string
  name: string
  exchange?: string
  type?: string
}

interface StockSearchProps {
  placeholder?: string
}

export function StockSearch({ placeholder = "Search stocks..." }: StockSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<StockResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  // Close results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setShowResults(false)
      setError(null)
      return
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(
          `https://portal.tradebrains.in/api/assignment/search?keyword=${encodeURIComponent(query)}&length=10`,
        )

        if (response.ok) {
          const data = await response.json()
          if (data && Array.isArray(data) && data.length > 0) {
            setResults(data)
            setShowResults(true)
          } else {
            setResults([])
            setError(`No results found for "${query}"`)
            setShowResults(true)
          }
        } else {
          console.error("Search API error:", response.status)
          setResults([])
          setError("Search service temporarily unavailable")
          setShowResults(true)
        }
      } catch (error) {
        console.error("Search error:", error)
        setResults([])
        setError("Unable to search. Please check your connection.")
        setShowResults(true)
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  const handleStockSelect = (stock: StockResult) => {
    setQuery("")
    setShowResults(false)
    setError(null)
    router.push(`/stock/${stock.symbol}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (results.length > 0) {
      handleStockSelect(results[0])
    }
  }

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-12 bg-input border-border focus:ring-2 focus:ring-ring transition-all duration-200 hover:border-ring/50"
          onFocus={() => query && setShowResults(true)}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          </div>
        )}
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-80 overflow-y-auto bg-popover border shadow-lg animate-in slide-in-from-top-2 duration-200">
          {error ? (
            <div className="p-4 text-center">
              <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((stock, index) => (
                <Button
                  key={`${stock.symbol}-${index}`}
                  variant="ghost"
                  className="w-full justify-start p-3 h-auto text-left hover:bg-accent hover:text-accent-foreground transition-colors duration-150 group"
                  onClick={() => handleStockSelect(stock)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-150">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{stock.symbol}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {stock.name}
                        {stock.exchange && ` • ${stock.exchange}`}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          ) : null}
        </Card>
      )}
    </div>
  )
}
