export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8 space-y-12">
      <header className="space-y-4">
        <span className="text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
          LEGAL
        </span>
        <h1 className="font-serif text-3xl tracking-tight text-black dark:text-white">
          Terms & Conditions
        </h1>
        <p className="text-[10px] text-zinc-400 dark:text-zinc-550">
          Last updated: July 17, 2026
        </p>
      </header>

      <section className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-6 font-light">
        <p>
          Welcome to DESIGN STUDIO. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing or shopping on this website, we assume you accept these terms in full.
        </p>
        <h2 className="text-[11px] font-semibold text-black dark:text-white uppercase tracking-wider">
          1. E-Commerce Purchases
        </h2>
        <p>
          By placing an order, you warrant that you are legally capable of entering into binding contracts and that all details provided are accurate. All products remain the property of DESIGN STUDIO until full payment is captured.
        </p>
        <h2 className="text-[11px] font-semibold text-black dark:text-white uppercase tracking-wider">
          2. Intellectual Property
        </h2>
        <p>
          Unless otherwise stated, DESIGN STUDIO owns the intellectual property rights for all material, imagery, and text assets on this website. All intellectual property rights are reserved.
        </p>
        <h2 className="text-[11px] font-semibold text-black dark:text-white uppercase tracking-wider">
          3. Returns and Refunds
        </h2>
        <p>
          Returns are accepted within 14 days of delivery. Items must be returned in their original condition, unworn, and with all original tags attached. Return shipping fees are the responsibility of the customer unless otherwise stated.
        </p>
      </section>
    </article>
  )
}
