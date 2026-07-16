import { GameGallery } from '@/components/game-gallery'
import { fetchAllGames } from '@/lib/neodb'
import { ShelfMark, ShelfType } from '@/lib/types'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const EMPTY_SHELVES: Record<ShelfType, ShelfMark[]> = {
  wishlist: [],
  progress: [],
  complete: [],
  dropped: [],
}

export default async function Home() {
  try {
    const gamesByShelf = await fetchAllGames()
    return <GameGallery gamesByShelf={gamesByShelf} />
  } catch (error) {
    console.error('Failed to load NeoDB games:', error)
    return (
      <GameGallery
        gamesByShelf={EMPTY_SHELVES}
        dataError="NeoDB data is unavailable"
      />
    )
  }
}
