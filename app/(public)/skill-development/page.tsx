import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/ui/page-header"
import { CoursesListing } from "@/components/skill-development/courses-listing"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"
import type { Course } from "@/lib/types"

export const metadata: Metadata = {
  title: "Skill Development",
  description: "Hydrographic surveying courses and training programs offered by BNHOC",
}

export const revalidate = 3600 // Revalidate every hour

import { demoCourses } from "@/lib/demo-courses"

export default async function SkillDevelopmentPage() {
  const supabase = await createClient()

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("display_order")
    .order("title")

  // Use DB courses if available, otherwise fall back to demo data
  const activeCourses = courses && courses.length > 0 ? courses : demoCourses

  // Group by category
  const groupedCourses = activeCourses.reduce(
    (acc, course) => {
      if (!acc[course.category]) {
        acc[course.category] = []
      }
      acc[course.category].push(course)
      return acc
    },
    {} as Record<string, Course[]>,
  )

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <PageHeader
        title="Skill Development Programs"
        description="Advance Your Career in Hydrography"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Skill Development", href: "/skill-development" },
        ]}
      >
        <div className="flex gap-3">
          <Button asChild>
            <Link href="#explore">Explore Courses</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Apply Now</Link>
          </Button>
        </div>
      </PageHeader>

      <div id="explore" className="scroll-mt-20">
        <CoursesListing groupedCourses={groupedCourses || {}} showAddToCart={false} />
      </div>
    </div>
  )
}
