import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Map, FileText, Anchor } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-navy-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Wave Pattern Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>

      <div className="container relative mx-auto px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="text-center lg:text-left animate-in fade-in slide-in-from-left duration-1000 ease-out">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-navy-700/50 px-4 py-2 text-sm text-gold-400 border border-gold-400/20">
              <Anchor className="h-4 w-4" />
              <span>Official Government Portal</span>
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Bangladesh Navy
              <span className="mt-2 block text-gold-400">Hydrographic & Oceanographic Center</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-primary-foreground/80 lg:mx-0">
              Charting the waters of Bangladesh for safe maritime navigation. Access official nautical charts, tide
              tables, and navigational publications.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
              <Link href="/products/charts">
                <Button size="lg" className="w-full bg-gold-500 text-navy-900 hover:bg-gold-400 sm:w-auto">
                  <Map className="mr-2 h-5 w-5" />
                  Browse Charts
                </Button>
              </Link>
              <Link href="/products/notices">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto bg-transparent"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Latest Notices
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square">
              {/* Compass Rose Design */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-80 w-80">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-gold-400/30" />
                  <div className="absolute inset-4 rounded-full border-2 border-gold-400/20" />
                  {/* Cardinal directions */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-full w-full">
                      <span className="absolute left-1/2 top-4 -translate-x-1/2 text-2xl font-bold text-gold-400">
                        N
                      </span>
                      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-2xl font-bold text-gold-400/60">
                        S
                      </span>
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gold-400/60">
                        W
                      </span>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gold-400/60">
                        E
                      </span>
                    </div>
                  </div>
                  {/* Center anchor */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-navy-700 shadow-lg">
                      <Anchor className="h-12 w-12 text-gold-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
