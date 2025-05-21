import Link from "next/link"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}-${new Date().getFullYear()}`

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-2">Thank you for your purchase.</p>
        <p className="text-muted-foreground mb-8">
          Your order number is <span className="font-medium">{orderNumber}</span>
        </p>

        <div className="bg-muted p-6 rounded-lg mb-8">
          <h2 className="font-semibold mb-4">What happens next?</h2>
          <div className="space-y-4 text-left">
            <div className="flex gap-3">
              <div className="bg-background rounded-full h-8 w-8 flex items-center justify-center shrink-0">1</div>
              <div>
                <p className="font-medium">Order Confirmation</p>
                <p className="text-sm text-muted-foreground">You will receive an email confirmation shortly.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-background rounded-full h-8 w-8 flex items-center justify-center shrink-0">2</div>
              <div>
                <p className="font-medium">Order Processing</p>
                <p className="text-sm text-muted-foreground">We'll prepare your items for shipping.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-background rounded-full h-8 w-8 flex items-center justify-center shrink-0">3</div>
              <div>
                <p className="font-medium">Order Shipped</p>
                <p className="text-sm text-muted-foreground">Your order will be on its way to you soon!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button className="gap-2">
              Continue Shopping <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Package size={16} />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
