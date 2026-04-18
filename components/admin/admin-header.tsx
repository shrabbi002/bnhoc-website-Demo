"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Menu, Bell, LogOut, User, Settings, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import Link from "next/link"

interface AdminHeaderProps {
  user: { id: string; email: string }
  profile: { id: string; full_name: string; role: string; email: string } | null
}

export function AdminHeader({ user, profile }: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("demo_session")
    router.push("/auth/login")
  }

  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email?.charAt(0).toUpperCase() || "U"

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 lg:px-6">
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center border-b px-4">
              <Link href="/admin" className="flex items-center gap-3">
                <Image
                  src="/images/navy-logo.png"
                  alt="BNHOC Logo"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold leading-tight">BNHOC</span>
                  <span className="text-xs text-muted-foreground">Admin Panel</span>
                </div>
              </Link>
            </div>
            <nav className="flex-1 space-y-2 p-4">
              {[
                { title: "Dashboard", href: "/admin" },
                { title: "Charts", href: "/admin/charts" },
                { title: "Tide Tables", href: "/admin/tide-tables" },
                { title: "Notices", href: "/admin/notices" },
                { title: "Publications", href: "/admin/publications" },
                { title: "News & Events", href: "/admin/news" },
                { title: "Settings", href: "/admin/settings" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="border-t p-4">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Globe className="h-4 w-4" />
                View Website
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Title - shows on mobile */}
      <h1 className="text-lg font-semibold lg:hidden">Admin Panel</h1>

      {/* Spacer for desktop */}
      <div className="hidden lg:block" />

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
          <span className="sr-only">Notifications</span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start text-left md:flex">
                <span className="text-sm font-medium">{profile?.full_name || user.email}</span>
                <Badge variant="secondary" className="text-xs capitalize">
                  {profile?.role || "User"}
                </Badge>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{profile?.full_name || "User"}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
