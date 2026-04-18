"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileWarning, Download, Calendar, ShoppingCart, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/lib/cart-context"
import type { NoticeToMariners } from "@/lib/types"

interface NoticesListingProps {
  notices: NoticeToMariners[]
  years: number[]
  currentYear?: string
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const NOTICE_PRICE = 500

export function NoticesListing({ notices, years, currentYear }: NoticesListingProps) {
  const router = useRouter()
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())
  const { addItem } = useCart()

  const handleYearChange = (year: string) => {
    if (year === "all") {
      router.push("/products/notices")
    } else {
      router.push(`/products/notices?year=${year}`)
    }
  }

  const handleAddToCart = (notice: NoticeToMariners) => {
    addItem({
      id: notice.id,
      name: notice.title,
      type: "notice",
      category: `${monthNames[notice.month - 1]} ${notice.year}`,
      price: NOTICE_PRICE,
    })
    setAddedIds((prev) => new Set(prev).add(notice.id))
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev)
        next.delete(notice.id)
        return next
      })
    }, 2000)
  }

  if (notices.length === 0) {
    return (
      <div className="text-center py-16">
        <FileWarning className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No notices available</h3>
        <p className="text-muted-foreground">Please check back later for updates.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Year Filter */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Filter by Year:</span>
        <Select value={currentYear || "all"} onValueChange={handleYearChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Years" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Notices Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notices.map((notice) => {
          const isAdded = addedIds.has(notice.id)
          return (
            <Card key={notice.id} className={`transition-all hover:shadow-lg ${notice.is_archived ? "opacity-60" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <FileWarning className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{notice.notice_number}</Badge>
                      {notice.is_archived && <Badge variant="secondary">Archived</Badge>}
                    </div>
                    <h3 className="mt-2 font-medium leading-tight">{notice.title}</h3>
                    <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {monthNames[notice.month - 1]} {notice.year}
                    </div>
                    <div className="mt-1">
                      <span className="text-sm font-semibold text-primary">৳{NOTICE_PRICE.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    className={`w-full ${isAdded ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                    onClick={() => handleAddToCart(notice)}
                  >
                    {isAdded ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
