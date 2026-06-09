'use client'

import { useState } from 'react'
import {
  Check,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Eye,
  Loader2,
  Monitor,
  RefreshCw,
  Smartphone,
} from 'lucide-react'
import { CodeBlock } from '@/components/builder/code-block'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = {
  code: string | null
  isStreaming: boolean
  version: number
}

export function PreviewPanel({ code, isStreaming, version }: Props) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [copied, setCopied] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)

  async function copy() {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  function download() {
    if (!code) return
    const blob = new Blob([code], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'forge-build.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  const hasCode = Boolean(code && code.trim())

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Toolbar */}
      <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border px-3">
        <div className="flex items-center gap-1 rounded-lg bg-secondary p-0.5">
          <button
            onClick={() => setTab('preview')}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors',
              tab === 'preview'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Eye className="size-3.5" />
            Preview
          </button>
          <button
            onClick={() => setTab('code')}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors',
              tab === 'code'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <Code2 className="size-3.5" />
            Code
          </button>
        </div>

        <div className="flex items-center gap-1">
          {isStreaming && (
            <span className="mr-1 flex items-center gap-1.5 text-xs text-primary">
              <Loader2 className="size-3.5 animate-spin" />
              Generating
            </span>
          )}
          {tab === 'preview' && (
            <div className="mr-1 hidden items-center gap-0.5 rounded-lg bg-secondary p-0.5 sm:flex">
              <button
                onClick={() => setDevice('desktop')}
                className={cn(
                  'rounded-md p-1.5 transition-colors',
                  device === 'desktop'
                    ? 'bg-background text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                aria-label="Desktop view"
              >
                <Monitor className="size-3.5" />
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={cn(
                  'rounded-md p-1.5 transition-colors',
                  device === 'mobile'
                    ? 'bg-background text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                aria-label="Mobile view"
              >
                <Smartphone className="size-3.5" />
              </button>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground"
            disabled={!hasCode}
            onClick={() => setIframeKey((k) => k + 1)}
            aria-label="Refresh preview"
          >
            <RefreshCw className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground"
            disabled={!hasCode}
            onClick={copy}
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="size-3.5 text-primary" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground"
            disabled={!hasCode}
            onClick={download}
            aria-label="Download code"
          >
            <Download className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="relative min-h-0 flex-1">
        {!hasCode ? (
          <EmptyState />
        ) : tab === 'preview' ? (
          <div className="flex h-full items-stretch justify-center bg-[oklch(0.13_0.004_285)] p-0 sm:p-4">
            <div
              className={cn(
                'h-full overflow-hidden bg-white transition-all duration-300 sm:rounded-lg sm:border sm:border-border sm:shadow-xl',
                device === 'mobile' ? 'w-full max-w-[390px]' : 'w-full',
              )}
            >
              <iframe
                key={iframeKey}
                srcDoc={code ?? ''}
                title="Live preview"
                className="size-full"
                sandbox="allow-scripts allow-forms allow-popups allow-modals"
              />
            </div>
          </div>
        ) : (
          <CodeBlock code={code ?? ''} />
        )}
      </div>

      {/* Status bar */}
      <div className="flex h-8 shrink-0 items-center justify-between border-t border-border px-3 text-xs text-muted-foreground">
        <span className="font-mono">forge-build.html</span>
        <div className="flex items-center gap-3">
          <span>v{version}</span>
          {hasCode && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                const w = window.open()
                if (w && code) {
                  w.document.write(code)
                  w.document.close()
                }
              }}
              className="flex items-center gap-1 hover:text-foreground"
            >
              <ExternalLink className="size-3" />
              Open
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="grid h-full place-items-center bg-dots p-8 text-center">
      <div className="max-w-sm">
        <div className="mx-auto grid size-12 place-items-center rounded-xl border border-border bg-card text-primary">
          <Eye className="size-5" />
        </div>
        <h3 className="mt-4 font-medium">Your preview will appear here</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Describe what you want to build in the chat and Forge will render a
          live, interactive preview right here.
        </p>
      </div>
    </div>
  )
}
