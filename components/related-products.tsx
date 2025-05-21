import ProductCard from "@/components/product-card"

interface RelatedProductsProps {
  category: string
  currentProductId: string
}

async function getRelatedProducts(category: string, currentProductId: string) {
  try {
    const res = await fetch(`https://dummyjson.com/products/category/${category}`)
    if (!res.ok) throw new Error("Failed to fetch related products")
    const data = await res.json()

    return data.products.filter((product: any) => product.id.toString() !== currentProductId).slice(0, 4)
  } catch (error) {
    console.error("Error fetching related products:", error)
    return []
  }
}

export default async function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  const products = await getRelatedProducts(category, currentProductId)

  if (products.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
