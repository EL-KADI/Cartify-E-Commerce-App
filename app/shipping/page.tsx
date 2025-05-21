import Link from "next/link"
import { ArrowLeft, Truck, RotateCcw, Clock, CreditCard } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Shipping & Returns</h1>
        <p className="text-muted-foreground mb-12">
          Information about our shipping methods, delivery times, and return policies.
        </p>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Shipping Information</h2>
          </div>
          <Separator className="mb-6" />

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Shipping Methods</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="font-medium">Standard Shipping</div>
                  <div className="md:col-span-2">3-5 business days</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="font-medium">Express Shipping</div>
                  <div className="md:col-span-2">1-2 business days</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="font-medium">International Shipping</div>
                  <div className="md:col-span-2">7-21 business days (varies by location)</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Shipping Costs</h3>
              <p className="text-muted-foreground mb-4">
                Shipping costs are calculated based on the delivery address, weight, and dimensions of the products in
                your order.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Free standard shipping on orders over $50 (continental US only)</li>
                <li>Standard shipping: $5.99 for orders under $50</li>
                <li>Express shipping: Additional $9.99</li>
                <li>International shipping: Varies by destination</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Delivery Times</h3>
              <p className="text-muted-foreground">
                Delivery times are estimated and begin from the date of shipping, not the date of purchase. Delivery
                times may vary due to unforeseen circumstances such as weather conditions, natural disasters, or customs
                delays for international shipments.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <RotateCcw className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Returns Policy</h2>
          </div>
          <Separator className="mb-6" />

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Return Eligibility</h3>
              <p className="text-muted-foreground mb-4">
                Most items can be returned within 30 days of delivery. To be eligible for a return, your item must be:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>In the same condition that you received it</li>
                <li>Unworn or unused with tags still attached</li>
                <li>In the original packaging</li>
                <li>Accompanied by the receipt or proof of purchase</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Non-Returnable Items</h3>
              <p className="text-muted-foreground mb-2">Several types of goods are exempt from being returned:</p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Gift cards</li>
                <li>Downloadable software products</li>
                <li>Personal care items (for health and hygiene reasons)</li>
                <li>Customized or personalized products</li>
                <li>Perishable goods</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Return Process</h3>
              <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                <li>Initiate a return through your account or contact customer service</li>
                <li>Print the return shipping label provided via email</li>
                <li>Pack the item securely in its original packaging if possible</li>
                <li>Attach the return shipping label to the outside of the package</li>
                <li>Drop off the package at the specified carrier location</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Refunds</h3>
              <p className="text-muted-foreground">
                Once your return is received and inspected, we will send you an email to notify you that we have
                received your returned item. We will also notify you of the approval or rejection of your refund. If
                approved, your refund will be processed, and a credit will automatically be applied to your original
                method of payment within 5-10 business days.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-12 flex flex-col md:flex-row gap-6 p-6 bg-muted rounded-lg">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Processing Time</h3>
              <p className="text-sm text-muted-foreground">Orders are processed within 24-48 hours</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CreditCard className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Return Shipping</h3>
              <p className="text-sm text-muted-foreground">Return shipping is free for defective items</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Tracking</h3>
              <p className="text-sm text-muted-foreground">All orders include tracking information</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
