import Link from "next/link"

async function getCategories() {
  try {
    const res = await fetch("https://dummyjson.com/products/category-list", {
      cache: "no-store",
      next: { revalidate: 0 },
    })

    if (!res.ok) throw new Error("Failed to fetch categories")

    const data = await res.json()
    console.log("All Categories API response:", data)
    return data
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export default async function AllCategories() {
  const categories = await getCategories()

  const categoryIcons: Record<string, string> = {
    smartphones: "📱",
    laptops: "💻",
    fragrances: "🧴",
    skincare: "✨",
    groceries: "🛒",
    "home-decoration": "🏠",
    furniture: "🪑",
    tops: "👚",
    "womens-dresses": "👗",
    "womens-shoes": "👠",
    "mens-shirts": "👔",
    "mens-shoes": "👞",
    "mens-watches": "⌚",
    "womens-watches": "⌚",
    "womens-bags": "👜",
    "womens-jewellery": "💍",
    sunglasses: "🕶️",
    automotive: "🚗",
    motorcycle: "🏍️",
    lighting: "💡",
  }

  const formatCategoryName = (category: string) => {
    if (!category || typeof category !== "string") {
      return "Category"
    }

    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  if (!Array.isArray(categories) || categories.length === 0) {
    const fallbackCategories = [
      "smartphones",
      "laptops",
      "fragrances",
      "skincare",
      "groceries",
      "home-decoration",
      "furniture",
      "tops",
      "womens-dresses",
      "womens-shoes",
      "mens-shirts",
      "mens-shoes",
    ]

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fallbackCategories.map((category) => (
          <Link
            key={category}
            href={`/products?category=${category}`}
            className="flex flex-col items-center p-6 rounded-lg bg-card hover:bg-muted transition-colors border"
          >
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-4xl mb-4">
              {categoryIcons[category] || "🛍️"}
            </div>
            <span className="text-center font-medium">{formatCategoryName(category)}</span>
            <span className="text-sm text-muted-foreground mt-1">Explore Products</span>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.isArray(categories) &&
        categories.map((category) => {
          const categoryName = typeof category === "string" ? category : "category"

          return (
            <Link
              key={categoryName}
              href={`/products?category=${categoryName}`}
              className="flex flex-col items-center p-6 rounded-lg bg-card hover:bg-muted transition-colors border"
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-4xl mb-4">
                {categoryIcons[categoryName] || "🛍️"}
              </div>
              <span className="text-center font-medium">{formatCategoryName(categoryName)}</span>
              <span className="text-sm text-muted-foreground mt-1">Explore Products</span>
            </Link>
          )
        })}
    </div>
  )
}
