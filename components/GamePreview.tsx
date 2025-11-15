import React, { useState, useEffect, useMemo } from 'react';
import EyeIcon from './icons/EyeIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import RestartIcon from './icons/RestartIcon';
import type { Game } from '../data/games';

interface GamePreviewProps {
  game: Game;
  onBack: () => void;
}

const GamePreview: React.FC<GamePreviewProps> = ({ game, onBack }) => {
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onBack();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onBack]);

  const handleRestart = () => {
    setIframeKey(prevKey => prevKey + 1);
  };

  const processedCode = useMemo(() => {
    if (game.code.includes('%%API_KEY%%')) {
      return game.code.replace(/%%API_KEY%%/g, process.env.API_KEY || '');
    }
    return game.code;
  }, [game.code]);


  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center min-w-0">
            <button
              onClick={onBack}
              aria-label="Back to game list"
              className="p-2 rounded-full hover:bg-gray-200 transition-colors mr-3 flex-shrink-0"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
            <EyeIcon className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" />
            <div className="flex items-baseline gap-x-2 min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 truncate">{game.name}</h2>
              <p className="text-sm text-gray-500 hidden sm:block">(ESC 키로 나가기)</p>
            </div>
        </div>
        <button
          onClick={handleRestart}
          aria-label="Restart game"
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <RestartIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="flex-grow bg-white">
        <iframe
          key={iframeKey}
          srcDoc={processedCode}
          title={game.name}
          sandbox="allow-scripts allow-same-origin"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default GamePreview;
