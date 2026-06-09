'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { ChevronLeft, Rocket } from 'lucide-react'
import { toast } from 'sonner'
import { ChatPanel } from '@/components/builder/chat-panel'
import { PreviewPanel } from '@/components/builder/preview-panel'
import { Button } from '@/components/ui/button'
import { getMessageText, parseGeneration } from '@/lib/parse'

export function Workspace() {
  const searchParams = useSearchParams()
  const initialPrompt = searchParams.get('prompt') ?? ''
  const [input, setInput] = useState('')
  const sentInitial = useRef(false)

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: '/api/generate' }),
    onError: () =>
      toast.error('Generation failed. Please check your connection and retry.'),
  })

  // Auto-send the prompt passed from the landing page once.
  useEffect(() => {
    if (initialPrompt && !sentInitial.current) {
      sentInitial.current = true
      sendMessage({ text: initialPrompt })
    }
  }, [initialPrompt, sendMessage])

  function handleSubmit() {
    const text = input.trim()
    if (!text) return
    sendMessage({ text })
    setInput('')
  }

  // Find the latest assistant message that contains code.
  const { code, isStreaming, version } = useMemo(() => {
    let latest: string | null = null
    let streaming = false
    let count = 0
    for (const m of messages) {
      if (m.role !== 'assistant') continue
      const { code: c, streaming: s } = parseGeneration(getMessageText(m))
      if (c !== null && c.trim()) {
        latest = c
        streaming = s
        count += 1
      }
    }
    return {
      code: latest,
      isStreaming: streaming && status === 'streaming',
      version: count,
    }
  }, [messages, status])

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-border px-3">
        <div className="flex min-w-0 items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            nativeButton={false}
            render={
              <Link href="/dashboard">
                <ChevronLeft className="size-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            }
          />
          <span className="hidden text-sm text-muted-foreground sm:inline">/</span>
          <span className="truncate text-sm font-medium">Untitled build</span>
        </div>
        <Button
          size="sm"
          onClick={() =>
            toast.success('Deployed to forge.app/untitled-build', {
              description: 'Your build is now live.',
            })
          }
          disabled={!code}
        >
          <Rocket className="size-4" />
          <span className="hidden sm:inline">Deploy</span>
        </Button>
      </header>

      {/* Split layout */}
      <div className="grid min-h-0 flex-1 grid-rows-2 lg:grid-cols-[minmax(340px,420px)_1fr] lg:grid-rows-1">
        <div className="min-h-0 border-b border-border lg:border-b-0 lg:border-r">
          <ChatPanel
            messages={messages}
            status={status}
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
            onStop={stop}
          />
        </div>
        <div className="min-h-0">
          <PreviewPanel code={code} isStreaming={isStreaming} version={version} />
        </div>
      </div>
    </div>
  )
}
