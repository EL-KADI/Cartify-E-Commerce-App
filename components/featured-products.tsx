import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

async function getFeaturedProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=8")
    if (!res.ok) throw new Error("Failed to fetch products")
    const data = await res.json()
    return data.products
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <div>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
