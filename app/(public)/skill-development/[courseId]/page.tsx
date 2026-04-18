import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/ui/page-header"
import { demoCourses } from "@/lib/demo-courses"
import { Button } from "@/components/ui/button"
import { Clock, GraduationCap, CheckCircle2 } from "lucide-react"

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const supabase = await createClient()
  const { courseId } = await params

  let course = null

  // Fetch from supabase first
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single()
    
  if (data) {
    course = data
  } else {
    course = demoCourses.find(c => c.id === courseId) || null
  }

  if (!course) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title={course.title}
        description={course.category}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Skill Development", href: "/skill-development" },
          { label: course.title, href: `/skill-development/${course.id}` }
        ]}
      />

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Course Description</h2>
            <p className="text-muted-foreground leading-relaxed">{course.description}</p>
          </div>
          
          <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">What You Will Learn</h2>
            <ul className="space-y-3">
              {[
                "Advanced practical skills in hydrographic surveying",
                "Familiarization with modern surveying equipment",
                "Data processing and analysis techniques",
                "Compliance with IHO standards",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Course Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{course.duration || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{course.category}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <Button className="w-full" size="lg">Enroll Now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
