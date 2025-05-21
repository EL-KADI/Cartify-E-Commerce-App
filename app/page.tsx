import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import FeaturedProducts from "@/components/featured-products"
import CategoryList from "@/components/category-list"
import HeroSection from "@/components/hero-section"
import ProductsShowcase from "@/components/products-showcase"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="my-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Categories</h2>
          <Button variant="ghost" className="gap-2" asChild>
            <Link href="/categories">
              View All <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
        <Suspense fallback={<CategorySkeleton />}>
          <CategoryList />
        </Suspense>
      </section>

      <section className="my-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Button variant="ghost" className="gap-2" asChild>
            <Link href="/products">
              View All <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
        <Suspense fallback={<ProductsSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </section>

      <section className="my-16 py-16 bg-muted rounded-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">New Arrivals</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our latest products and stay ahead of the trends with Cartify's newest additions.
          </p>
        </div>
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsShowcase />
        </Suspense>
        <div className="flex justify-center mt-8">
          <Button className="gap-2" asChild>
            <Link href="/products">
              Shop Now <ShoppingBag size={16} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function CategorySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-col items-center space-y-2">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
    </div>
  )
}

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8)
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
