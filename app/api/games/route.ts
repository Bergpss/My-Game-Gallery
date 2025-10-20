import { NextResponse } from 'next/server';
import { fetchAllGames, getGameStats } from '@/lib/neodb';

export const dynamic = 'force-dynamic'; // Disable static generation
export const revalidate = 86400; // Revalidate every 24 hours

export async function GET() {
  try {
    const gamesByShelf = await fetchAllGames();
    const stats = getGameStats(gamesByShelf);

    return NextResponse.json({
      games: gamesByShelf,
      stats,
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
}
