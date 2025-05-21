"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Package, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Footer() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscriptionMessage, setSubscriptionMessage] = useState("")
  const [emailError, setEmailError] = useState("")
  const currentYear = new Date().getFullYear()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)

    if (emailError) {
      setEmailError("")
    }
  }

  const handleSubscribe = () => {
    if (!email.trim()) {
      setEmailError("Please enter your email address")
      return
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    setEmailError("")
    setIsSubscribed(true)
    setSubscriptionMessage("Successfully subscribed to our newsletter!")
    toast({
      title: "Subscription Successful",
      description: "Thank you for subscribing to our newsletter!",
    })
  }

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Package size={24} />
              Cartify
            </Link>
            <p className="mt-4 text-muted-foreground">
              Your one-stop shop for all your shopping needs. Quality products, competitive prices, and exceptional
              service.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-muted-foreground hover:text-foreground transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter to receive updates and exclusive offers.
            </p>
            {subscriptionMessage && (
              <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">{subscriptionMessage}</div>
            )}
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Your email"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isSubscribed}
                  className={emailError ? "border-red-500" : ""}
                />
                <Button onClick={handleSubscribe} disabled={isSubscribed}>
                  {isSubscribed ? <Check className="mr-2" /> : null}
                  {isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
              </div>

              {emailError && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs ml-2">{emailError}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} />
                <span>support@cartify.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin size={18} />
                <span>123 Commerce St, New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Cartify. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="h-8 w-12 bg-card rounded border flex items-center justify-center text-xs font-bold">
              VISA
            </div>
            <div className="h-8 w-12 bg-card rounded border flex items-center justify-center text-xs font-bold">MC</div>
            <div className="h-8 w-12 bg-card rounded border flex items-center justify-center text-xs font-bold">
              PayPal
            </div>
            <div className="h-8 w-12 bg-card rounded border flex items-center justify-center text-xs font-bold">
              Apple
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
