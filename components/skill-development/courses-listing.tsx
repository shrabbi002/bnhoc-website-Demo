"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { GraduationCap, Clock, Download, ChevronRight, ShoppingCart, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import type { Course } from "@/lib/types"

interface CoursesListingProps {
  groupedCourses: Record<string, Course[]>
  showAddToCart?: boolean
}

const categoryDescriptions: Record<string, string> = {
  "Category A": "Advanced hydrographic surveying course recognized by FIG/IHO/ICA International Board",
  "Category B": "Basic hydrographic surveying course for naval and civilian personnel",
  "Survey Recorder": "Training courses for survey recorder positions at various levels",
  Surveyor: "Comprehensive surveyor training programs",
  Customized: "Tailored courses for specific organizational needs",
}

const categoryPrices: Record<string, number> = {
  "Category A": 50000,
  "Category B": 30000,
  "Survey Recorder": 15000,
  Surveyor: 25000,
  Customized: 20000,
}

export function CoursesListing({ groupedCourses, showAddToCart = true }: CoursesListingProps) {
  const categories = Object.keys(groupedCourses)
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())
  const { addItem } = useCart()

  const handleAddToCart = (course: Course) => {
    addItem({
      id: course.id,
      name: course.title,
      type: "course",
      category: course.category,
      price: categoryPrices[course.category] || 20000,
    })
    setAddedIds((prev) => new Set(prev).add(course.id))
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev)
        next.delete(course.id)
        return next
      })
    }, 2000)
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-16">
        <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No courses available</h3>
        <p className="text-muted-foreground">Please check back later for updates.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Training & Capacity Building</h2>
              <p className="mt-2 text-muted-foreground">
                Bangladesh Navy Hydrographic and Oceanographic Center offers internationally recognized hydrographic
                surveying courses. Our training programs are designed to develop skilled professionals for maritime
                surveying and charting operations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Categories */}
      {categories.map((category) => {
        const courses = groupedCourses[category]
        const price = categoryPrices[category] || 20000
        return (
          <div key={category}>
            <div className="mb-4">
              <h3 className="text-xl font-semibold">{category}</h3>
              {categoryDescriptions[category] && (
                <p className="text-sm text-muted-foreground">{categoryDescriptions[category]}</p>
              )}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {courses.map((course) => {
                const isAdded = addedIds.has(course.id)
                return (
                  <Card key={course.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        {/* Image placeholder */}
                         <div className="relative flex aspect-video w-full h-[180px] sm:w-48 sm:h-auto shrink-0 overflow-hidden bg-navy-50">
                          <Image
                            src="/course-banner.png"
                            alt={course.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 192px"
                            priority={true}
                          />
                        </div>
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xl font-bold text-navy-900 leading-tight mb-2 group-hover:text-primary transition-colors">
                              {course.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1.5 font-medium text-navy-600 bg-navy-50 px-2 py-0.5 rounded-md">
                                <GraduationCap className="h-4 w-4" />
                                {category}
                              </div>
                              {course.duration && (
                                <div className="flex items-center gap-1.5">
                                  <Clock className="h-4 w-4" />
                                  {course.duration}
                                </div>
                              )}
                            </div>
                            {course.description && (
                              <p className="mt-4 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                {course.description}
                              </p>
                            )}
                          </div>
                          
                          <div className="mt-6 flex items-center justify-end">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild className="font-semibold border-navy-200 hover:bg-navy-50">
                                <Link href={`/skill-development/${course.id}`}>
                                  View Details
                                </Link>
                              </Button>
                              {showAddToCart && (
                                <Button
                                  size="sm"
                                  onClick={() => handleAddToCart(course)}
                                  className={isAdded ? "bg-emerald-600 hover:bg-emerald-700" : "bg-navy-900 hover:bg-navy-800 text-white"}
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
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
