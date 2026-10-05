import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SongGlow",
  description:
    "Learn how SongGlow collects, uses, stores, and protects information submitted through its electronic component sourcing website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Website Information</div>
          <h1>Privacy Policy</h1>
          <p>
            How SongGlow handles information submitted through this website,
            including sourcing inquiries and BOM attachments.
          </p>
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          <article className="article">
            <p>
              <strong>Last updated: October 5, 2026</strong>
            </p>

            <p>
              This Privacy Policy explains how SongGlow collects, uses, and
              protects information when you visit songglow.com, submit an
              inquiry, upload files, or choose to use live chat.
            </p>

            <h2>Information we collect</h2>
            <p>Depending on how you use the website, we may collect:</p>
            <ul>
              <li>
                Contact and business information, such as your name, company,
                email address, phone number, and WhatsApp number.
              </li>
              <li>
                Inquiry information, including messages, part numbers,
                quantities, target dates, and other sourcing requirements.
              </li>
              <li>
                Files you choose to upload, such as BOM lists, drawings, and
                specification sheets.
              </li>
              <li>
                Basic website usage and attribution information, such as the
                page you first visited, referring website, campaign parameters,
                page interactions, browser, device, and approximate location.
              </li>
              <li>
                Information you provide if you choose to open and use the live
                chat feature.
              </li>
            </ul>

            <h2>How we use information</h2>
            <p>We use this information to:</p>
            <ul>
              <li>Review and respond to sourcing and quotation inquiries.</li>
              <li>
                Research requested components and coordinate customer-approved
                sourcing activity.
              </li>
              <li>
                Communicate about your inquiry, requested documentation, or
                related service questions.
              </li>
              <li>
                Operate, secure, troubleshoot, and improve the website and its
                inquiry process.
              </li>
              <li>
                Understand which pages and referral sources lead to genuine
                sourcing inquiries.
              </li>
            </ul>

            <h2>Service providers</h2>
            <p>
              We use service providers to operate the website and inquiry
              workflow. These currently include Vercel for website hosting and
              analytics, Supabase for inquiry data and file storage, Resend for
              email notifications, and Tawk.to when a visitor chooses to open
              live chat. These providers may process information on our behalf
              under their own security and privacy terms.
            </p>

            <h2>Sharing and sale of information</h2>
            <p>
              SongGlow does not sell personal information. We may share
              information with service providers that support the website and
              inquiry process, with relevant sourcing parties when needed to
              research a customer request, or when disclosure is required by
              law. We limit shared information to what is reasonably necessary
              for the applicable purpose.
            </p>

            <h2>Storage, retention, and security</h2>
            <p>
              Inquiry information may be stored in systems operated by our
              service providers and may be processed in countries other than
              your own. We keep information for as long as reasonably necessary
              to respond to inquiries, maintain business records, resolve
              issues, and meet legal obligations. We use reasonable safeguards,
              but no online transmission or storage system can be guaranteed to
              be completely secure.
            </p>

            <h2>Your choices</h2>
            <p>
              You may ask us to access, correct, or delete personal information
              associated with an inquiry, subject to applicable legal and
              record-keeping requirements. Please do not upload confidential or
              sensitive information that is not necessary for us to review your
              sourcing request.
            </p>

            <h2>Children</h2>
            <p>
              This website is intended for businesses and professional users.
              It is not directed to children, and we do not knowingly collect
              personal information from children.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this policy when our website, providers, or data
              practices change. The date above shows when it was last revised.
            </p>

            <h2>Contact us</h2>
            <p>
              For privacy questions or requests, email{" "}
              <a href="mailto:rachel@songglow.com">rachel@songglow.com</a>.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
