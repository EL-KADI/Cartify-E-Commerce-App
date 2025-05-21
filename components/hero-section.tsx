import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-xl">
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 dark:from-primary/10 dark:to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Discover Amazing Products at Unbeatable Prices
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Shop the latest trends and find everything you need, all in one place. Quality products, fast shipping,
                and exceptional service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="/products">
                    Shop Now <ShoppingBag size={18} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/categories">Browse Categories</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src="https://dummyjson.com/image/600x450/1a1a2e/ffffff?text=Cartify+Shopping+Experience"
                  alt="Cartify Shopping Experience"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2 translate-y-1/4 w-40 h-40 bg-primary/30 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
