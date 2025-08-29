import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full p-6 text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Stock Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The stock symbol you're looking for doesn't exist or couldn't be found in our database.
        </p>
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            Try searching for a different stock symbol or check the spelling.
          </p>
        </div>
      </Card>
    </div>
  )
}
