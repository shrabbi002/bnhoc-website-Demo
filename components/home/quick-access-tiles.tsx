import Link from "next/link"
import { Map, Waves, FileWarning, BookOpen, Navigation, CloudSun, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const tiles = [
  {
    title: "Paper Charts",
    description: "Official nautical charts for Bangladesh waters",
    href: "/products/charts?type=paper",
    icon: Map,
  },
  {
    title: "Electronic Charts",
    description: "ENC in S-57/S-101 format",
    href: "/products/charts?type=enc",
    icon: Navigation,
  },
  {
    title: "Tide Tables",
    description: "Annual tide predictions",
    href: "/products/tide-tables",
    icon: Waves,
  },
  {
    title: "Notices to Mariners",
    description: "Navigation warnings & corrections",
    href: "/products/notices",
    icon: FileWarning,
  },
  {
    title: "Publications",
    description: "Sailing directions & guides",
    href: "/products/publications",
    icon: BookOpen,
  },
  {
    title: "Marine Weather",
    description: "Weather & astronomical info",
    href: "/marine-weather",
    icon: CloudSun,
  },
]

export function QuickAccessTiles() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">Quick Access</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Access our most popular products and services with a single click
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => (
            <Link key={tile.title} href={tile.href} className="group">
              <Card className="h-full border-navy-100 transition-all duration-300 hover:border-navy-400 hover:shadow-md hover:-translate-y-1 overflow-hidden">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-600 text-white transition-all group-hover:bg-navy-700 group-hover:scale-105">
                    <tile.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-navy-900 truncate group-hover:text-primary transition-colors">
                      {tile.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{tile.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
