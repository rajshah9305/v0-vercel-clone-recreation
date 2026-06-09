'use client'

import { Settings, Moon, Sun, LogOut } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function SettingsMenu() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        aria-label="Settings"
        className="hover:bg-secondary"
      >
        <Settings className="size-5" />
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-card shadow-lg">
          <div className="p-2">
            {/* Theme Toggle */}
            <button
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
                setOpen(false)
              }}
              className={cn(
                'w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="size-4" />
                  <span>Light mode</span>
                </>
              ) : (
                <>
                  <Moon className="size-4" />
                  <span>Dark mode</span>
                </>
              )}
            </button>

            <div className="my-1 border-t border-border" />

            {/* Sign Out */}
            <button
              onClick={() => {
                // TODO: Implement sign out logic
                setOpen(false)
              }}
              className={cn(
                'w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              <LogOut className="size-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
