"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Package, Truck, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function TrackOrderPage() {
  const { toast } = useToast()
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [isTracking, setIsTracking] = useState(false)
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null)

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault()

    if (!orderNumber || !email) {
      toast({
        title: "Error",
        description: "Please enter both order number and email",
        variant: "destructive",
      })
      return
    }

    setIsTracking(true)

    setTimeout(() => {
      setTrackingResult({
        orderNumber,
        status: "In Transit",
        estimatedDelivery: "May 25, 2023",
        trackingNumber:
          "TRK" +
          Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(7, "0"),
        items: [
          { name: "Smartphone X Pro", quantity: 1, status: "Shipped" },
          { name: "Wireless Earbuds", quantity: 2, status: "Shipped" },
        ],
        events: [
          {
            date: "May 20, 2023",
            time: "09:15 AM",
            location: "Distribution Center",
            description: "Package has left the distribution center",
          },
          {
            date: "May 19, 2023",
            time: "02:30 PM",
            location: "Sorting Facility",
            description: "Package arrived at sorting facility",
          },
          {
            date: "May 18, 2023",
            time: "10:45 AM",
            location: "Warehouse",
            description: "Order processed and ready for shipment",
          },
          { date: "May 17, 2023", time: "03:20 PM", location: "Online", description: "Order confirmed" },
        ],
      })
      setIsTracking(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Track Your Order</h1>
        <p className="text-muted-foreground mb-12">
          Enter your order number and email address to track the status of your order.
        </p>

        <div className="bg-card border rounded-lg p-6 mb-8">
          <form onSubmit={handleTrackOrder} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="orderNumber" className="text-sm font-medium">
                  Order Number
                </label>
                <Input
                  id="orderNumber"
                  placeholder="e.g., ORD-1234-2023"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email used for the order"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full md:w-auto gap-2" disabled={isTracking}>
              {isTracking ? (
                <>
                  <Clock className="animate-spin" size={16} />
                  Tracking...
                </>
              ) : (
                <>
                  <Search size={16} />
                  Track Order
                </>
              )}
            </Button>
          </form>
        </div>

        {trackingResult && (
          <div className="bg-card border rounded-lg overflow-hidden">
            <div className="bg-muted p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Order #{trackingResult.orderNumber}</h2>
                  <p className="text-muted-foreground">Tracking Number: {trackingResult.trackingNumber}</p>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  <Truck size={16} />
                  {trackingResult.status}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Estimated Delivery: {trackingResult.estimatedDelivery}</h3>
                <div className="relative">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs">Order Placed</span>
                    <span className="text-xs">Processing</span>
                    <span className="text-xs">Shipped</span>
                    <span className="text-xs">Delivered</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full mb-2 relative">
                    <div
                      className="absolute top-0 left-0 h-full bg-primary rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between">
                    <CheckCircle size={16} className="text-primary" />
                    <CheckCircle size={16} className="text-primary" />
                    <CheckCircle size={16} className="text-primary" />
                    <Clock size={16} className="text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Order Items</h3>
                <div className="space-y-4">
                  {trackingResult.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                          <Package size={16} />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-green-600">{item.status}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Tracking History</h3>
                <div className="space-y-4">
                  {trackingResult.events.map((event, index) => (
                    <div key={index} className="relative pl-6 pb-4">
                      {index !== trackingResult.events.length - 1 && (
                        <div className="absolute top-2 left-[7px] h-full w-[2px] bg-muted"></div>
                      )}
                      <div className="absolute top-2 left-0 h-4 w-4 rounded-full bg-primary"></div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                        <div className="text-sm font-medium min-w-[180px]">
                          {event.date} • {event.time}
                        </div>
                        <div>
                          <p className="font-medium">{event.location}</p>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-4">
            If you're having trouble tracking your order or have any questions, our customer service team is here to
            help.
          </p>
          <Link href="/contact" className="text-primary hover:underline">
            Contact Customer Support
          </Link>
        </div>
      </div>
    </div>
  )
}

interface TrackingResult {
  orderNumber: string
  status: string
  estimatedDelivery: string
  trackingNumber: string
  items: {
    name: string
    quantity: number
    status: string
  }[]
  events: {
    date: string
    time: string
    location: string
    description: string
  }[]
}
