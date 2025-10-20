// NeoDB API Types
export interface LocalizedText {
  lang: string;
  text: string;
}

export interface ExternalResource {
  url: string;
}

export interface GameItem {
  type: string;
  title: string;
  description: string;
  localized_title: LocalizedText[];
  localized_description: LocalizedText[];
  cover_image_url: string;
  rating: number;
  rating_count: number;
  rating_distribution: number[];
  tags: string[];
  brief: string;
  id: string;
  uuid: string;
  url: string;
  api_url: string;
  category: string;
  parent_uuid: string | null;
  display_title: string;
  external_resources: ExternalResource[];
}

export interface ShelfMark {
  shelf_type: ShelfType;
  visibility: number;
  post_id: number;
  item: GameItem;
  created_time: string;
  comment_text: string | null;
  rating_grade: number | null;
  tags: string[]; // User's personal tags for this game
}

export interface NeoDBResponse {
  data: ShelfMark[];
  pages: number;
  count: number;
}

export type ShelfType = 'wishlist' | 'progress' | 'complete' | 'dropped';

export const SHELF_LABELS: Record<ShelfType, string> = {
  wishlist: '想玩',
  progress: '在玩',
  complete: '已玩过',
  dropped: '不玩了',
};

// Platform Types
export interface Platform {
  id: string;
  name: string;
  icon: string;
}

export const PLATFORM_CONFIG: Record<string, { keywords: string[]; icon: string; name: string }> = {
  steam: {
    keywords: ['steam', 'pc'],
    icon: '/platform-icons/steam.svg',
    name: 'Steam',
  },
  playstation: {
    keywords: ['ps4', 'ps5', 'playstation', 'ps'],
    icon: '/platform-icons/playstation.svg',
    name: 'PlayStation',
  },
  switch: {
    keywords: ['switch', 'ns'],
    icon: '/platform-icons/switch.svg',
    name: 'Nintendo Switch',
  },
  xbox: {
    keywords: ['xbox', 'xsx', 'xss', 'xb'],
    icon: '/platform-icons/xbox.svg',
    name: 'Xbox',
  },
};

// Helper function to extract platforms from tags
export function extractPlatforms(tags: string[]): Platform[] {
  const platforms: Platform[] = [];

  for (const [platformId, config] of Object.entries(PLATFORM_CONFIG)) {
    const hasMatch = tags.some((tag) =>
      config.keywords.includes(tag.toLowerCase())
    );

    if (hasMatch) {
      platforms.push({
        id: platformId,
        icon: config.icon,
        name: config.name,
      });
    }
  }

  return platforms;
}

// Helper function to search games
export function searchGames(games: ShelfMark[], query: string): ShelfMark[] {
  if (!query.trim()) return games;

  const lowerQuery = query.toLowerCase().trim();

  return games.filter((mark) => {
    const { item } = mark;

    // Search in title
    if (item.title.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    // Search in localized titles
    const hasLocalizedMatch = item.localized_title.some((lt) =>
      lt.text.toLowerCase().includes(lowerQuery)
    );

    if (hasLocalizedMatch) {
      return true;
    }

    return false;
  });
}
