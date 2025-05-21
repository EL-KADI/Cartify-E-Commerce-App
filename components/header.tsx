"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Search, Menu, Heart, Sun, Moon, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { useCart } from "@/hooks/use-cart"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { cart } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const toggleDarkMode = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={20} />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4 border-b">
                    <Link
                      href="/"
                      className="flex items-center gap-2 font-bold text-xl"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Package size={24} />
                      Cartify
                    </Link>
                  </div>

                  <nav className="flex flex-col gap-1 py-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`px-4 py-2 rounded-md ${
                          pathname === item.path ? "bg-muted font-medium" : "hover:bg-muted/50"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2 font-bold text-xl ml-2 md:ml-0">
              <Package size={24} />
              Cartify
            </Link>

            <nav className="hidden md:flex items-center ml-8 space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm ${
                    pathname === item.path ? "font-medium" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search size={20} />
                  <span className="sr-only">Search</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-[250px]">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between py-4 border-b">
                    <h2 className="text-lg font-semibold">Search Products</h2>
                  </div>

                  <div className="flex-1 py-8">
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search for products..."
                          className="pl-10 pr-12"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          ref={searchInputRef}
                          autoFocus
                        />
                        <Button
                          type="submit"
                          size="sm"
                          variant="ghost"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                        >
                          <Search size={16} />
                        </Button>
                      </div>
                      <div className="mt-4 flex justify-center">
                        <Button type="submit">Search</Button>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">
                          Popular searches: smartphone, laptop, watch, headphones
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart size={20} />
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                    {totalItems}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            {mounted && (
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} aria-label="Toggle theme">
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
