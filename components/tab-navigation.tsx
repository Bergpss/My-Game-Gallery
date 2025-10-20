"use client"

import { ShelfType, SHELF_LABELS } from '@/lib/types'
import { cn } from '@/lib/utils'

interface TabNavigationProps {
  activeTab: ShelfType
  onTabChange: (tab: ShelfType) => void
  stats: Record<ShelfType, number>
}

export function TabNavigation({ activeTab, onTabChange, stats }: TabNavigationProps) {
  const tabs: ShelfType[] = ['progress', 'wishlist', 'complete', 'dropped']

  return (
    <div className="border-b border-border">
      <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors",
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
            )}
          >
            {SHELF_LABELS[tab]}
            <span className="ml-2 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
              {stats[tab]}
            </span>
          </button>
        ))}
      </nav>
    </div>
  )
}
