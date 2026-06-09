import Link from 'next/link'
import {
  ArrowRight,
  Boxes,
  Code2,
  Eye,
  GitBranch,
  Globe,
  Layers,
  MessageSquare,
  Rocket,
  Wand2,
  Zap,
} from 'lucide-react'
import { HeroPrompt } from '@/components/hero-prompt'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { COMMUNITY_BUILDS } from '@/lib/data'

const FEATURES = [
  {
    icon: MessageSquare,
    title: 'Chat to build',
    desc: 'Describe what you want in plain language. Forge writes the code and shows you a live preview instantly.',
  },
  {
    icon: Eye,
    title: 'Live preview',
    desc: 'Every change renders in real time in an isolated sandbox. No setup, no refresh, no waiting.',
  },
  {
    icon: Code2,
    title: 'Real, editable code',
    desc: 'Production-grade output you can read, copy, and own. No black boxes, no lock-in.',
  },
  {
    icon: GitBranch,
    title: 'Version history',
    desc: 'Fork and roll back to any version. Branch ideas without fear of losing your work.',
  },
  {
    icon: Globe,
    title: 'One-click deploy',
    desc: 'Ship to a live URL the moment it looks right. Share with your team in seconds.',
  },
  {
    icon: Boxes,
    title: 'Community gallery',
    desc: 'Remix thousands of builds from the community as a starting point for your own.',
  },
]

const STEPS = [
  {
    icon: Wand2,
    title: 'Describe it',
    desc: 'Type a sentence or paste a screenshot. Forge understands intent, not just keywords.',
  },
  {
    icon: Layers,
    title: 'Refine it',
    desc: 'Iterate by chatting. Adjust layout, colors, and logic until it is exactly right.',
  },
  {
    icon: Rocket,
    title: 'Ship it',
    desc: 'Deploy to production or export the code. From idea to live in minutes.',
  },
]

const STATS = [
  { value: '2.4M+', label: 'Builds generated' },
  { value: '180K+', label: 'Active builders' },
  { value: '12s', label: 'Median first preview' },
  { value: '99.9%', label: 'Uptime' },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
          <div className="pointer-events-none absolute -top-40 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-primary/15 blur-[160px]" />
          <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 text-center md:pt-28">
            <Link
              href="/community"
              className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex size-1.5 rounded-full bg-primary" />
              New: remix any community build in one click
              <ArrowRight className="size-3" />
            </Link>

            <h1 className="mx-auto max-w-3xl text-balance text-5xl font-semibold tracking-tight md:text-7xl">
              Build the web by{' '}
              <span className="text-primary">chatting</span> with AI
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Forge turns a single sentence into shipping-ready interfaces.
              Generate, preview, and refine full apps in real time — no setup
              required.
            </p>

            <div className="mt-10">
              <HeroPrompt />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-6 py-8 text-center">
                <div className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <span className="text-sm font-medium text-primary">
              Everything you need
            </span>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight">
              From prompt to production, all in one place
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Forge handles the whole loop — generation, preview, iteration, and
              deploy — so you can focus on the idea.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group bg-card p-7 transition-colors hover:bg-accent"
              >
                <div className="grid size-10 place-items-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-medium">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-border bg-card/40">
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-medium text-primary">
                How it works
              </span>
              <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight">
                Three steps from idea to live
              </h2>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-border bg-background p-8"
                >
                  <span className="absolute right-6 top-6 text-5xl font-semibold text-border">
                    {i + 1}
                  </span>
                  <div className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <step.icon className="size-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-medium">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-sm font-medium text-primary">
                From the community
              </span>
              <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight">
                Built with Forge
              </h2>
            </div>
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <Link href="/community">
                  Explore gallery
                  <ArrowRight className="size-4" />
                </Link>
              }
            />
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COMMUNITY_BUILDS.slice(0, 6).map((b) => (
              <Link
                key={b.id}
                href="/community"
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
              >
                <div
                  className="relative aspect-video bg-dots"
                  style={{
                    backgroundColor: 'oklch(0.2 0.004 285)',
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-25 blur-2xl"
                    style={{ background: b.accent }}
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <Zap
                      className="size-8 text-foreground/70"
                      style={{ color: b.accent }}
                    />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{b.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {(b.likes / 1000).toFixed(1)}k likes
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                    {b.prompt}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    by @{b.authorHandle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-20 text-center">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
            <div className="pointer-events-none absolute -bottom-32 left-1/2 size-[480px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                Your next idea is one sentence away
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
                Join 180,000+ builders shipping faster with Forge. Free to start
                — no credit card required.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={
                    <Link href="/chat">
                      Start building free
                      <ArrowRight className="size-4" />
                    </Link>
                  }
                />
                <Button
                  size="lg"
                  variant="outline"
                  nativeButton={false}
                  render={<Link href="/community">Browse community</Link>}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
