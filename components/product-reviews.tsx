import { Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ProductReviewsProps {
  productId: string
  reviews: any[]
}

export default function ProductReviews({ productId, reviews }: ProductReviewsProps) {
  // If no reviews are provided, show a message
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium mb-2">No Reviews Yet</h3>
        <p className="text-muted-foreground mb-6">Be the first to review this product</p>
        <div className="max-w-md mx-auto">
          <WriteReviewForm />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-lg font-medium">Customer Reviews</h3>

          {reviews.map((review, index) => (
            <div key={index} className="border-b pb-6 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-medium">
                    {review.reviewerName?.charAt(0) || "U"}
                  </div>
                  <div>
                    <div className="font-medium">{review.reviewerName || "Anonymous"}</div>
                    <div className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                      />
                    ))}
                </div>
              </div>

              <p className="text-sm mb-3">{review.comment}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-foreground">
                  <ThumbsUp size={14} />
                  Helpful (12)
                </button>
                <button className="flex items-center gap-1 hover:text-foreground">
                  <ThumbsDown size={14} />
                  Not Helpful (2)
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Write a Review</h3>
          <WriteReviewForm />
        </div>
      </div>
    </div>
  )
}

function WriteReviewForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Rating</label>
        <div className="flex items-center gap-1">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <button key={i} type="button" className="text-muted-foreground hover:text-yellow-400">
                <Star size={24} />
              </button>
            ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Review</label>
        <Textarea placeholder="Write your review here..." className="min-h-[120px]" />
      </div>

      <Button>Submit Review</Button>
    </form>
  )
}
