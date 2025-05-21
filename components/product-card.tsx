"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"

interface ProductCardProps {
  product: any
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const discountedPrice = product.price - product.price * (product.discountPercentage / 100)

  const handleAddToCart = () => {
    setIsAddingToCart(true)

    setTimeout(() => {
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

      setIsAddingToCart(false)
    }, 600)
  }

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from Wishlist",
        description: `${product.title} has been removed from your wishlist`,
      })
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        brand: product.brand,
        category: product.category,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
      })
      toast({
        title: "Added to Wishlist",
        description: `${product.title} has been added to your wishlist`,
      })
    }
  }

  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        {product.discountPercentage > 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            {Math.round(product.discountPercentage)}% OFF
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={handleToggleWishlist}
        >
          <Heart
            size={18}
            className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}
          />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
        <Link href={`/products/${product.id}`} className="hover:underline">
          <h3 className="font-medium line-clamp-1">{product.title}</h3>
        </Link>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }
                />
              ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.rating})</span>
        </div>

        <div className="flex items-baseline gap-2 mt-3">
          <span className="font-bold">${discountedPrice.toFixed(2)}</span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          <ShoppingCart size={14} />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
