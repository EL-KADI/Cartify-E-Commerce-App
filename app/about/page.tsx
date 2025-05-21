import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Users, Award, TrendingUp, Mail } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Cartify</h1>

        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <Image
            src="https://dummyjson.com/image/1200x400/1a1a2e/ffffff?text=Cartify+Shopping+Experience"
            alt="Cartify Team"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-muted-foreground">
            Founded in 2023, Cartify was born from a simple idea: shopping should be easy, enjoyable, and accessible to
            everyone. What started as a small online store has grown into a comprehensive e-commerce platform offering
            thousands of products across multiple categories.
          </p>
          <p className="text-muted-foreground">
            Our mission is to provide customers with a seamless shopping experience, high-quality products, and
            exceptional customer service. We believe in the power of technology to connect people with the products they
            love, and we're committed to continuously improving our platform to meet the evolving needs of our
            customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-xl p-6 border">
            <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
            <p className="text-muted-foreground">
              To become the most customer-centric e-commerce platform, where people can find and discover anything they
              might want to buy online, and to set the standard for online shopping experiences worldwide.
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 border">
            <h3 className="text-xl font-semibold mb-4">Our Values</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Customer Obsession</li>
              <li>• Quality & Excellence</li>
              <li>• Innovation & Creativity</li>
              <li>• Integrity & Transparency</li>
              <li>• Sustainability & Responsibility</li>
            </ul>
          </div>
        </div>

        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-semibold">Why Choose Cartify?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Wide Selection</h3>
                <p className="text-sm text-muted-foreground">
                  Thousands of products across multiple categories to meet all your needs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Customer Support</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicated support team available 24/7 to assist with any questions or concerns.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Quality Assurance</h3>
                <p className="text-sm text-muted-foreground">
                  All products undergo rigorous quality checks before being listed on our platform.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Competitive Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Regular deals, discounts, and competitive prices on all our products.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted p-8 rounded-xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Join the Cartify Community</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you're a shopper looking for great products or a brand looking to reach new customers, we'd love to
            have you as part of our growing community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="gap-2">
                <ShoppingBag size={18} />
                Start Shopping
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="gap-2">
                <Mail size={18} />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
