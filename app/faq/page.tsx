import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-12">
          Find answers to the most common questions about our products, services, and policies.
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={`item-${item.id}`} className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium py-4">{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 p-6 bg-muted rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
          <p className="text-muted-foreground mb-4">
            If you couldn't find the answer to your question, please contact our customer support team.
          </p>
          <Link href="/contact" className="text-primary hover:underline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

const faqItems = [
  {
    id: 1,
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 3-5 business days within the continental United States. Express shipping options are available at checkout for 1-2 business day delivery.",
  },
  {
    id: 2,
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached. Some products may have specific return restrictions, which will be noted on the product page.",
  },
  {
    id: 3,
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. International shipping times vary depending on the destination, typically ranging from 7-21 business days. Additional customs fees may apply.",
  },
  {
    id: 4,
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account or using the 'Track Order' feature in the footer of our website.",
  },
  {
    id: 5,
    question: "Are my payment details secure?",
    answer:
      "Absolutely. We use industry-standard encryption and secure payment processors to ensure your payment information is always protected. We never store your full credit card details on our servers.",
  },
  {
    id: 6,
    question: "Can I change or cancel my order?",
    answer:
      "Orders can be modified or canceled within 1 hour of placement. After this window, orders enter our processing system and cannot be changed. Please contact customer service immediately if you need to make changes.",
  },
  {
    id: 7,
    question: "Do you offer price matching?",
    answer:
      "Yes, we offer price matching for identical products from authorized retailers. Submit your price match request through our customer service portal with a link to the competitor's listing.",
  },
  {
    id: 8,
    question: "How do I apply a coupon code?",
    answer:
      "You can apply coupon codes during checkout. Simply enter your code in the 'Coupon Code' field in the cart or checkout page and click 'Apply' to see your discount.",
  },
]
