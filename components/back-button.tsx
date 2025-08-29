"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
  const router = useRouter()

  return (
   <Button
  variant="ghost"
  size="sm"
  onClick={() => router.back()}
  className="text-white bg-green-800 hover:bg-green-800 hover:text-white px-3 py-2 rounded transition-transform duration-150 hover:scale-105"
>
  <ArrowLeft className="h-4 w-4 mr-2" />
  Back
</Button>
  )
}
