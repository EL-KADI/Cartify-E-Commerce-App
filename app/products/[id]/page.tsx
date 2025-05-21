import { Suspense } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddToCartButton from "@/components/add-to-cart-button"
import AddToWishlistButton from "@/components/add-to-wishlist-button"
import RelatedProducts from "@/components/related-products"
import ProductReviews from "@/components/product-reviews"
import Link from "next/link"

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error("Failed to fetch product:", error)
    return null
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  const discountedPrice = product.price - product.price * (product.discountPercentage / 100)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl border bg-background">
            <Image
              src={product.thumbnail || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(0, 4).map((image: string, index: number) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-md border bg-background">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }
                    />
                  ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews?.length || 0} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                <Badge variant="destructive">{Math.round(product.discountPercentage)}% OFF</Badge>
              </>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3 py-1">
                {product.brand}
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                {product.category}
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="font-medium">Availability:</span>{" "}
                {product.stock > 0 ? (
                  <span className="text-green-600">In Stock ({product.stock})</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>

              <div className="text-sm">
                <span className="font-medium">SKU:</span> {product.sku || `PRD-${product.id}`}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <AddToCartButton product={product} />
            <AddToWishlistButton product={product} />
          </div>

          <div className="space-y-3 pt-6 border-t">
            <div className="flex items-center gap-3 text-sm">
              <Truck size={18} />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <ShieldCheck size={18} />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="mb-16">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="details"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Product Details
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Reviews
          </TabsTrigger>
          <TabsTrigger
            value="shipping"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            Shipping & Returns
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="pt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Brand</span>
                  <span>{product.brand}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Category</span>
                  <span>{product.category}</span>
                </div>
                {product.weight && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Weight</span>
                    <span>{product.weight} kg</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {product.dimensions && (
                  <>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Width</span>
                      <span>{product.dimensions.width} cm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Height</span>
                      <span>{product.dimensions.height} cm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Depth</span>
                      <span>{product.dimensions.depth} cm</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-6">
          <Suspense fallback={<div>Loading reviews...</div>}>
            <ProductReviews productId={params.id} reviews={product.reviews || []} />
          </Suspense>
        </TabsContent>
        <TabsContent value="shipping" className="pt-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Shipping Information</h3>
            <p>{product.shippingInformation || "Standard shipping: 3-5 business days"}</p>

            <h3 className="text-xl font-semibold mt-6">Return Policy</h3>
            <p>
              {product.returnPolicy || "30-day return policy. Items must be in original condition with tags attached."}
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <Suspense fallback={<div>Loading related products...</div>}>
          <RelatedProducts category={product.category} currentProductId={params.id} />
        </Suspense>
      </section>
    </div>
  )
}
