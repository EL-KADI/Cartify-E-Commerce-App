"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Trash2, Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useWishlist } from "@/hooks/use-wishlist"
import { useCart } from "@/hooks/use-cart"

export default function WishlistPage() {
  const { toast } = useToast()
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      brand: product.brand,
      category: product.category,
      quantity: 1,
    })

    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart`,
    })
  }

  const handleRemoveFromWishlist = (productId: number, productTitle: string) => {
    removeFromWishlist(productId)
    toast({
      title: "Removed from Wishlist",
      description: `${productTitle} has been removed from your wishlist`,
    })
  }

  if (!mounted) {
    return null
  }

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any products to your wishlist yet.</p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-muted-foreground">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          <Separator className="mb-6" />

          {wishlist.map((item) => {
            const discountedPrice = item.price - (item.price * (item.discountPercentage || 0)) / 100

            return (
              <div key={item.id} className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center gap-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted">
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-medium hover:underline">{item.title}</h3>
                      </Link>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{item.brand}</span>
                        {item.category && (
                          <>
                            <span>•</span>
                            <span>{item.category}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 text-center">
                    <div className="md:hidden text-sm font-medium text-muted-foreground mb-1">Price</div>
                    <div className="font-medium">${discountedPrice.toFixed(2)}</div>
                    {item.discountPercentage && item.discountPercentage > 0 && (
                      <div className="text-sm text-muted-foreground line-through">${item.price.toFixed(2)}</div>
                    )}
                  </div>

                  <div className="col-span-2 text-center">
                    <div className="md:hidden text-sm font-medium text-muted-foreground mb-1">Status</div>
                    <div className="text-green-600">In Stock</div>
                  </div>

                  <div className="col-span-2 flex flex-col sm:flex-row gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart size={14} className="mr-2" />
                      Add
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full sm:w-auto text-red-500 hover:text-red-600"
                      onClick={() => handleRemoveFromWishlist(item.id, item.title)}
                    >
                      <Trash2 size={14} className="mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>

                {wishlist.indexOf(item) < wishlist.length - 1 && <Separator className="mt-6" />}
              </div>
            )
          })}
        </div>

        <div className="p-6 bg-muted/50 rounded-b-lg flex flex-wrap gap-4 justify-between items-center">
          <Button variant="outline" onClick={clearWishlist}>
            Clear Wishlist
          </Button>
          <Link href="/products">
            <Button className="gap-2">
              Continue Shopping
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
