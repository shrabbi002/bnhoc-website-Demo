"use client"

import type React from "react"
import { useState } from "react"
import { BookOpen, Download, Eye, Lightbulb, Compass, Radio, Ship, Calendar, ShoppingCart, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { Publication } from "@/lib/types"

interface PublicationsListingProps {
  groupedPublications: Record<string, Publication[]>
}

const categoryInfo: Record<string, { label: string; icon: React.ElementType; description: string; price: number }> = {
  list_of_lights: {
    label: "List of Lights",
    icon: Lightbulb,
    description: "Comprehensive list of lighthouses and navigation lights",
    price: 1500,
  },
  sailing_directions: {
    label: "Sailing Directions",
    icon: Compass,
    description: "Detailed sailing directions for Bangladesh waters",
    price: 2000,
  },
  radio_signals: {
    label: "Radio Signals",
    icon: Radio,
    description: "Maritime radio signals and communications guide",
    price: 1200,
  },
  pilot_books: {
    label: "Pilot Books",
    icon: Ship,
    description: "Port and harbor pilotage information",
    price: 1800,
  },
  annual_summaries: {
    label: "Annual Summaries",
    icon: Calendar,
    description: "Annual compilation of notices and corrections",
    price: 1000,
  },
  other: {
    label: "Other Publications",
    icon: BookOpen,
    description: "Additional navigational publications",
    price: 800,
  },
}

export function PublicationsListing({ groupedPublications }: PublicationsListingProps) {
  const categories = Object.keys(categoryInfo)
  const hasPublications = Object.keys(groupedPublications).length > 0
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())
  const { addItem } = useCart()

  const handleAddToCart = (pub: Publication, category: string) => {
    const info = categoryInfo[category]
    addItem({
      id: pub.id,
      name: pub.title,
      type: "publication",
      category: info?.label || "Publication",
      price: info?.price || 1000,
    })
    setAddedIds((prev) => new Set(prev).add(pub.id))
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev)
        next.delete(pub.id)
        return next
      })
    }, 2000)
  }

  if (!hasPublications) {
    return (
      <div className="text-center py-16">
        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No publications available</h3>
        <p className="text-muted-foreground">Please check back later for updates.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const publications = groupedPublications[category]
        if (!publications || publications.length === 0) return null

        const info = categoryInfo[category]
        const Icon = info.icon

        return (
          <Card key={category}>
            <CardHeader className="bg-muted/50">
              <CardTitle className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span>{info.label}</span>
                  <p className="text-sm font-normal text-muted-foreground">{info.description}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {publications.map((pub) => {
                  const isAdded = addedIds.has(pub.id)
                  return (
                    <div key={pub.id} className="flex items-center justify-between p-4 transition-colors hover:bg-muted/30">
                      <div className="flex-1 min-w-0 mr-4">
                        <h3 className="font-medium">{pub.title}</h3>
                        {pub.description && <p className="text-sm text-muted-foreground">{pub.description}</p>}
                        <span className="text-sm font-semibold text-primary mt-1 inline-block">
                          ৳{(info.price).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {pub.preview_allowed && pub.file_url && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={pub.file_url} target="_blank" rel="noopener noreferrer">
                              <Eye className="mr-1 h-4 w-4" />
                              Preview
                            </a>
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(pub, category)}
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
        )
      })}
    </div>
  )
}
