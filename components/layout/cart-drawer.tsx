"use client"

import { useState } from "react"
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  Map,
  BookOpen,
  Waves,
  FileWarning,
  GraduationCap,
  Package,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCart, type CartItem } from "@/lib/cart-context"

const typeIcons: Record<CartItem["type"], React.ElementType> = {
  chart: Map,
  publication: BookOpen,
  tide_table: Waves,
  notice: FileWarning,
  course: GraduationCap,
}

const typeLabels: Record<CartItem["type"], string> = {
  chart: "Chart",
  publication: "Publication",
  tide_table: "Tide Table",
  notice: "Notice",
  course: "Course",
}

const typeColors: Record<CartItem["type"], string> = {
  chart: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  publication: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
  tide_table: "from-teal-500/20 to-emerald-500/20 border-teal-500/30",
  notice: "from-rose-500/20 to-pink-500/20 border-rose-500/30",
  course: "from-violet-500/20 to-purple-500/20 border-violet-500/30",
}

const typeIconColors: Record<CartItem["type"], string> = {
  chart: "text-blue-600 bg-blue-100",
  publication: "text-amber-600 bg-amber-100",
  tide_table: "text-teal-600 bg-teal-100",
  notice: "text-rose-600 bg-rose-100",
  course: "text-violet-600 bg-violet-100",
}

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart()
  const [removingId, setRemovingId] = useState<string | null>(null)

  const handleRemove = (id: string) => {
    setRemovingId(id)
    setTimeout(() => {
      removeItem(id)
      setRemovingId(null)
    }, 300)
  }



  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative group"
          id="cart-button"
        >
          <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
          {totalItems > 0 && (
            <span
              className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-1 text-[10px] font-bold text-white shadow-lg shadow-blue-500/30"
              style={{
                animation: "cartBadgePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
          <span className="sr-only">Shopping Cart</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-[420px] border-l-0 shadow-2xl"
      >
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d] via-[#1e3a5f] to-[#0f2847]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cuczMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaC00djFoNHYtMXptLTQgMGgtNHYxaDR2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
          <SheetHeader className="relative z-10 px-5 pt-5 pb-4">
            <SheetTitle className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                  <ShoppingCart className="h-4.5 w-4.5 text-white" />
                </div>
                <div>
                  <span className="text-base font-semibold">Shopping Cart</span>
                  {totalItems > 0 && (
                    <p className="text-xs font-normal text-blue-200">
                      {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
                    </p>
                  )}
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>


        </div>

        {/* Cart Content */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-50">
                <Package className="h-10 w-10 text-slate-300" />
              </div>
              <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                <ShoppingCart className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Your cart is empty
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-[250px] mx-auto">
                Explore our nautical charts, publications, and training courses
                to get started.
              </p>
            </div>
            <Button
              onClick={() => setIsCartOpen(false)}
              className="bg-gradient-to-r from-[#1a365d] to-[#1e3a5f] hover:from-[#1e3a5f] hover:to-[#234876] text-white shadow-md"
            >
              Browse Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <ScrollArea className="flex-1">
              <div className="space-y-3 px-4 py-4">
                {items.map((item) => {
                  const Icon = typeIcons[item.type]
                  const isRemoving = removingId === item.id
                  return (
                    <div
                      key={item.id}
                      className={`group relative overflow-hidden rounded-xl border bg-gradient-to-r ${
                        typeColors[item.type]
                      } p-3.5 transition-all duration-300 hover:shadow-md ${
                        isRemoving
                          ? "scale-95 opacity-0 translate-x-8"
                          : "scale-100 opacity-100 translate-x-0"
                      }`}
                    >
                      {/* Remove button */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-muted-foreground opacity-0 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>

                      <div className="flex gap-3">
                        {/* Icon */}
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${typeIconColors[item.type]} transition-transform group-hover:scale-105`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 pr-5">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span
                              className="inline-block rounded-md bg-white/60 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
                            >
                              {typeLabels[item.type]}
                            </span>
                          </div>
                          <h4 className="text-sm font-medium leading-snug text-foreground line-clamp-2">
                            {item.name}
                          </h4>
                          {item.category && (
                            <p className="mt-0.5 text-[11px] text-muted-foreground truncate">
                              {item.category}
                            </p>
                          )}

                          {/* Quantity & Price Row */}
                          <div className="mt-2.5 flex items-center justify-between">
                            <div className="flex items-center rounded-lg border border-border/50 bg-white/70 shadow-sm">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-l-lg text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground active:scale-95"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="flex h-7 w-8 items-center justify-center border-x border-border/50 text-xs font-semibold tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-r-lg text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground active:scale-95"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-bold text-foreground">
                                ৳{(item.price * item.quantity).toLocaleString()}
                              </span>
                              {item.quantity > 1 && (
                                <p className="text-[10px] text-muted-foreground">
                                  ৳{item.price.toLocaleString()} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t bg-gradient-to-b from-slate-50/80 to-white">
              {/* Order Summary */}
              <div className="px-5 pt-4 pb-2 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})
                  </span>
                  <span className="font-medium">
                    ৳{totalPrice.toLocaleString()}
                  </span>
                </div>

                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold">Total</span>
                  <span className="text-lg font-bold bg-gradient-to-r from-[#1a365d] to-[#2d5186] bg-clip-text text-transparent">
                    ৳{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="px-5 pb-3">
                <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                    Secure Checkout
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 pb-5 space-y-2">
                <Button
                  className="w-full h-11 bg-gradient-to-r from-[#1a365d] via-[#1e3a5f] to-[#1a365d] hover:from-[#1e3a5f] hover:via-[#234876] hover:to-[#1e3a5f] text-white font-semibold shadow-lg shadow-blue-900/20 transition-all hover:shadow-xl hover:shadow-blue-900/30 active:scale-[0.98]"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 text-xs h-9"
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 h-9"
                  >
                    <Trash2 className="mr-1 h-3.5 w-3.5" />
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>

      <style jsx global>{`
        @keyframes cartBadgePop {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </Sheet>
  )
}
