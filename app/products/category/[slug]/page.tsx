import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import CategoryProducts from "@/components/category-products"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Format category name for display
  const formatCategoryName = (category: string) => {
    if (!category) return "Category"

    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const categoryName = formatCategoryName(slug)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/categories"
        className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to Categories
      </Link>

      <h1 className="text-4xl font-bold mb-8">{categoryName}</h1>

      <Suspense fallback={<ProductsSkeleton />}>
        <CategoryProducts category={slug} />
      </Suspense>
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
