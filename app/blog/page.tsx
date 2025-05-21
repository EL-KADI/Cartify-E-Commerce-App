import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-12">Our Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="border rounded-lg overflow-hidden bg-card">
            <div className="h-48 bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Blog Image Placeholder
              </div>
            </div>
            <div className="p-6">
              <div className="text-sm text-muted-foreground mb-2">{post.date}</div>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.id}`} className="text-primary hover:underline">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">More articles coming soon!</p>
      </div>
    </div>
  )
}

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Tech Gadgets for 2023",
    date: "May 15, 2023",
    excerpt:
      "Discover the most innovative tech gadgets that are making waves in 2023. From smartphones to smart home devices.",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Sustainable Fashion",
    date: "April 22, 2023",
    excerpt: "Learn how to make environmentally conscious choices when shopping for clothes and accessories.",
  },
  {
    id: 3,
    title: "How to Choose the Perfect Smartphone",
    date: "March 10, 2023",
    excerpt:
      "With so many options available, finding the right smartphone can be overwhelming. Here's our comprehensive guide.",
  },
  {
    id: 4,
    title: "Summer Fashion Trends to Watch",
    date: "June 5, 2023",
    excerpt: "Stay ahead of the curve with these upcoming summer fashion trends that are set to dominate the season.",
  },
  {
    id: 5,
    title: "Essential Kitchen Gadgets for Home Cooks",
    date: "February 18, 2023",
    excerpt: "Transform your cooking experience with these must-have kitchen tools that every home chef should own.",
  },
  {
    id: 6,
    title: "The Rise of Smart Home Technology",
    date: "January 30, 2023",
    excerpt: "Explore how smart home devices are revolutionizing the way we live and interact with our living spaces.",
  },
]
