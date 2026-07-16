"use client"

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  MagnifyingGlass,
  X,
} from '@phosphor-icons/react'
import { ThemeToggle } from '@/components/theme-toggle'
import { GAME_JOURNAL_ENTRIES, GameJournalEntry } from '@/lib/journal'
import {
  ShelfMark,
  ShelfType,
  SHELF_LABELS,
} from '@/lib/types'

interface GameGalleryProps {
  gamesByShelf: Record<ShelfType, ShelfMark[]>
  dataError?: string | null
}

interface GalleryItem {
  key: string
  title: string
  coverImageUrl: string
  shelfType: ShelfType
  href?: string
  journal?: GameJournalEntry
  source: 'neodb' | 'journal'
}

const SHELF_ORDER: ShelfType[] = [
  'progress',
  'wishlist',
  'complete',
  'dropped',
]

function normalizeTitle(title: string) {
  return title.trim().toLocaleLowerCase()
}

function buildGalleryShelves(
  gamesByShelf: Record<ShelfType, ShelfMark[]>
): Record<ShelfType, GalleryItem[]> {
  const shelves = SHELF_ORDER.reduce(
    (result, shelfType) => {
      result[shelfType] = gamesByShelf[shelfType].map((mark) => ({
        key: `neodb-${mark.item.uuid}`,
        title: mark.item.display_title,
        coverImageUrl: mark.item.cover_image_url,
        shelfType,
        href: mark.item.id,
        source: 'neodb' as const,
      }))
      return result
    },
    {} as Record<ShelfType, GalleryItem[]>
  )

  for (const entry of GAME_JOURNAL_ENTRIES) {
    let matchedItem: GalleryItem | undefined

    for (const shelfType of SHELF_ORDER) {
      const matchIndex = shelves[shelfType].findIndex(
        (item) => normalizeTitle(item.title) === normalizeTitle(entry.title)
      )

      if (matchIndex >= 0) {
        matchedItem = shelves[shelfType][matchIndex]
        shelves[shelfType] = shelves[shelfType].filter(
          (_, index) => index !== matchIndex
        )
        break
      }
    }

    shelves[entry.shelfType].unshift({
      key: matchedItem?.key ?? `journal-${entry.id}`,
      title: entry.title,
      coverImageUrl: matchedItem?.coverImageUrl || entry.coverImageUrl,
      shelfType: entry.shelfType,
      href: matchedItem?.href,
      journal: entry,
      source: matchedItem ? 'neodb' : 'journal',
    })
  }

  return shelves
}

function formatJournalDate(date: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Shanghai',
  }).format(new Date(`${date}T00:00:00+08:00`))
}

export function GameGallery({ gamesByShelf, dataError }: GameGalleryProps) {
  const shelves = useMemo(
    () => buildGalleryShelves(gamesByShelf),
    [gamesByShelf]
  )
  const [activeShelf, setActiveShelf] = useState<ShelfType>('progress')
  const [selectedKey, setSelectedKey] = useState<string | null>(
    shelves.progress[0]?.key ?? null
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [timelineOpen, setTimelineOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchInputRef.current?.focus()
      }

      if (event.key === 'Escape') {
        setTimelineOpen(false)
      }
    }

    document.addEventListener('keydown', handleShortcut)
    return () => document.removeEventListener('keydown', handleShortcut)
  }, [])

  const filteredItems = useMemo(() => {
    const query = normalizeTitle(searchQuery)
    if (!query) return shelves[activeShelf]

    return shelves[activeShelf].filter((item) =>
      normalizeTitle(item.title).includes(query)
    )
  }, [activeShelf, searchQuery, shelves])

  const stageItems = filteredItems

  const selectedItem =
    stageItems.find((item) => item.key === selectedKey) ??
    stageItems[0] ??
    null

  const selectedPosition = selectedItem
    ? stageItems.findIndex((item) => item.key === selectedItem.key)
    : -1

  function changeShelf(shelfType: ShelfType) {
    setActiveShelf(shelfType)
    setSearchQuery('')
    setSelectedKey(shelves[shelfType][0]?.key ?? null)
  }

  function selectItem(item: GalleryItem, target: HTMLButtonElement) {
    setSelectedKey(item.key)

    requestAnimationFrame(() => {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    })
  }

  return (
    <div className="gallery-shell">
      <header className="gallery-header">
        <a className="gallery-brand" href="#gallery" aria-label="返回游戏展廊">
          Berg Game Gallery
        </a>

        <label className="gallery-search">
          <MagnifyingGlass aria-hidden="true" weight="regular" />
          <span className="sr-only">搜索当前分类的游戏</span>
          <input
            ref={searchInputRef}
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="搜索游戏..."
          />
          {searchQuery ? (
            <button
              type="button"
              className="search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="清空搜索"
            >
              <X aria-hidden="true" />
            </button>
          ) : (
            <kbd>⌘K</kbd>
          )}
        </label>

        <ThemeToggle />
      </header>

      <main id="gallery" className="gallery-main">
        <nav className="shelf-tabs" aria-label="游戏收藏分类">
          {SHELF_ORDER.map((shelfType) => (
            <button
              key={shelfType}
              type="button"
              className={activeShelf === shelfType ? 'is-active' : undefined}
              onClick={() => changeShelf(shelfType)}
              aria-pressed={activeShelf === shelfType}
            >
              <span>{SHELF_LABELS[shelfType]}</span>
              <span className="shelf-count">{shelves[shelfType].length}</span>
            </button>
          ))}
        </nav>

        {dataError && (
          <p className="data-notice" role="status">
            NeoDB 暂时未连接，当前仍可浏览本地游戏记录。
          </p>
        )}

        <div className="gallery-workspace">
          <section className="cover-stage" aria-label="游戏封面展廊">
            {stageItems.length > 0 ? (
              <>
                <div className="cover-stage-meta" aria-live="polite">
                  <span>{SHELF_LABELS[activeShelf]} · 固定顺序</span>
                  {selectedPosition >= 0 && (
                    <span>
                      {String(selectedPosition + 1).padStart(2, '0')} /{' '}
                      {String(stageItems.length).padStart(2, '0')}
                    </span>
                  )}
                </div>

                <div className="cover-rail">
                  {stageItems.map((item, index) => {
                    const isSelected = item.key === selectedItem?.key
                    return (
                      <button
                        key={item.key}
                        type="button"
                        className={`cover-item${isSelected ? ' is-selected' : ''}`}
                        onClick={(event) => selectItem(item, event.currentTarget)}
                        aria-pressed={isSelected}
                        aria-label={`查看 ${item.title} 的记录`}
                      >
                        <Image
                          src={item.coverImageUrl}
                          alt={`${item.title} 游戏封面`}
                          fill
                          sizes={
                            isSelected
                              ? '(max-width: 760px) 78vw, 350px'
                              : '(max-width: 760px) 34vw, 180px'
                          }
                          priority={isSelected}
                          className="cover-image"
                        />

                        <span className="cover-index" aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        {isSelected && (
                          <span className="cover-caption">
                            <strong>{item.title}</strong>
                            <span className="cover-meta">
                              <span>{SHELF_LABELS[item.shelfType]}</span>
                              {item.journal && (
                                <time dateTime={item.journal.date}>
                                  {formatJournalDate(item.journal.date)}
                                </time>
                              )}
                            </span>
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </>
            ) : (
              <div className="gallery-empty">
                <p>{searchQuery ? '没有找到匹配的游戏。' : '这个分类还没有游戏。'}</p>
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')}>
                    清空搜索
                  </button>
                )}
              </div>
            )}
          </section>

          <JournalPanel
            item={selectedItem}
            onOpenTimeline={() => setTimelineOpen(true)}
          />
        </div>
      </main>

      <footer className="gallery-footer">
        <span>收藏数据：NeoDB</span>
        <span aria-hidden="true">·</span>
        <span>游戏记录：本地</span>
      </footer>

      {timelineOpen && (
        <TimelineDialog onClose={() => setTimelineOpen(false)} />
      )}
    </div>
  )
}

function JournalPanel({
  item,
  onOpenTimeline,
}: {
  item: GalleryItem | null
  onOpenTimeline: () => void
}) {
  if (!item) {
    return (
      <aside className="journal-panel" aria-live="polite">
        <span className="journal-eyebrow">本次记录</span>
        <p className="journal-placeholder">选择一款游戏查看记录。</p>
      </aside>
    )
  }

  const usesDisplayTitle =
    /^[A-Za-z0-9 :'-]+$/.test(item.title) && item.title.length <= 20

  return (
    <aside className="journal-panel" aria-live="polite">
      <div>
        <span className="journal-eyebrow">本次记录</span>
        <h1
          className={
            usesDisplayTitle ? 'journal-title-display' : 'journal-title-long'
          }
        >
          {item.title}
        </h1>
        <span className="journal-accent" aria-hidden="true" />

        <dl className="journal-meta">
          <div>
            <dt>状态</dt>
            <dd>{SHELF_LABELS[item.shelfType]}</dd>
          </div>
          {item.journal && (
            <div>
              <dt>记录日期</dt>
              <dd>
                <time dateTime={item.journal.date}>
                  {formatJournalDate(item.journal.date)}
                </time>
              </dd>
            </div>
          )}
        </dl>

        <div className="journal-copy">
          <h2>{item.journal?.spoilerFree ? '无剧透' : '游戏记录'}</h2>
          <p>{item.journal?.note ?? '还没有留下文字记录。'}</p>
        </div>

        {item.href && (
          <a
            className="neodb-link"
            href={item.href}
            target="_blank"
            rel="noreferrer"
          >
            在 NeoDB 查看
          </a>
        )}
      </div>

      <button
        type="button"
        className="timeline-trigger"
        onClick={onOpenTimeline}
      >
        查看记录时间线
        <ArrowRight aria-hidden="true" weight="regular" />
      </button>
    </aside>
  )
}

function TimelineDialog({ onClose }: { onClose: () => void }) {
  return (
    <div className="timeline-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="timeline-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="timeline-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="timeline-heading">
          <div>
            <span>Playlog</span>
            <h2 id="timeline-title">游戏记录时间线</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭记录时间线"
            autoFocus
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <ol className="timeline-list">
          {GAME_JOURNAL_ENTRIES.map((entry) => (
            <li key={entry.id}>
              <time dateTime={entry.date}>{formatJournalDate(entry.date)}</time>
              <div>
                <strong>{entry.title}</strong>
                <span>{SHELF_LABELS[entry.shelfType]} · 无剧透</span>
                <p>{entry.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
