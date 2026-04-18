"use client"

import type React from "react"
import { useState } from "react"
import { Search, Map, Waves, FileWarning, BookOpen, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const previewData = {
  charts: [
    { title: "BA Chart 717", subtitle: "Chittagong Port Approach", href: "/products/charts/717" },
    { title: "BA Chart 721", subtitle: "Bay of Bengal Central", href: "/products/charts/721" },
  ],
  tides: [
    { title: "Chittagong", subtitle: "Next High: 14:30 (4.2m)", href: "/products/tide-tables" },
    { title: "Mongla", subtitle: "Next High: 15:15 (3.8m)", href: "/products/tide-tables" },
  ],
  notices: [
    { title: "NtM 03/2026", subtitle: "Temporary Obstruction", href: "/products/notices" },
    { title: "NtM 02/2026", subtitle: "Light Characteristic Change", href: "/products/notices" },
  ],
  publications: [
    { title: "Sailing Directions", subtitle: "Volume 1, Edition 2026", href: "/products/publications" },
    { title: "Tide Tables 2026", subtitle: "Annual Edition", href: "/products/publications" },
  ],
}

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("all")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&type=${searchType}`)
    }
  }

  const currentPreview = searchType !== "all" ? previewData[searchType as keyof typeof previewData] : null

  return (
    <section className="bg-secondary/50 py-12 transition-all duration-500">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-navy-900">Find Maritime Resources</h2>
            <p className="text-muted-foreground">Search our comprehensive database of charts, notices, and data</p>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="flex justify-center">
              <Tabs value={searchType} onValueChange={setSearchType} className="w-full max-w-2xl">
                <TabsList className="grid w-full grid-cols-5 bg-navy-800/5 p-1 h-12 rounded-full">
                  <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">All</TabsTrigger>
                  <TabsTrigger value="charts" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Charts</TabsTrigger>
                  <TabsTrigger value="tides" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Tides</TabsTrigger>
                  <TabsTrigger value="notices" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Notices</TabsTrigger>
                  <TabsTrigger value="publications" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Pubs</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={`Search ${searchType === "all" ? "everything" : searchType}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-12 pr-4 text-base rounded-2xl border-navy-200/50 bg-white/80 backdrop-blur-sm focus:ring-navy-500/20"
                />
              </div>
              <Button type="submit" size="lg" className="h-14 px-8 rounded-2xl bg-navy-900 hover:bg-navy-800 text-white font-semibold">
                Search
              </Button>
            </div>
          </form>

          {/* Dynamic Content Container */}
          {currentPreview && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
              {currentPreview.map((item, idx) => (
                <Link key={idx} href={item.href}>
                  <Card className="group hover:border-navy-400/50 transition-all bg-white/50 backdrop-blur-sm">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-navy-100 text-navy-600 group-hover:bg-navy-600 group-hover:text-white transition-colors">
                          {searchType === "charts" && <Map className="h-5 w-5" />}
                          {searchType === "tides" && <Waves className="h-5 w-5" />}
                          {searchType === "notices" && <FileWarning className="h-5 w-5" />}
                          {searchType === "publications" && <BookOpen className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-semibold text-navy-900">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
