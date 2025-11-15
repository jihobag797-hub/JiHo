import React from 'react';
import PlayIcon from './icons/PlayIcon';
import type { Game } from '../data/games';

interface GameListProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
}

const GameList: React.FC<GameListProps> = ({ games, onSelectGame }) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 sm:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">
        Game Arcade
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out cursor-pointer group"
            onClick={() => onSelectGame(game)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onSelectGame(game)}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{game.name}</h2>
              <p className="text-gray-600 mb-4">{game.description}</p>
              <div className="flex items-center text-indigo-600 group-hover:text-indigo-500 transition-colors">
                <PlayIcon className="w-5 h-5 mr-2" />
                <span className="font-semibold">Play Now</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
