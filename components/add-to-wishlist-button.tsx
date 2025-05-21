"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useWishlist } from "@/hooks/use-wishlist"

interface AddToWishlistButtonProps {
  product: any
}

export default function AddToWishlistButton({ product }: AddToWishlistButtonProps) {
  const { toast } = useToast()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [isAdding, setIsAdding] = useState(false)

  const handleToggleWishlist = () => {
    setIsAdding(true)

    setTimeout(() => {
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
      setIsAdding(false)
    }, 600)
  }

  const inWishlist = isInWishlist(product.id)

  return (
    <Button
      variant={inWishlist ? "default" : "outline"}
      className={`gap-2 ${inWishlist ? "bg-red-500 hover:bg-red-600" : ""}`}
      onClick={handleToggleWishlist}
      disabled={isAdding}
    >
      <Heart className={inWishlist ? "fill-white" : ""} size={18} />
      {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
    </Button>
  )
}
