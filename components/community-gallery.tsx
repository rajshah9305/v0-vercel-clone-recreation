'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, GitFork, Heart, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CATEGORIES, COMMUNITY_BUILDS } from '@/lib/data'
import { cn } from '@/lib/utils'

function compact(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n)
}

export function CommunityGallery() {
  const router = useRouter()
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return COMMUNITY_BUILDS.filter((b) => {
      const matchesCat = active === 'All' || b.category === active
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.prompt.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
      return matchesCat && matchesQuery
    })
  }, [active, query])

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search builds, prompts, creators…"
            className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                active === cat
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b) => (
          <article
            key={b.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
          >
            <div
              className="relative aspect-video bg-dots"
              style={{ backgroundColor: 'oklch(0.18 0.004 285)' }}
            >
              <div
                className="absolute inset-0 opacity-30 blur-2xl"
                style={{ background: b.accent }}
              />
              <span className="absolute left-3 top-3 rounded-full border border-border bg-background/70 px-2.5 py-1 text-xs text-foreground backdrop-blur">
                {b.category}
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-mono text-sm font-medium opacity-80"
                  style={{ color: b.accent }}
                >
                  {b.title}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-medium">{b.title}</h3>
              <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">
                {b.prompt}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <span
                    className="grid size-6 place-items-center rounded-full text-[10px] font-semibold text-primary-foreground"
                    style={{ background: b.accent }}
                  >
                    {b.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    @{b.authorHandle}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="size-3.5" />
                    {compact(b.likes)}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="size-3.5" />
                    {compact(b.forks)}
                  </span>
                  <span className="hidden items-center gap-1 sm:flex">
                    <Eye className="size-3.5" />
                    {compact(b.views)}
                  </span>
                </div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="mt-4 w-full"
                onClick={() => router.push(`/chat?prompt=${encodeURIComponent(b.prompt)}`)}
              >
                <GitFork className="size-4" />
                Remix this build
              </Button>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-muted-foreground">
          No builds match your search. Try a different filter.
        </div>
      )}
    </div>
  )
}
