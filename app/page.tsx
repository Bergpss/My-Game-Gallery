"use client"

import { useState, useMemo, useEffect } from 'react'
import { GameCard } from '@/components/game-card'
import { SearchBar } from '@/components/search-bar'
import { TabNavigation } from '@/components/tab-navigation'
import { ThemeToggle } from '@/components/theme-toggle'
import { ShelfType, ShelfMark, searchGames } from '@/lib/types'

export default function Home() {
  const [activeTab, setActiveTab] = useState<ShelfType>('progress')
  const [searchQuery, setSearchQuery] = useState('')
  const [gamesByShelf, setGamesByShelf] = useState<Record<ShelfType, ShelfMark[]>>({
    wishlist: [],
    progress: [],
    complete: [],
    dropped: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch games on mount
  useEffect(() => {
    async function fetchGames() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/games')

        if (!response.ok) {
          throw new Error('Failed to fetch games')
        }

        const data = await response.json()
        setGamesByShelf(data.games)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching games:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGames()
  }, [])

  // Calculate stats
  const stats = useMemo(() => {
    return {
      wishlist: gamesByShelf.wishlist.length,
      progress: gamesByShelf.progress.length,
      complete: gamesByShelf.complete.length,
      dropped: gamesByShelf.dropped.length,
    }
  }, [gamesByShelf])

  // Filter games based on search query
  const filteredGames = useMemo(() => {
    return searchGames(gamesByShelf[activeTab], searchQuery)
  }, [gamesByShelf, activeTab, searchQuery])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">My Game Gallery</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="搜索游戏..."
          />
        </div>

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          stats={stats}
        />

        {/* Games Grid */}
        <div className="mt-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-lg text-muted-foreground">加载中...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg text-destructive">加载失败</p>
              <p className="mt-2 text-sm text-muted-foreground">{error}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                请确保在 .env.local 中配置了 NEODB_ACCESS_TOKEN
              </p>
            </div>
          ) : filteredGames.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg text-muted-foreground">
                {searchQuery ? '未找到匹配的游戏' : '暂无游戏数据'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredGames.map((game) => (
                <GameCard key={game.item.uuid} game={game} />
              ))}
            </div>
          )}
        </div>

        {/* Search Results Info */}
        {searchQuery && filteredGames.length > 0 && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            找到 {filteredGames.length} 个结果
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border py-6">
        <div className="container mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground">
          <p>数据来源：NeoDB</p>
        </div>
      </footer>
    </div>
  )
}
