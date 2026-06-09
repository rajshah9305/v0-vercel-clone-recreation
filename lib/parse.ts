import type { UIMessage } from 'ai'

export function getMessageText(message: UIMessage): string {
  if (!message.parts || !Array.isArray(message.parts)) return ''
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('')
}

/** Splits an assistant message into its prose intro and the HTML code block. */
export function parseGeneration(text: string): {
  intro: string
  code: string | null
  streaming: boolean
} {
  const fenceStart = text.indexOf('```')
  if (fenceStart === -1) {
    return { intro: text.trim(), code: null, streaming: false }
  }

  const intro = text.slice(0, fenceStart).trim()
  // Skip the opening fence + optional language tag line
  const afterFence = text.slice(fenceStart + 3)
  const newline = afterFence.indexOf('\n')
  const body = newline === -1 ? '' : afterFence.slice(newline + 1)

  const closeFence = body.indexOf('```')
  if (closeFence === -1) {
    // Still streaming the code block
    return { intro, code: body, streaming: true }
  }
  return { intro, code: body.slice(0, closeFence).trim(), streaming: false }
}
