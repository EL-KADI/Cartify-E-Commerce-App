import Link from "next/link"

async function getCategories() {
  try {
    const res = await fetch("https://dummyjson.com/products/category-list", {
      cache: "no-store",
      next: { revalidate: 0 },
    })

    if (!res.ok) throw new Error("Failed to fetch categories")

    const data = await res.json()
    console.log("Categories API response:", data)
    return data
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export default async function CategoryList() {
  const categories = await getCategories()

  const displayCategories = Array.isArray(categories) ? categories.slice(0, 6) : []

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
    const fallbackCategories = ["smartphones", "laptops", "fragrances", "skincare", "groceries", "home-decoration"]

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {fallbackCategories.map((category) => (
          <Link
            key={category}
            href={`/products?category=${category}`}
            className="flex flex-col items-center p-4 rounded-lg bg-card hover:bg-muted transition-colors"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-3xl mb-3">
              {categoryIcons[category] || "🛍️"}
            </div>
            <span className="text-center font-medium">{formatCategoryName(category)}</span>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {displayCategories.map((category) => {
        const categoryName = typeof category === "string" ? category : "category"

        return (
          <Link
            key={categoryName}
            href={`/products?category=${categoryName}`}
            className="flex flex-col items-center p-4 rounded-lg bg-card hover:bg-muted transition-colors"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-3xl mb-3">
              {categoryIcons[categoryName] || "🛍️"}
            </div>
            <span className="text-center font-medium">{formatCategoryName(categoryName)}</span>
          </Link>
        )
      })}
    </div>
  )
}
