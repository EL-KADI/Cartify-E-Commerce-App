"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get("category"))
  const [selectedSort, setSelectedSort] = useState(searchParams.get("sort") || "default")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const isUpdatingFilters = useRef(false)

  useEffect(() => {
    if (isUpdatingFilters.current) {
      isUpdatingFilters.current = false
      return
    }

    if (categories.length === 0) {
      const fetchCategories = async () => {
        setIsLoading(true)
        try {
          const res = await fetch("https://dummyjson.com/products/category-list")
          if (!res.ok) throw new Error("Failed to fetch categories")
          const data = await res.json()

          if (Array.isArray(data)) {
            setCategories(data)
          } else {
            console.error("Categories API did not return an array:", data)
            setCategories([
              "smartphones",
              "laptops",
              "fragrances",
              "skincare",
              "groceries",
              "home-decoration",
              "furniture",
              "tops",
            ])
          }
        } catch (error) {
          console.error("Error fetching categories:", error)
          setCategories([
            "smartphones",
            "laptops",
            "fragrances",
            "skincare",
            "groceries",
            "home-decoration",
            "furniture",
            "tops",
          ])
        } finally {
          setIsLoading(false)
        }
      }
      fetchCategories()
    }

    const categoryParam = searchParams.get("category")
    const searchParam = searchParams.get("search")
    const sortParam = searchParams.get("sort") || "default"

    const newFilters: string[] = []
    if (categoryParam) {
      newFilters.push(`Category: ${formatCategoryName(categoryParam)}`)
    }
    if (searchParam) {
      newFilters.push(`Search: ${searchParam}`)
    }

    if (JSON.stringify(newFilters) !== JSON.stringify(activeFilters)) {
      setActiveFilters(newFilters)
    }

    if (categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam)
    }

    if (sortParam !== selectedSort) {
      setSelectedSort(sortParam)
    }
  }, [searchParams, categories.length, activeFilters, selectedCategory, selectedSort])

  const formatCategoryName = (category: string | null) => {
    if (!category || typeof category !== "string") {
      return "Unknown"
    }

    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const handleCategoryChange = (category: string) => {
    isUpdatingFilters.current = true

    setSelectedCategory(category)

    const params = new URLSearchParams(searchParams.toString())
    params.set("category", category)
    router.push(`/products?${params.toString()}`)
  }

  const handleSortChange = (value: string) => {
    isUpdatingFilters.current = true

    setSelectedSort(value)

    const params = new URLSearchParams(searchParams.toString())
    if (value === "default") {
      params.delete("sort")
    } else {
      params.set("sort", value)
    }
    router.push(`/products?${params.toString()}`)
  }

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
  }

  const handlePriceApply = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    router.push(`/products?${params.toString()}`)
  }

  const handleRemoveFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (filter.startsWith("Category:")) {
      params.delete("category")
      setSelectedCategory(null)
    } else if (filter.startsWith("Search:")) {
      params.delete("search")
    }

    router.push(`/products?${params.toString()}`)
  }

  const handleClearAllFilters = () => {
    router.push("/products")
    setSelectedCategory(null)
    setSelectedSort("default")
    setPriceRange([0, 2000])
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        {activeFilters.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Active Filters</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                onClick={handleClearAllFilters}
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <button onClick={() => handleRemoveFilter(filter)} className="ml-1 rounded-full hover:bg-muted">
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <Label htmlFor="sort" className="text-sm">
            Sort By
          </Label>
          <Select value={selectedSort} onValueChange={handleSortChange}>
            <SelectTrigger id="sort" className="mt-1">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Relevance</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Customer Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price"]}>
        <AccordionItem value="categories">
          <AccordionTrigger className="text-base font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            {isLoading ? (
              <div className="py-4 text-center text-sm text-muted-foreground">Loading categories...</div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <button
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors w-full text-left py-1"
                      onClick={() => handleCategoryChange(category)}
                    >
                      <div className="w-4 h-4 border rounded-sm flex items-center justify-center">
                        {selectedCategory === category && <Check size={12} />}
                      </div>
                      {formatCategoryName(category)}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 2000]}
                max={2000}
                step={10}
                value={priceRange}
                onValueChange={handlePriceChange}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                    className="w-20 h-8"
                  />
                </div>
                <span className="text-sm">to</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-20 h-8"
                  />
                </div>
              </div>

              <Button size="sm" className="w-full" onClick={handlePriceApply}>
                Apply
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
