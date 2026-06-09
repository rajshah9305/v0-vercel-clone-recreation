import Link from 'next/link'
import { Logo } from '@/components/logo'

const COLS = [
  {
    title: 'Product',
    links: ['Builder', 'Community', 'Dashboard', 'Pricing', 'Changelog'],
  },
  {
    title: 'Resources',
    links: ['Docs', 'Templates', 'Guides', 'Components', 'API'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers', 'Customers', 'Contact'],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              The AI builder that turns plain language into shipping-ready
              interfaces. Describe it, preview it, ship it.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-medium">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Forge Labs. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground">
              Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
