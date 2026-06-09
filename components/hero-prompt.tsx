'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowUp, Paperclip, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { STARTER_PROMPTS } from '@/lib/data'

export function HeroPrompt() {
  const router = useRouter()
  const [value, setValue] = useState('')

  function submit(prompt: string) {
    const p = prompt.trim()
    if (!p) return
    router.push(`/chat?prompt=${encodeURIComponent(p)}`)
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(value)
        }}
        className="rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-black/40 ring-1 ring-primary/10 transition-colors focus-within:border-primary/40"
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              submit(value)
            }
          }}
          rows={3}
          placeholder="Describe the app or page you want to build..."
          className="w-full resize-none bg-transparent px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <div className="flex items-center justify-between px-1 pb-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
          >
            <Paperclip className="size-4" />
            Attach
          </Button>
          <Button type="submit" size="sm" disabled={!value.trim()}>
            Generate
            <ArrowUp className="size-4" />
          </Button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          Try:
        </span>
        {STARTER_PROMPTS.slice(0, 3).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => submit(p)}
            className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {p.length > 42 ? p.slice(0, 42) + '…' : p}
          </button>
        ))}
      </div>
    </div>
  )
}
