"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { Suspense } from "react"
import ProductList from "@/components/product-list"
import ProductFilters from "@/components/product-filters"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const paramsKey = searchParams.toString()

  useEffect(() => {}, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0">
          <ProductFilters key={`filters-${paramsKey}`} />
        </div>

        <div className="flex-1">
          <Suspense fallback={<ProductsSkeleton />}>
            <ProductList key={`list-${paramsKey}`} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
    </div>
  )
}
