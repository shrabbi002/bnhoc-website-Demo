"use client"

import { useState } from "react"
import { Waves, Download, Calendar, ShoppingCart, Check, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { TideTable } from "@/lib/types"

interface TideTablesListingProps {
  groupedTables: Record<number, TideTable[]>
}

const TIDE_TABLE_PRICE = 1500

export function TideTablesListing({ groupedTables }: TideTablesListingProps) {
  const years = Object.keys(groupedTables)
    .map(Number)
    .sort((a, b) => b - a)
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())
  const { addItem } = useCart()

  const handleAddToCart = (table: TideTable) => {
    addItem({
      id: table.id,
      name: table.title,
      type: "tide_table",
      category: `Station: ${table.station}`,
      price: TIDE_TABLE_PRICE,
    })
    setAddedIds((prev) => new Set(prev).add(table.id))
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev)
        next.delete(table.id)
        return next
      })
    }, 2000)
  }

  if (years.length === 0) {
    return (
      <div className="text-center py-16">
        <Waves className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No tide tables available</h3>
        <p className="text-muted-foreground">Please check back later for updates.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {years.map((year) => (
        <Card key={year}>
          <CardHeader className="bg-muted/50">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {year} Tide Tables
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {groupedTables[year].map((table) => {
                const isAdded = addedIds.has(table.id)
                return (
                  <div key={table.id} className="flex items-center justify-between p-4 transition-colors hover:bg-muted/30">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Waves className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{table.title}</h3>
                        <p className="text-sm text-muted-foreground">Station: {table.station}</p>
                        <span className="text-sm font-semibold text-primary">
                          ৳{TIDE_TABLE_PRICE.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {table.file_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={table.file_url} target="_blank" rel="noopener noreferrer">
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </a>
                        </Button>
                      )}
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(table)}
                        className={isAdded ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                      >
                        {isAdded ? (
                          <>
                            <Check className="mr-1 h-4 w-4" />
                            Added!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="mr-1 h-4 w-4" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
