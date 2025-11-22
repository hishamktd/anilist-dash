"use client";

import { Heart } from "lucide-react";
import Image from "next/image";

interface Character {
  id: number;
  name: {
    full: string;
  };
  image: {
    large: string;
  };
  favourites: number;
  media: {
    nodes: Array<{
      id: number;
      title: {
        romaji: string;
      };
    }>;
  };
}

interface FavoriteCharactersProps {
  characters: Character[];
}

export function FavoriteCharacters({ characters }: FavoriteCharactersProps) {
  if (!characters || characters.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="h-5 w-5 text-pink-500 fill-pink-500" />
        <h3 className="text-xl font-bold text-white">Favorite Characters</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {characters.slice(0, 10).map((character) => (
          <div
            key={character.id}
            className="group relative overflow-hidden rounded-lg bg-gray-800 border border-gray-700 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 cursor-pointer"
          >
            <div className="aspect-[2/3] relative">
              <Image
                src={character.image.large}
                alt={character.name.full}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-semibold text-sm line-clamp-2 mb-1">
                  {character.name.full}
                </p>
                {character.media.nodes[0] && (
                  <p className="text-gray-300 text-xs line-clamp-1">
                    {character.media.nodes[0].title.romaji}
                  </p>
                )}
                <div className="flex items-center gap-1 mt-1">
                  <Heart className="h-3 w-3 text-pink-500 fill-pink-500" />
                  <span className="text-pink-500 text-xs font-semibold">
                    {character.favourites.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
