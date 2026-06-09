'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowUpRight,
  Clock,
  GitBranch,
  Globe,
  Lock,
  Plus,
  Search,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PROJECTS, STARTER_PROMPTS, type Project } from '@/lib/data'
import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<Project['status'], string> = {
  Deployed: 'bg-primary/15 text-primary',
  Building: 'bg-chart-3/15 text-chart-3',
  Draft: 'bg-secondary text-muted-foreground',
}

export function DashboardView() {
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const [query, setQuery] = useState('')

  function startBuild(p: string) {
    const t = p.trim()
    if (!t) return
    router.push(`/chat?prompt=${encodeURIComponent(t)}`)
  }

  const filtered = useMemo(
    () =>
      PROJECTS.filter((p) =>
        (p.name + p.description).toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  )

  const stats = [
    { label: 'Total projects', value: PROJECTS.length },
    {
      label: 'Deployed',
      value: PROJECTS.filter((p) => p.status === 'Deployed').length,
    },
    {
      label: 'Total versions',
      value: PROJECTS.reduce((a, p) => a + p.versions, 0),
    },
    { label: 'Credits left', value: '∞' },
  ]

  return (
    <div className="space-y-10">
      {/* New build */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-[120px]" />
        <div className="relative">
          <h2 className="text-xl font-semibold tracking-tight">
            Start a new build
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Describe what you want and Forge will generate it instantly.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              startBuild(prompt)
            }}
            className="mt-4 flex flex-col gap-2 sm:flex-row"
          >
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A pricing page with three tiers and a FAQ"
              className="h-11 flex-1 rounded-lg border border-border bg-background px-3.5 text-sm placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none"
            />
            <Button type="submit" className="h-11" disabled={!prompt.trim()}>
              <Sparkles className="size-4" />
              Generate
            </Button>
          </form>
          <div className="mt-3 flex flex-wrap gap-2">
            {STARTER_PROMPTS.slice(0, 4).map((p) => (
              <button
                key={p}
                onClick={() => startBuild(p)}
                className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {p.length > 38 ? p.slice(0, 38) + '…' : p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="text-3xl font-semibold tracking-tight">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Your projects</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects…"
                className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none sm:w-56"
              />
            </div>
            <Button size="sm" onClick={() => startBuild('A new app')}>
              <Plus className="size-4" />
              New
            </Button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => router.push('/chat')}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="grid size-9 place-items-center rounded-lg bg-secondary text-primary">
                    {p.visibility === 'Public' ? (
                      <Globe className="size-4" />
                    ) : (
                      <Lock className="size-4" />
                    )}
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-xs font-medium',
                      STATUS_STYLES[p.status],
                    )}
                  >
                    {p.status}
                  </span>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              <h3 className="mt-4 font-medium">{p.name}</h3>
              <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">
                {p.description}
              </p>

              <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {p.updatedAt}
                </span>
                <span className="flex items-center gap-1">
                  <GitBranch className="size-3.5" />
                  {p.versions} versions
                </span>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center text-muted-foreground">
            No projects match “{query}”.
          </div>
        )}
      </div>
    </div>
  )
}
