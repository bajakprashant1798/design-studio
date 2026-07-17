export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8 space-y-12">
      <header className="space-y-4">
        <span className="text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
          LEGAL
        </span>
        <h1 className="font-serif text-3xl tracking-tight text-black dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-[10px] text-zinc-400 dark:text-zinc-550">
          Last updated: July 17, 2026
        </p>
      </header>

      <section className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-6 font-light">
        <p>
          At DESIGN STUDIO, we respect your privacy and are committed to protecting the personal data we process about you. This privacy policy describes how we collect, use, and share your personal data in connection with your use of our e-commerce platform.
        </p>
        <h2 className="text-[11px] font-semibold text-black dark:text-white uppercase tracking-wider">
          1. Data We Collect
        </h2>
        <p>
          We collect personal data that you provide directly to us (e.g., name, email address, shipping address, payment details) when placing an order, registering an account, or subscribing to our newsletters.
        </p>
        <h2 className="text-[11px] font-semibold text-black dark:text-white uppercase tracking-wider">
          2. How We Use Your Data
        </h2>
        <p>
          Your data is processed to fulfill your purchases, manage your customer account, optimize shipping logistics, process payments securely, and send newsletter updates if explicitly requested.
        </p>
        <h2 className="text-[11px] font-semibold text-black dark:text-white uppercase tracking-wider">
          3. Sharing Data
        </h2>
        <p>
          We do not sell your personal data. We share data only with trusted third-party service providers (e.g., Stripe for payments, DHL/FedEx for shipping) necessary to complete store operations.
        </p>
      </section>
    </article>
  )
}
