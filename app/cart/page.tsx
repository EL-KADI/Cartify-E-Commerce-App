"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Trash2, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/hooks/use-cart"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [discountApplied, setDiscountApplied] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal - discount + shipping

  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast({
        title: "Error",
        description: "Please enter a coupon code",
        variant: "destructive",
      })
      return
    }

    const randomDiscount = Math.floor(Math.random() * 26) + 5
    const discountAmount = (subtotal * randomDiscount) / 100

    setDiscount(discountAmount)
    setDiscountApplied(true)

    toast({
      title: "Coupon Applied",
      description: `You received a ${randomDiscount}% discount!`,
    })
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)

    setTimeout(() => {
      clearCart()
      toast({
        title: "Order Placed Successfully",
        description: "Thank you for your purchase!",
      })
      router.push("/checkout-success")
    }, 1500)
  }

  if (!mounted) {
    return null
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>

              <Separator className="mb-6" />

              {cart.map((item) => (
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
                        <h3 className="font-medium">{item.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span>{item.brand}</span>
                          {item.category && (
                            <>
                              <span>•</span>
                              <span>{item.category}</span>
                            </>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-500 flex items-center gap-1 mt-2"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="col-span-2 text-center">
                      <div className="md:hidden text-sm font-medium text-muted-foreground mb-1">Price</div>$
                      {item.price.toFixed(2)}
                    </div>

                    <div className="col-span-2 text-center">
                      <div className="md:hidden text-sm font-medium text-muted-foreground mb-1">Quantity</div>
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center rounded-l-md border bg-muted"
                        >
                          -
                        </button>
                        <div className="w-10 h-8 flex items-center justify-center border-t border-b">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-r-md border bg-muted"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="col-span-2 text-center font-medium">
                      <div className="md:hidden text-sm font-medium text-muted-foreground mb-1">Total</div>$
                      {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>

                  {cart.indexOf(item) < cart.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </div>

            <div className="p-6 bg-muted/50 rounded-b-lg flex flex-wrap gap-4 justify-between items-center">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Link href="/products">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-card p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={discountApplied}
                />
                <Button
                  variant={discountApplied ? "default" : "outline"}
                  onClick={handleApplyCoupon}
                  disabled={discountApplied}
                  className={discountApplied ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {discountApplied ? <Check size={16} /> : "Apply"}
                </Button>
              </div>

              <Button className="w-full" onClick={handleCheckout} disabled={isCheckingOut}>
                {isCheckingOut ? "Processing..." : "Checkout"} <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
