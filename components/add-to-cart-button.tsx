"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/hooks/use-cart"

interface AddToCartButtonProps {
  product: any
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)

    setTimeout(() => {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        brand: product.brand,
        category: product.category,
        quantity,
      })

      toast({
        title: "Added to Cart",
        description: `${product.title} has been added to your cart`,
      })

      setIsAdding(false)
    }, 600)
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-10 h-10 flex items-center justify-center rounded-l-md border bg-muted"
          disabled={isAdding}
        >
          -
        </button>
        <div className="w-12 h-10 flex items-center justify-center border-t border-b">{quantity}</div>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-r-md border bg-muted"
          disabled={isAdding}
        >
          +
        </button>
      </div>

      <Button className="flex-1 gap-2" onClick={handleAddToCart} disabled={isAdding || product.stock <= 0}>
        {isAdding ? (
          <>
            <Check size={18} />
            Added
          </>
        ) : (
          <>
            <ShoppingCart size={18} />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  )
}
