import { DashboardView } from '@/components/dashboard-view'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export const metadata = {
  title: 'Dashboard — Forge',
  description: 'Manage your Forge projects and start new builds.',
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="mt-1 text-muted-foreground">
              Pick up where you left off or start something new.
            </p>
          </div>
          <DashboardView />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
