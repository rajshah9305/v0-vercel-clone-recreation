import { Suspense } from 'react'
import { Workspace } from '@/components/builder/workspace'

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-background" />}>
      <Workspace />
    </Suspense>
  )
}
