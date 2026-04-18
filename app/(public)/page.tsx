import { createClient } from "@/lib/supabase/server"
import { HeroSection } from "@/components/home/hero-section"
import { QuickAccessTiles } from "@/components/home/quick-access-tiles"
import { ChiefMessage } from "@/components/home/chief-message"
import { LatestNews } from "@/components/home/latest-news"
import { RecentNotices } from "@/components/home/recent-notices"
import { SearchSection } from "@/components/home/search-section"
import { StatsSection } from "@/components/home/stats-section"
import type { NewsEvent, NoticeToMariners } from "@/lib/types"

// Demo news & events data
const demoNews: NewsEvent[] = [
  {
    id: "demo-news-1",
    title: "BNHOC Completes Hydrographic Survey of Payra Deep Sea Port Channel",
    slug: "payra-port-survey-2026",
    content: null,
    excerpt:
      "Bangladesh Navy Hydrographic and Oceanographic Center has successfully completed a comprehensive hydrographic survey of the Payra Deep Sea Port approach channel, ensuring updated navigational data for safe passage of large vessels.",
    image_url: null,
    event_date: "2026-03-25",
    is_event: false,
    is_published: true,
    published_at: "2026-03-25T10:00:00Z",
    created_at: "2026-03-25T10:00:00Z",
    updated_at: "2026-03-25T10:00:00Z",
  },
  {
    id: "demo-news-2",
    title: "International Hydrography Day 2026 Celebration at BNHOC",
    slug: "ihd-2026-celebration",
    content: null,
    excerpt:
      "BNHOC celebrated World Hydrography Day on 21 June with a seminar on 'Hydrography — Underpinning the Blue Economy'. Distinguished guests from IHO, UKHO, and regional hydrographic offices attended the event.",
    image_url: null,
    event_date: "2026-03-21",
    is_event: true,
    is_published: true,
    published_at: "2026-03-21T06:00:00Z",
    created_at: "2026-03-21T06:00:00Z",
    updated_at: "2026-03-21T06:00:00Z",
  },
  {
    id: "demo-news-3",
    title: "New Electronic Navigational Charts (ENC) Released for Bay of Bengal",
    slug: "new-enc-bay-of-bengal",
    content: null,
    excerpt:
      "BNHOC has released 12 new Electronic Navigational Charts covering the Bay of Bengal shipping lanes in S-101 format, compatible with all ECDIS-equipped vessels for enhanced maritime safety.",
    image_url: null,
    event_date: "2026-03-15",
    is_event: false,
    is_published: true,
    published_at: "2026-03-15T08:00:00Z",
    created_at: "2026-03-15T08:00:00Z",
    updated_at: "2026-03-15T08:00:00Z",
  },
]

// Demo notices to mariners data
const demoNotices: NoticeToMariners[] = [
  {
    id: "demo-notice-1",
    notice_number: "NtM 03/2026",
    title: "Temporary Obstruction — Chittagong Port Outer Anchorage",
    month: 3,
    year: 2026,
    file_url: "#",
    content: null,
    is_archived: false,
    is_published: true,
    download_count: 142,
    created_at: "2026-03-20T00:00:00Z",
    updated_at: "2026-03-20T00:00:00Z",
  },
  {
    id: "demo-notice-2",
    notice_number: "NtM 02/2026",
    title: "Light Characteristic Change — Kutubdia Lighthouse",
    month: 2,
    year: 2026,
    file_url: "#",
    content: null,
    is_archived: false,
    is_published: true,
    download_count: 98,
    created_at: "2026-02-15T00:00:00Z",
    updated_at: "2026-02-15T00:00:00Z",
  },
  {
    id: "demo-notice-3",
    notice_number: "NtM 01/2026",
    title: "Updated Depth Information — Mongla Port Approach Channel",
    month: 1,
    year: 2026,
    file_url: "#",
    content: null,
    is_archived: false,
    is_published: true,
    download_count: 215,
    created_at: "2026-01-10T00:00:00Z",
    updated_at: "2026-01-10T00:00:00Z",
  },
  {
    id: "demo-notice-4",
    notice_number: "NtM 12/2025",
    title: "New Buoyage System — Sandwip Channel",
    month: 12,
    year: 2025,
    file_url: "#",
    content: null,
    is_archived: false,
    is_published: true,
    download_count: 178,
    created_at: "2025-12-05T00:00:00Z",
    updated_at: "2025-12-05T00:00:00Z",
  },
  {
    id: "demo-notice-5",
    notice_number: "NtM 11/2025",
    title: "Wreck Removal Complete — Karnaphuli River Fairway",
    month: 11,
    year: 2025,
    file_url: "#",
    content: null,
    is_archived: false,
    is_published: true,
    download_count: 156,
    created_at: "2025-11-18T00:00:00Z",
    updated_at: "2025-11-18T00:00:00Z",
  },
]

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch latest news/events
  const { data: news } = await supabase
    .from("news_events")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(3)

  // Fetch recent notices to mariners
  const { data: notices } = await supabase
    .from("notices_to_mariners")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(5)

  // Use DB data if available, otherwise fall back to demo data
  const activeNews = news && news.length > 0 ? news : demoNews
  const activeNotices = notices && notices.length > 0 ? notices : demoNotices

  return (
    <div className="flex flex-col">
      <HeroSection />
      <SearchSection />
      <QuickAccessTiles />
      <StatsSection />
      <ChiefMessage />
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <LatestNews news={activeNews} />
          <RecentNotices notices={activeNotices} />
        </div>
      </div>
    </div>
  )
}
