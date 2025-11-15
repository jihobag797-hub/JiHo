import React, { useState } from 'react';
import { GAMES } from './data/games';
import type { Game } from './data/games';
import GameList from './components/GameList';
import GamePreview from './components/GamePreview';

const App: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  if (selectedGame) {
    return <GamePreview game={selectedGame} onBack={() => setSelectedGame(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <GameList games={GAMES} onSelectGame={setSelectedGame} />
    </div>
  );
};

export default App;
