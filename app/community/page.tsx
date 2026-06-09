import { CommunityGallery } from '@/components/community-gallery'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export const metadata = {
  title: 'Community — Forge',
  description: 'Explore and remix thousands of builds made with Forge.',
}

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
          <div className="pointer-events-none absolute -top-32 left-1/2 size-[480px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
          <div className="relative mx-auto max-w-7xl px-6 py-20 text-center">
            <span className="text-sm font-medium text-primary">Community</span>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              Explore what people are building
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
              Browse thousands of real builds from the Forge community. Found
              one you like? Remix it as a starting point for your own.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <CommunityGallery />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
