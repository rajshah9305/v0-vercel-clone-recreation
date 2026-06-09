'use client'

import { Settings, Moon, Sun, LogOut, X, Eye, EyeOff, Check } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ApiConfig {
  apiKey: string
  baseUrl: string
  modelName: string
}

export function SettingsMenu() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [saved, setSaved] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  
  const [config, setConfig] = useState<ApiConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aiConfig')
      return saved ? JSON.parse(saved) : { apiKey: '', baseUrl: '', modelName: 'gpt-4' }
    }
    return { apiKey: '', baseUrl: '', modelName: 'gpt-4' }
  })

  const AI_MODELS = [
    'gpt-4',
    'gpt-4-turbo',
    'gpt-3.5-turbo',
    'claude-3-opus',
    'claude-3-sonnet',
    'mistral-large',
    'llama-2-70b',
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
        setShowSettings(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleSaveConfig = () => {
    localStorage.setItem('aiConfig', JSON.stringify(config))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleResetConfig = () => {
    setConfig({ apiKey: '', baseUrl: '', modelName: 'gpt-4' })
    localStorage.removeItem('aiConfig')
  }

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

      {open && !showSettings && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-card shadow-lg z-50">
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

            {/* API Configuration */}
            <button
              onClick={() => setShowSettings(true)}
              className={cn(
                'w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              <Settings className="size-4" />
              <span>API Settings</span>
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

      {showSettings && (
        <div className="absolute right-0 top-full mt-2 w-96 rounded-lg border border-border bg-card shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="sticky top-0 flex items-center justify-between bg-card border-b border-border p-4">
            <h3 className="font-semibold text-foreground">API Configuration</h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close settings"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* API Key */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                API Key
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={config.apiKey}
                  onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                  placeholder="sk-..."
                  className={cn(
                    'w-full px-3 py-2 pr-10 rounded-md text-sm bg-secondary border border-border',
                    'text-foreground placeholder:text-muted-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-primary/50'
                  )}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Base URL */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Base URL
              </label>
              <input
                type="text"
                value={config.baseUrl}
                onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
                placeholder="https://api.openai.com/v1"
                className={cn(
                  'w-full px-3 py-2 rounded-md text-sm bg-secondary border border-border',
                  'text-foreground placeholder:text-muted-foreground',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50'
                )}
              />
            </div>

            {/* Model Selection */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                AI Model
              </label>
              <select
                value={config.modelName}
                onChange={(e) => setConfig({ ...config, modelName: e.target.value })}
                className={cn(
                  'w-full px-3 py-2 rounded-md text-sm bg-secondary border border-border',
                  'text-foreground',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50',
                  'appearance-none cursor-pointer'
                )}
              >
                {AI_MODELS.map((model) => (
                  <option key={model} value={model} className="bg-card text-foreground">
                    {model}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-border">
              <button
                onClick={handleSaveConfig}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  'bg-primary text-primary-foreground hover:bg-primary/80'
                )}
              >
                {saved ? (
                  <>
                    <Check className="size-4" />
                    <span>Saved</span>
                  </>
                ) : (
                  <span>Save Configuration</span>
                )}
              </button>
              <button
                onClick={handleResetConfig}
                className={cn(
                  'flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                )}
              >
                Reset
              </button>
            </div>

            {/* Info Message */}
            <div className="text-xs text-muted-foreground bg-secondary/50 rounded-md p-2">
              Configuration is saved locally in your browser. Never share your API key publicly.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
