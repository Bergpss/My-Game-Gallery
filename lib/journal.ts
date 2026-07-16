import { ShelfType } from '@/lib/types'

export interface GameJournalEntry {
  id: string
  title: string
  date: string
  shelfType: ShelfType
  note: string
  spoilerFree: boolean
  coverImageUrl: string
}

export const GAME_JOURNAL_ENTRIES: GameJournalEntry[] = [
  {
    id: 'outer-wilds-2026-07-15',
    title: 'Outer Wilds',
    date: '2026-07-15',
    shelfType: 'progress',
    note: '最近在玩；相关记录保持零剧透。',
    spoilerFree: true,
    coverImageUrl: '/outer-wilds-cover.jpg',
  },
]
