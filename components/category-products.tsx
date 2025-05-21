"use client"

import { useState, useEffect } from "react"
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
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface CategoryProductsProps {
  category: string
}

export default function CategoryProducts({ category }: CategoryProductsProps) {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [totalProducts, setTotalProducts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const url = `https://dummyjson.com/products/category/${category}?limit=${productsPerPage}&skip=${
          (currentPage - 1) * productsPerPage
        }`

        console.log("Fetching category products from:", url)

        const res = await fetch(url, { cache: "no-store" })
        const data = await res.json()

        setProducts(data.products || [])
        setTotalProducts(data.total || 0)
      } catch (error) {
        console.error(`Error fetching products for category ${category}:`, error)
        setProducts([])
        setTotalProducts(0)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, currentPage, productsPerPage])

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
        <h3 className="text-xl font-medium mb-2">No products found in this category</h3>
        <p className="text-muted-foreground mb-6">Try browsing other categories or search for specific products.</p>
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
