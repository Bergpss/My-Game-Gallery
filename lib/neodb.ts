import { NeoDBResponse, ShelfMark, ShelfType } from './types';

const NEODB_API_BASE = 'https://neodb.social/api';
const ACCESS_TOKEN = process.env.NEODB_ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  console.warn('NEODB_ACCESS_TOKEN is not set in environment variables');
}

/**
 * Fetch all games from a specific shelf with pagination support
 * @param shelfType - Type of shelf (wishlist, progress, complete, dropped)
 * @returns All games from the shelf
 */
export async function fetchShelfGames(shelfType: ShelfType): Promise<ShelfMark[]> {
  const allGames: ShelfMark[] = [];
  let currentPage = 1;
  let totalPages = 1;

  try {
    while (currentPage <= totalPages) {
      const url = `${NEODB_API_BASE}/me/shelf/${shelfType}?category=game&page=${currentPage}`;

      const response = await fetch(url, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        next: {
          revalidate: 86400, // 24 hours cache
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch shelf ${shelfType} (page ${currentPage}): ${response.status} ${response.statusText}`
        );
      }

      const data: NeoDBResponse = await response.json();

      allGames.push(...data.data);
      totalPages = data.pages;
      currentPage++;
    }

    return allGames;
  } catch (error) {
    console.error(`Error fetching shelf ${shelfType}:`, error);
    throw error;
  }
}

/**
 * Fetch all games from all shelves
 * @returns Object with games grouped by shelf type
 */
export async function fetchAllGames(): Promise<Record<ShelfType, ShelfMark[]>> {
  const shelfTypes: ShelfType[] = ['wishlist', 'progress', 'complete', 'dropped'];

  try {
    const results = await Promise.all(
      shelfTypes.map(async (type) => {
        const games = await fetchShelfGames(type);
        return { type, games };
      })
    );

    return results.reduce(
      (acc, { type, games }) => {
        acc[type] = games;
        return acc;
      },
      {} as Record<ShelfType, ShelfMark[]>
    );
  } catch (error) {
    console.error('Error fetching all games:', error);
    throw error;
  }
}

/**
 * Get statistics for all games
 * @param gamesByShelf - Games grouped by shelf type
 * @returns Statistics object
 */
export function getGameStats(gamesByShelf: Record<ShelfType, ShelfMark[]>) {
  return {
    wishlist: gamesByShelf.wishlist.length,
    progress: gamesByShelf.progress.length,
    complete: gamesByShelf.complete.length,
    dropped: gamesByShelf.dropped.length,
    total:
      gamesByShelf.wishlist.length +
      gamesByShelf.progress.length +
      gamesByShelf.complete.length +
      gamesByShelf.dropped.length,
  };
}
