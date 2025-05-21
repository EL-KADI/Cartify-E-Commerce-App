import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import AllCategories from "@/components/all-categories"

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-8">All Categories</h1>

      <Suspense fallback={<CategoriesSkeleton />}>
        <AllCategories />
      </Suspense>
    </div>
  )
}

function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
          </div>
        ))}
    </div>
  )
}
