'use client'

import { useEffect, useRef } from 'react'

export function CodeBlock({ code }: { code: string }) {
  const endRef = useRef<HTMLDivElement>(null)
  const lines = code.split('\n')

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [code])

  return (
    <div className="h-full overflow-auto bg-[oklch(0.14_0.004_285)] font-mono text-[13px] leading-6">
      <pre className="min-w-full">
        <code className="grid">
          {lines.map((line, i) => (
            <span key={i} className="grid grid-cols-[3rem_1fr]">
              <span className="select-none border-r border-border/60 pr-3 text-right text-muted-foreground/50">
                {i + 1}
              </span>
              <span className="whitespace-pre-wrap break-words pl-4 text-foreground/90">
                {line || ' '}
              </span>
            </span>
          ))}
        </code>
      </pre>
      <div ref={endRef} />
    </div>
  )
}
