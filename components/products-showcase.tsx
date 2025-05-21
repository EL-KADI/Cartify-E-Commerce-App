import ProductCard from "@/components/product-card"
import { Badge } from "@/components/ui/badge"

async function getNewArrivals() {
  try {
    // In a real app, you'd fetch the newest products
    // For demo, we'll use a different set of products
    const res = await fetch("https://dummyjson.com/products?skip=10&limit=4")
    if (!res.ok) throw new Error("Failed to fetch products")
    const data = await res.json()
    return data.products
  } catch (error) {
    console.error("Error fetching new arrivals:", error)
    return []
  }
}

export default async function ProductsShowcase() {
  const products = await getNewArrivals()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      {products.map((product: any) => (
        <div key={product.id} className="relative">
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-green-600 hover:bg-green-700">New</Badge>
          </div>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
