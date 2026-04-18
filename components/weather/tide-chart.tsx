"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Waves, ArrowUp, ArrowDown, Clock, Calendar } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import type { Location } from "./marine-weather-dashboard"

interface TideData {
  hourly?: {
    time: string[]
    sea_level_height_msl?: number[]
  }
}

interface TideChartProps {
  location: Location
}

export function TideChart({ location }: TideChartProps) {
  const [data, setData] = useState<TideData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTideData() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `https://marine-api.open-meteo.com/v1/marine?latitude=${location.lat}&longitude=${location.lon}&hourly=sea_level_height_msl&timezone=Asia%2FDhaka&forecast_days=7`,
        )

        if (!res.ok) {
          throw new Error("Tide data not available")
        }

        const tideData = await res.json()

        if (tideData.error) {
          throw new Error(tideData.reason || "Failed to fetch tide data")
        }

        setData(tideData)
      } catch (err) {
        console.error("[v0] Tide fetch error:", err)
        setError(err instanceof Error ? err.message : "Failed to load tide data")
      } finally {
        setLoading(false)
      }
    }

    fetchTideData()
  }, [location])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error || !data?.hourly?.sea_level_height_msl) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Waves className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">{error || "Tide data not available for this location"}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Sea level data may not be available for all coastal locations.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Process tide data
  const chartData = data.hourly.time.map((time, index) => ({
    time: new Date(time).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric" }),
    fullTime: time,
    height: data.hourly?.sea_level_height_msl?.[index] ?? 0,
  }))

  // Find high and low tides (local maxima and minima)
  const tideExtremesData: Array<{ time: string; height: number; type: "high" | "low"; fullTime: string }> = []

  for (let i = 1; i < chartData.length - 1; i++) {
    const prev = chartData[i - 1].height
    const curr = chartData[i].height
    const next = chartData[i + 1].height

    if (curr > prev && curr > next) {
      tideExtremesData.push({ ...chartData[i], type: "high" })
    } else if (curr < prev && curr < next) {
      tideExtremesData.push({ ...chartData[i], type: "low" })
    }
  }

  // Get next 4 tide events
  const now = new Date()
  const upcomingTides = tideExtremesData.filter((t) => new Date(t.fullTime) > now).slice(0, 4)

  // Today's chart data (48 hours)
  const todayChartData = chartData.slice(0, 48)

  return (
    <div className="space-y-6">
      {/* Upcoming Tides */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {upcomingTides.map((tide, index) => (
          <Card
            key={index}
            className={tide.type === "high" ? "border-t-4 border-t-blue-500" : "border-t-4 border-t-orange-500"}
          >
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant={tide.type === "high" ? "default" : "secondary"} className="mb-2">
                    {tide.type === "high" ? (
                      <>
                        <ArrowUp className="mr-1 h-3 w-3" /> High Tide
                      </>
                    ) : (
                      <>
                        <ArrowDown className="mr-1 h-3 w-3" /> Low Tide
                      </>
                    )}
                  </Badge>
                  <div className="text-2xl font-bold">{tide.height.toFixed(2)} m</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {new Date(tide.fullTime).toLocaleString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div
                  className={`rounded-full p-2 ${tide.type === "high" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"}`}
                >
                  {tide.type === "high" ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tide Level Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Waves className="h-5 w-5" />
            48-Hour Tide Forecast
          </CardTitle>
          <CardDescription>Sea level height above geoid at {location.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={todayChartData}>
                <defs>
                  <linearGradient id="tideGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} interval="preserveStartEnd" tickMargin={10} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value.toFixed(1)}m`}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value.toFixed(2)} m`, "Sea Level"]}
                />
                <ReferenceLine y={0} stroke="#64748b" strokeDasharray="3 3" />
                <Area type="monotone" dataKey="height" stroke="#0ea5e9" fill="url(#tideGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Tide Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            7-Day Tide Schedule
          </CardTitle>
          <CardDescription>All high and low tides for the upcoming week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-background">
                <tr className="border-b">
                  <th className="pb-3 text-left font-medium text-muted-foreground">Date</th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">Time</th>
                  <th className="pb-3 text-left font-medium text-muted-foreground">Type</th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">Height</th>
                </tr>
              </thead>
              <tbody>
                {tideExtremesData.slice(0, 28).map((tide, index) => (
                  <tr key={index} className="border-b border-muted/50">
                    <td className="py-3">
                      {new Date(tide.fullTime).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {new Date(tide.fullTime).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge variant={tide.type === "high" ? "default" : "outline"}>
                        {tide.type === "high" ? "High" : "Low"}
                      </Badge>
                    </td>
                    <td className="py-3 text-right font-medium">{tide.height.toFixed(2)} m</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
