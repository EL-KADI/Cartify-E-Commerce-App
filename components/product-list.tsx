"use client"

import { useState, useEffect, useRef } from "react"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function ProductList() {
  const searchParams = useSearchParams()
  const memoizedCategory = searchParams.get("category")
  const memoizedSearch = searchParams.get("search")
  const memoizedSort = searchParams.get("sort") || "default"

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [totalProducts, setTotalProducts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const sort = searchParams.get("sort") || "default"

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    setCurrentPage(1)
  }, [memoizedCategory, memoizedSearch, memoizedSort])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        let url = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${(currentPage - 1) * productsPerPage}`

        if (category) {
          url = `https://dummyjson.com/products/category/${category}?limit=${productsPerPage}&skip=${(currentPage - 1) * productsPerPage}`
        }

        if (search) {
          url = `https://dummyjson.com/products/search?q=${search}&limit=${productsPerPage}&skip=${(currentPage - 1) * productsPerPage}`
        }

        if (sort === "price-asc") {
          url += "&sortBy=price&order=asc"
        } else if (sort === "price-desc") {
          url += "&sortBy=price&order=desc"
        } else if (sort === "rating") {
          url += "&sortBy=rating&order=desc"
        }

        console.log("Fetching products from:", url)

        const res = await fetch(url, { cache: "no-store" })
        const data = await res.json()

        setProducts(data.products || [])
        setTotalProducts(data.total || 0)
      } catch (error) {
        console.error("Error fetching products:", error)
        setProducts([])
        setTotalProducts(0)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      fetchProducts()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [category, search, sort, currentPage, productsPerPage])

  const totalPages = Math.ceil(totalProducts / productsPerPage)

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-square bg-muted"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-5 bg-muted rounded w-full mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-muted rounded w-1/3"></div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="h-9 bg-muted rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search or filter to find what you're looking for.
        </p>
        <Button
          onClick={() => {
            window.location.href = "/products"
          }}
        >
          View All Products
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(page)
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
