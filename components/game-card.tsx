"use client"

import Image from 'next/image'
import { ShelfMark, extractPlatforms } from '@/lib/types'
import { cn } from '@/lib/utils'

interface GameCardProps {
  game: ShelfMark
}

export function GameCard({ game }: GameCardProps) {
  const { item, tags } = game
  const platforms = extractPlatforms(tags)

  return (
    <a
      href={item.id}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="relative overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 hover:scale-105 hover:shadow-xl">
        {/* Game Cover */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {item.cover_image_url ? (
            <Image
              src={item.cover_image_url}
              alt={item.display_title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <span className="text-sm">无封面</span>
            </div>
          )}

          {/* Platform Icons Overlay */}
          {platforms.length > 0 && (
            <div className="absolute top-2 right-2 flex gap-1.5">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-background/80 backdrop-blur-sm p-1"
                  title={platform.name}
                >
                  <PlatformIcon platformId={platform.id} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Game Info */}
        <div className="p-3">
          <h3 className="line-clamp-2 text-sm font-medium leading-tight text-card-foreground">
            {item.display_title}
          </h3>
        </div>
      </div>
    </a>
  )
}

// Platform Icon Component
function PlatformIcon({ platformId }: { platformId: string }) {
  return (
    <Image
      src={`/platform-icons/${platformId}.svg`}
      alt={platformId}
      width={16}
      height={16}
      className="h-4 w-4"
    />
  )
}
