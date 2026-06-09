import Link from 'next/link'
import { Logo } from '@/components/logo'

type FooterLink = { label: string; href: string }
type FooterColumn = { title: string; links: FooterLink[] }

const COLS: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Builder', href: '/chat' },
      { label: 'Community', href: '/community' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Pricing', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '#' },
      { label: 'Templates', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Components', href: '#' },
      { label: 'API', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Customers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
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
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
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
