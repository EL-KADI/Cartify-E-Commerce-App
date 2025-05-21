import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-4">Last updated: May 1, 2023</p>
        <p className="text-muted-foreground mb-12">
          Please read these terms and conditions carefully before using our website and services.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to Cartify ("we," "our," or "us"). These Terms and Conditions govern your use of our website,
              located at www.cartify.com, and any related services, features, content, or applications offered by us
              (collectively, the "Services").
            </p>
            <p className="text-muted-foreground">
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these
              Terms, please do not use our Services.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Account Registration</h2>
            <p className="text-muted-foreground mb-4">
              To access certain features of our Services, you may be required to register for an account. You agree to
              provide accurate, current, and complete information during the registration process and to update such
              information to keep it accurate, current, and complete.
            </p>
            <p className="text-muted-foreground">
              You are responsible for safeguarding your password and for all activities that occur under your account.
              You agree to notify us immediately of any unauthorized use of your account or any other breach of
              security.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Products and Purchases</h2>
            <p className="text-muted-foreground mb-4">
              All products displayed on our website are subject to availability. We reserve the right to discontinue any
              product at any time.
            </p>
            <p className="text-muted-foreground mb-4">
              Prices for our products are subject to change without notice. We reserve the right to modify or
              discontinue the Services (or any part or content thereof) without notice at any time.
            </p>
            <p className="text-muted-foreground">
              We shall not be liable to you or to any third party for any modification, price change, suspension, or
              discontinuance of the Services.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
            <p className="text-muted-foreground mb-4">
              We accept various payment methods, including credit cards, debit cards, and other forms of electronic
              payment. By providing a payment method, you represent and warrant that you are authorized to use the
              designated payment method.
            </p>
            <p className="text-muted-foreground">
              You agree to pay all charges incurred by you or any users of your account and payment method at the prices
              in effect when such charges are incurred. You are also responsible for any taxes applicable to your
              purchases.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              The Services and their entire contents, features, and functionality (including but not limited to all
              information, software, text, displays, images, video, and audio, and the design, selection, and
              arrangement thereof) are owned by us, our licensors, or other providers of such material and are protected
              by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p className="text-muted-foreground">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform,
              republish, download, store, or transmit any of the material on our Services, except as generally and
              ordinarily permitted through the Services according to these Terms.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              In no event shall we, our directors, employees, partners, agents, suppliers, or affiliates be liable for
              any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss
              of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-4">
              <li>Your access to or use of or inability to access or use the Services</li>
              <li>Any conduct or content of any third party on the Services</li>
              <li>Any content obtained from the Services</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            <p className="text-muted-foreground">
              Whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or
              not we have been informed of the possibility of such damage, and even if a remedy set forth herein is
              found to have failed of its essential purpose.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material, we will provide at least 30 days' notice prior to any new terms taking effect. What
              constitutes a material change will be determined at our sole discretion. By continuing to access or use
              our Services after any revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us at legal@cartify.com or through our Contact
              page.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
