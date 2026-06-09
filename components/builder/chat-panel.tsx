'use client'

import { useEffect, useRef } from 'react'
import type { UIMessage } from 'ai'
import { ArrowUp, Loader2, Square } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { getMessageText, parseGeneration } from '@/lib/parse'
import { cn } from '@/lib/utils'

type Props = {
  messages: UIMessage[]
  status: string
  input: string
  setInput: (v: string) => void
  onSubmit: () => void
  onStop: () => void
}

export function ChatPanel({
  messages,
  status,
  input,
  setInput,
  onSubmit,
  onStop,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const busy = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, status])

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-4">
        <Logo className="[&_span:last-child]:hidden sm:[&_span:last-child]:inline" />
        <span className="ml-auto text-xs text-muted-foreground">Builder</span>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="mt-6 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
            <p className="font-medium text-foreground">Welcome to the Builder</p>
            <p className="mt-1">
              Describe a page or app and Forge will generate it with a live
              preview. Then keep chatting to refine it.
            </p>
          </div>
        )}

        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        {status === 'submitted' && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin text-primary" />
            Thinking…
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-border p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!busy) onSubmit()
          }}
          className="rounded-xl border border-border bg-background p-2 transition-colors focus-within:border-primary/40"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                if (!busy && input.trim()) onSubmit()
              }
            }}
            rows={2}
            placeholder="Describe a change or a new build…"
            className="w-full resize-none bg-transparent px-2 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] text-muted-foreground">
              Enter to send · Shift+Enter for newline
            </span>
            {busy ? (
              <Button type="button" size="icon" className="size-8" onClick={onStop}>
                <Square className="size-3.5" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                className="size-8"
                disabled={!input.trim()}
              >
                <ArrowUp className="size-4" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: UIMessage }) {
  const text = getMessageText(message)

  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground">
          {text}
        </div>
      </div>
    )
  }

  const { intro, code, streaming } = parseGeneration(text)

  return (
    <div className="flex gap-2.5">
      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden="true">
          <path
            d="M4 6 L12 18 L20 6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="min-w-0 flex-1 space-y-2.5">
        {intro && (
          <p className="text-sm leading-relaxed text-foreground/90">{intro}</p>
        )}
        {code !== null && (
          <div
            className={cn(
              'flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5',
              !streaming && 'border-primary/30',
            )}
          >
            <span className="grid size-7 place-items-center rounded-md bg-secondary">
              {streaming ? (
                <Loader2 className="size-3.5 animate-spin text-primary" />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="size-3.5 text-primary"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m8 6-6 6 6 6M16 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">forge-build.html</p>
              <p className="text-xs text-muted-foreground">
                {streaming ? 'Generating…' : 'Generated · view in preview'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
