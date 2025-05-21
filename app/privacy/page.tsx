import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-4">Last updated: May 1, 2023</p>
        <p className="text-muted-foreground mb-12">
          This Privacy Policy describes how Cartify ("we," "our," or "us") collects, uses, and shares your personal
          information when you visit our website or make a purchase.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              When you visit our website, we automatically collect certain information about your device, including
              information about your web browser, IP address, time zone, and some of the cookies that are installed on
              your device.
            </p>
            <p className="text-muted-foreground mb-4">
              Additionally, as you browse the site, we collect information about the individual web pages or products
              that you view, what websites or search terms referred you to the site, and information about how you
              interact with the site.
            </p>
            <p className="text-muted-foreground">
              When you make a purchase or attempt to make a purchase through the site, we collect certain information
              from you, including your name, billing address, shipping address, payment information (including credit
              card numbers), email address, and phone number.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">We use the information that we collect to:</p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Fulfill orders and process transactions</li>
              <li>Communicate with you about your order, account, or customer service needs</li>
              <li>Screen our orders for potential risk or fraud</li>
              <li>Provide you with information or advertising relating to our products or services</li>
              <li>Improve and optimize our website</li>
              <li>Comply with our legal obligations</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We share your Personal Information with third parties to help us use your Personal Information, as
              described above. For example, we use Shopify to power our online store. We also use Google Analytics to
              help us understand how our customers use the site.
            </p>
            <p className="text-muted-foreground">
              We may also share your Personal Information to comply with applicable laws and regulations, to respond to
              a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our
              rights.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Behavioral Advertising</h2>
            <p className="text-muted-foreground">
              We use your Personal Information to provide you with targeted advertisements or marketing communications
              we believe may be of interest to you. For more information about how targeted advertising works, you can
              visit the Network Advertising Initiative's educational page.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              If you are a European resident, you have the right to access personal information we hold about you and to
              ask that your personal information be corrected, updated, or deleted. If you would like to exercise this
              right, please contact us.
            </p>
            <p className="text-muted-foreground">
              Additionally, if you are a European resident, we note that we are processing your information in order to
              fulfill contracts we might have with you, or otherwise to pursue our legitimate business interests listed
              above. Please note that your information will be transferred outside of Europe, including to Canada and
              the United States.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
            <p className="text-muted-foreground">
              When you place an order through the site, we will maintain your Order Information for our records unless
              and until you ask us to delete this information.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Changes</h2>
            <p className="text-muted-foreground">
              We may update this privacy policy from time to time in order to reflect, for example, changes to our
              practices or for other operational, legal or regulatory reasons. We will notify you of any significant
              changes to this Privacy Policy.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-muted-foreground">
              For more information about our privacy practices, if you have questions, or if you would like to make a
              complaint, please contact us by e-mail at privacy@cartify.com or through our Contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
