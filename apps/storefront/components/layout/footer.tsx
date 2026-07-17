import Link from "next/link"

export default function Footer() {
  const footerSections = [
    {
      title: "COLLECTIONS",
      links: [
        { name: "New Arrivals", href: "/collections/new-arrivals" },
        { name: "Best Sellers", href: "/collections/best-sellers" },
        { name: "All Products", href: "/categories" },
      ],
    },
    {
      title: "ASSISTANCE",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Shipping & Returns", href: "/about" },
        { name: "FAQs", href: "/about" },
      ],
    },
    {
      title: "LEGAL",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms & Conditions", href: "/terms" },
      ],
    },
  ]

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="flex flex-col space-y-4">
            <span className="font-serif text-lg font-medium tracking-widest text-black dark:text-white">
              DESIGN STUDIO
            </span>
            <p className="max-w-xs text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              A curation of premium essential apparel designed for the modern uniform. Crafted with slow-fashion principles and premium materials.
            </p>
          </div>

          {/* Nav links columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col space-y-4">
              <span className="text-xs font-semibold tracking-widest text-black dark:text-white">
                {section.title}
              </span>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors duration-150"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-wide text-zinc-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} DESIGN STUDIO. All rights reserved.
          </p>
          <p className="text-[10px] tracking-wide text-zinc-400 dark:text-zinc-500">
            Premium Fashion E-Commerce Core powered by Medusa v2.
          </p>
        </div>
      </div>
    </footer>
  )
}
