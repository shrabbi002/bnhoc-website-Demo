"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, Search, Map, FileText, BookOpen, GraduationCap, Phone, Anchor } from "lucide-react"
import { CartDrawer } from "@/components/layout/cart-drawer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const productsServices = [
  {
    title: "Paper Charts",
    href: "/products/charts?type=paper",
    description: "Official nautical paper charts for Bangladesh waters",
    icon: Map,
  },
  {
    title: "Electronic Charts (ENC)",
    href: "/products/charts?type=enc",
    description: "Electronic Navigational Charts in S-57/S-101 format",
    icon: Map,
  },
  {
    title: "Tide Tables",
    href: "/products/tide-tables",
    description: "Annual tide predictions for all major ports",
    icon: Anchor,
  },
  {
    title: "Notices to Mariners",
    href: "/products/notices",
    description: "Monthly navigational warnings and corrections",
    icon: FileText,
  },
  {
    title: "GIS Chart Explorer",
    href: "/products/gis-explorer",
    description: "Interactive map-based chart exploration",
    icon: Map,
  },
  {
    title: "Publications",
    href: "/products/publications",
    description: "Sailing directions, list of lights, and more",
    icon: BookOpen,
  },
]

const aboutLinks = [
  { title: "History", href: "/about/history", description: "Our journey since establishment" },
  { title: "Vision & Mission", href: "/about/vision-mission", description: "Our goals and objectives" },
  { title: "Organization", href: "/about/organization", description: "Organizational structure" },
  { title: "Survey Ships", href: "/about/survey-ships", description: "Our fleet of survey vessels" },
  { title: "Gallery", href: "/about/gallery", description: "Photos and videos" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isPathActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  const navItemClasses = (active: boolean) =>
    cn(
      "group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
      active
        ? "bg-[#008080] text-white shadow-md hover:bg-[#006666] hover:text-white data-[state=open]:bg-[#006666] data-[state=open]:text-white"
        : "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50",
    )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="bg-navy-900 text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Welcome to BNHOC</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="hover:text-gold-400 transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/navy-logo.png"
              alt="Bangladesh Navy Logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <div className="hidden flex-col sm:flex">
              <span className="text-sm font-bold leading-tight text-navy-900">Bangladesh Navy</span>
              <span className="text-xs text-muted-foreground">Hydrographic & Oceanographic Center</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className={navItemClasses(isPathActive("/"))}>
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={navItemClasses(isPathActive("/products"))}>
                  Products & Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                    {productsServices.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="flex select-none items-start gap-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <item.icon className="mt-0.5 h-5 w-5 text-primary" />
                            <div>
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                              <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={navItemClasses(isPathActive("/about"))}>
                  About Us
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {aboutLinks.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/skill-development" className={navItemClasses(isPathActive("/skill-development"))}>
                    <GraduationCap className={cn("mr-2 h-4 w-4", !isPathActive("/skill-development") && "text-muted-foreground")} />
                    Skill Development
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/contact" className={navItemClasses(isPathActive("/contact"))}>
                    <Phone className={cn("mr-2 h-4 w-4", !isPathActive("/contact") && "text-muted-foreground")} />
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Shopping Cart */}
            <CartDrawer />

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="flex items-center gap-3 py-2 text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>

                  <div className="space-y-2">
                    <h4 className="font-medium text-muted-foreground">Products & Services</h4>
                    {productsServices.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="flex items-center gap-2 py-1.5 text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-muted-foreground">About Us</h4>
                    {aboutLinks.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="block py-1.5 text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/skill-development"
                    className="flex items-center gap-2 py-2 text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <GraduationCap className="h-5 w-5" />
                    Skill Development
                  </Link>

                  <Link
                    href="/contact"
                    className="flex items-center gap-2 py-2 text-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Phone className="h-5 w-5" />
                    Contact
                  </Link>

                  <div className="mt-4 border-t pt-4">
                    <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">Admin Login</Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
