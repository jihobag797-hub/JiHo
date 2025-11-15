

export interface Game {
  id: string;
  name: string;
  description: string;
  code: string;
}

export const GAMES: Game[] = [
  {
    id: 'gemini-gacha',
    name: 'Gemini Gacha',
    description: '제미니의 힘을 빌려 희귀한 캐릭터를 뽑아보세요! 당신의 운을 시험해볼 시간입니다.',
    code: `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gemini Gacha</title>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="importmap">
    {
      "imports": {
        "react": "https://aistudiocdn.com/react@^19.2.0",
        "react-dom/client": "https://aistudiocdn.com/react-dom@^19.2.0/client"
      }
    }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap');
        :root {
            --rarity-common: #a1a1aa;
            --rarity-rare: #3b82f6;
            --rarity-epic: #a855f7;
            --rarity-legendary: #f59e0b;
        }
        body {
            font-family: 'Noto Sans KR', sans-serif;
            background-color: #111827;
            color: #f3f4f6;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .gacha-container {
            width: 100%;
            max-width: 420px;
            background-color: #1f2937;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 90vh;
            max-height: 800px;
        }
        .header {
            text-align: center;
            padding: 1.5rem;
            background: linear-gradient(135deg, #4f46e5, #a855f7);
        }
        .header h1 {
            margin: 0;
            font-size: 2.25rem;
            font-weight: 900;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .currency-display {
            margin-top: 0.5rem;
            font-size: 1.125rem;
            font-weight: 700;
            opacity: 0.9;
        }
        .pull-area {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23374151' fill-opacity='0.4'%3E%3Cpath d='M50 0L60 10L50 20L40 10zM10 40L20 50L10 60L0 50zM90 40L100 50L90 60L80 50zM50 80L60 90L50 100L40 90z'/%3E%3C/g%3E%3C/svg%3E");
        }
        .pull-button {
            padding: 1rem 2.5rem;
            font-size: 1.25rem;
            font-weight: 700;
            color: white;
            background: linear-gradient(135deg, #10b981, #3b82f6);
            border: none;
            border-radius: 9999px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        .pull-button:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 25px rgba(0,0,0,0.4);
        }
        .pull-button:disabled {
            background: #4b5563;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        .result-overlay {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 100;
            animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .result-card {
            width: 300px;
            height: 450px;
            background-color: #374151;
            border-radius: 16px;
            border: 2px solid;
            box-shadow: 0 0 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1.5rem;
            box-sizing: border-box;
            animation: reveal 0.8s ease-out forwards;
            opacity: 0;
            transform: scale(0.8);
        }
        .result-card.Common { border-color: var(--rarity-common); box-shadow: 0 0 40px var(--rarity-common); }
        .result-card.Rare { border-color: var(--rarity-rare); box-shadow: 0 0 40px var(--rarity-rare); }
        .result-card.Epic { border-color: var(--rarity-epic); box-shadow: 0 0 40px var(--rarity-epic); }
        .result-card.Legendary { border-color: var(--rarity-legendary); box-shadow: 0 0 40px var(--rarity-legendary); }

        @keyframes reveal {
            0% { opacity: 0; transform: scale(0.8) translateY(20px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        .character-image {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background-color: #4b5563;
            margin-top: 1rem;
            margin-bottom: 1.5rem;
            object-fit: cover;
            border: 4px solid white;
        }
        .character-name {
            font-size: 1.75rem;
            font-weight: 900;
        }
        .character-rarity {
            font-size: 1.125rem;
            font-weight: 700;
            padding: 0.25rem 1rem;
            border-radius: 9999px;
            color: white;
            margin-top: 0.5rem;
        }
        .rarity-Common { background-color: var(--rarity-common); }
        .rarity-Rare { background-color: var(--rarity-rare); }
        .rarity-Epic { background-color: var(--rarity-epic); }
        .rarity-Legendary { background-color: var(--rarity-legendary); }

        .inventory-section {
            padding: 1rem;
            text-align: center;
            background-color: #374151;
            border-top: 1px solid #4b5563;
        }
        .inventory-section h2 {
            margin-top: 0;
            margin-bottom: 1rem;
            font-size: 1.25rem;
        }
        .inventory-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
            gap: 10px;
            max-height: 150px;
            overflow-y: auto;
        }
        .inventory-item {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            border: 2px solid;
            position: relative;
        }
        .inventory-item img {
            width: 100%;
            height: 100%;
            border-radius: 6px;
            object-fit: cover;
        }
        .inventory-item .count {
            position: absolute;
            bottom: -5px;
            right: -5px;
            background-color: #111827;
            color: white;
            border-radius: 50%;
            font-size: 0.75rem;
            font-weight: bold;
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid white;
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" data-type="module">
        import React, { useState, useEffect, useCallback } from 'react';
        import ReactDOM from 'react-dom/client';

        const CHARACTERS = [
            { id: 1, name: '슬라임', rarity: 'Common', image: 'https://cdn-icons-png.flaticon.com/512/1683/1683703.png' },
            { id: 2, name: '고블린', rarity: 'Common', image: 'https://cdn-icons-png.flaticon.com/512/3073/3073453.png' },
            { id: 3, name: '해골 병사', rarity: 'Common', image: 'https://cdn-icons-png.flaticon.com/512/1785/1785235.png' },
            { id: 4, name: '오크 전사', rarity: 'Rare', image: 'https://cdn-icons-png.flaticon.com/512/9793/9793774.png' },
            { id: 5, name: '엘프 궁수', rarity: 'Rare', image: 'https://cdn-icons-png.flaticon.com/512/3073/3073489.png' },
            { id: 6, name: '마법사', rarity: 'Epic', image: 'https://cdn-icons-png.flaticon.com/512/924/924820.png' },
            { id: 7, name: '암흑 기사', rarity: 'Epic', image: 'https://cdn-icons-png.flaticon.com/512/2927/2927305.png' },
            { id: 8, name: '드래곤', rarity: 'Legendary', image: 'https://cdn-icons-png.flaticon.com/512/751/751391.png' }
        ];

        const RARITY_RATES = {
            'Common': 0.7,
            'Rare': 0.2,
            'Epic': 0.08,
            'Legendary': 0.02
        };

        const PULL_COST = 100;
        const PITY_PULLS = 50; // 50회 뽑기 시 에픽 이상 확정

        const GeminiGacha = () => {
            const [gems, setGems] = useState(5000);
            const [inventory, setInventory] = useState({});
            const [lastPull, setLastPull] = useState(null);
            const [isPulling, setIsPulling] = useState(false);
            const [pullCount, setPullCount] = useState(0);

            const performPull = () => {
                const isPity = (pullCount + 1) % PITY_PULLS === 0;
                
                let rand = Math.random();
                let chosenRarity;

                if (isPity) {
                    const epicOrLegendaryRate = RARITY_RATES.Epic + RARITY_RATES.Legendary;
                    rand *= epicOrLegendaryRate;
                    if (rand < RARITY_RATES.Legendary) chosenRarity = 'Legendary';
                    else chosenRarity = 'Epic';
                } else {
                    let cumulative = 0;
                    for (const rarity in RARITY_RATES) {
                        cumulative += RARITY_RATES[rarity];
                        if (rand < cumulative) {
                            chosenRarity = rarity;
                            break;
                        }
                    }
                }
                
                const possibleCharacters = CHARACTERS.filter(c => c.rarity === chosenRarity);
                const pulledCharacter = possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)];

                return pulledCharacter;
            };

            const handlePull = () => {
                if (gems < PULL_COST || isPulling) return;

                setIsPulling(true);
                setGems(g => g - PULL_COST);
                
                const pulledCharacter = performPull();

                setTimeout(() => {
                    setLastPull(pulledCharacter);
                    setInventory(inv => ({
                        ...inv,
                        [pulledCharacter.id]: (inv[pulledCharacter.id] || 0) + 1
                    }));
                    setPullCount(p => p + 1);
                }, 500); // Wait for animation
            };
            
            const closeResult = () => {
                setLastPull(null);
                setIsPulling(false);
            };
            
            const inventoryList = Object.keys(inventory).map(id => ({
                ...CHARACTERS.find(c => c.id == id),
                count: inventory[id]
            })).sort((a,b) => CHARACTERS.findIndex(c => c.id === b.id) - CHARACTERS.findIndex(c => c.id === a.id));

            return (
                <div className="gacha-container">
                    <div className="header">
                        <h1>Gemini Gacha</h1>
                        <div className="currency-display">💎 {gems.toLocaleString()}</div>
                    </div>
                    
                    <div className="pull-area">
                        <button className="pull-button" onClick={handlePull} disabled={isPulling || gems < PULL_COST}>
                            {PULL_COST}💎로 뽑기
                        </button>
                        {lastPull && (
                             <div className="result-overlay" onClick={closeResult}>
                                 <div className={'result-card ' + lastPull.rarity} onClick={e => e.stopPropagation()}>
                                     <img src={lastPull.image} alt={lastPull.name} className="character-image" />
                                     <h2 className="character-name">{lastPull.name}</h2>
                                     <span className={'character-rarity rarity-' + lastPull.rarity}>{lastPull.rarity}</span>
                                     <button onClick={closeResult} style={{marginTop: 'auto', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer'}}>탭하여 닫기</button>
                                 </div>
                             </div>
                        )}
                    </div>

                    <div className="inventory-section">
                        <h2>획득한 캐릭터</h2>
                        <div className="inventory-grid">
                            {inventoryList.map(char => (
                                <div key={char.id} className={'inventory-item'} style={{borderColor: 'var(--rarity-' + char.rarity + ')'}}>
                                    <img src={char.image} alt={char.name} title={char.name}/>
                                    <div className="count">{char.count}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<GeminiGacha />);
    </script>
</body>
</html>
`,
  },
  {
    id: 'gomoku',
    name: '오목',
    description: '다섯 개의 돌을 연속으로 놓아 승리하세요. 클래식한 전략 보드 게임입니다.',
    code: `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>오목 게임</title>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="importmap">
    {
      "imports": {
        "react": "https://aistudiocdn.com/react@^19.2.0",
        "react-dom/client": "https://aistudiocdn.com/react-dom@^19.2.0/client"
      }
    }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
        body {
            font-family: 'Noto Sans KR', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f0f2f5;
            color: #333;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .game-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.1);
        }
        h1 {
            font-size: 2rem;
            color: #1a202c;
            margin-bottom: 0.5rem;
        }
        .status {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            height: 30px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .status-stone {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .black { background-color: #1a202c; }
        .white { 
          background-color: #f7fafc;
          border: 1px solid #718096;
        }
        #board-container {
            padding: 20px;
            background-color: #d2b48c;
            border-radius: 8px;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
        }
        .board {
            display: grid;
            grid-template-columns: repeat(15, 1fr);
            grid-template-rows: repeat(15, 1fr);
            width: 600px;
            height: 600px;
            background-color: #d2b48c;
            border: 2px solid #8c6d46;
            position: relative;
        }
        .grid-lines {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        .line {
            position: absolute;
            background-color: #8c6d46;
        }
        .vertical { width: 1px; height: 100%; }
        .horizontal { height: 1px; width: 100%; }

        .cell {
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: pointer;
        }
        .cell:hover::before {
            content: '';
            position: absolute;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.1);
        }
        .stone {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            position: absolute;
            box-shadow: 0 3px 6px rgba(0,0,0,0.3);
            transition: transform 0.1s ease-out;
            transform: scale(0.95);
        }
        .cell .stone {
           transform: scale(1);
        }
        .restart-button {
            margin-top: 1rem;
            padding: 10px 20px;
            font-size: 1rem;
            font-weight: 700;
            color: white;
            background-image: linear-gradient(to right, #4f46e5, #818cf8);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .restart-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 7px 14px rgba(0,0,0,0.1);
        }
        @media (max-width: 700px) {
            .board {
                width: 90vw;
                height: 90vw;
            }
            .cell {
                width: 6vw;
                height: 6vw;
            }
            .stone {
                width: 5vw;
                height: 5vw;
            }
            h1 { font-size: 1.5rem; }
            .status { font-size: 1rem; }
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" data-type="module">
        import React, { useState, useCallback, useMemo } from 'react';
        import ReactDOM from 'react-dom/client';

        const BOARD_SIZE = 15;

        const GomokuGame = () => {
            const createEmptyBoard = () => Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));

            const [board, setBoard] = useState(createEmptyBoard());
            const [currentPlayer, setCurrentPlayer] = useState('black');
            const [winner, setWinner] = useState(null);
            const [gameOver, setGameOver] = useState(false);

            const checkWin = useCallback((currentBoard, row, col) => {
                const player = currentBoard[row][col];
                if (!player) return false;

                const directions = [
                    { x: 1, y: 0 },  // Horizontal
                    { x: 0, y: 1 },  // Vertical
                    { x: 1, y: 1 },  // Diagonal /
                    { x: 1, y: -1 } // Diagonal \\
                ];

                for (const dir of directions) {
                    let count = 1;
                    // Check in one direction
                    for (let i = 1; i < 5; i++) {
                        const newRow = row + i * dir.y;
                        const newCol = col + i * dir.x;
                        if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE && currentBoard[newRow][newCol] === player) {
                            count++;
                        } else {
                            break;
                        }
                    }
                    // Check in the opposite direction
                    for (let i = 1; i < 5; i++) {
                        const newRow = row - i * dir.y;
                        const newCol = col - i * dir.x;
                        if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE && currentBoard[newRow][newCol] === player) {
                            count++;
                        } else {
                            break;
                        }
                    }
                    if (count >= 5) return true;
                }
                return false;
            }, []);

            const handleCellClick = (row, col) => {
                if (gameOver || board[row][col]) return;

                const newBoard = board.map(r => [...r]);
                newBoard[row][col] = currentPlayer;
                setBoard(newBoard);

                if (checkWin(newBoard, row, col)) {
                    setWinner(currentPlayer);
                    setGameOver(true);
                } else {
                    setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
                }
            };

            const handleRestart = () => {
                setBoard(createEmptyBoard());
                setCurrentPlayer('black');
                setWinner(null);
                setGameOver(false);
            };

            const statusMessage = useMemo(() => {
                if (winner) {
                    return (
                        <React.Fragment>
                            <span className={'status-stone ' + winner}></span>
                            <strong>{winner === 'black' ? '흑' : '백'}</strong>돌 승리!
                        </React.Fragment>
                    );
                }
                return (
                    <React.Fragment>
                        <span className={'status-stone ' + currentPlayer}></span>
                        <strong>{currentPlayer === 'black' ? '흑' : '백'}</strong>돌 차례
                    </React.Fragment>
                );
            }, [winner, currentPlayer]);
            
            const GridLines = React.memo(() => (
              <div className="grid-lines">
                  {Array.from({ length: BOARD_SIZE }).map((_, i) => (
                      <React.Fragment key={i}>
                          <div className="line vertical" style={{ left: 'calc(' + (i / (BOARD_SIZE - 1)) * 100 + '% - 0.5px)' }} />
                          <div className="line horizontal" style={{ top: 'calc(' + (i / (BOARD_SIZE - 1)) * 100 + '% - 0.5px)' }} />
                      </React.Fragment>
                  ))}
              </div>
            ));

            return (
                <div className="game-container">
                    <h1>오목 게임</h1>
                    <div className="status">{statusMessage}</div>
                    <div id="board-container">
                        <div className="board">
                           <GridLines />
                            {board.map((row, rowIndex) =>
                                row.map((cell, colIndex) => (
                                    <div
                                        key={rowIndex + '-' + colIndex}
                                        className="cell"
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                        role="button"
                                        aria-label={'Board cell ' + rowIndex + ', ' + colIndex}
                                    >
                                        {cell && <div className={'stone ' + cell}></div>}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <button className="restart-button" onClick={handleRestart}>
                        다시 시작
                    </button>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<GomokuGame />);
    </script>
</body>
</html>
`
  },
  {
    id: 'baduk',
    name: '바둑',
    description: '영토를 차지하고 돌을 포획하여 승리하세요. 깊이 있는 전략 보드 게임입니다.',
    code: `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>바둑 게임</title>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="importmap">
    {
      "imports": {
        "react": "https://aistudiocdn.com/react@^19.2.0",
        "react-dom/client": "https://aistudiocdn.com/react-dom@^19.2.0/client"
      }
    }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
        body {
            font-family: 'Noto Sans KR', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f0f2f5;
        }
        .game-wrapper {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 30px;
            padding: 20px;
            width: 100%;
            max-width: 1000px;
            flex-wrap: wrap;
        }
        .info-panel {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 220px;
        }
        .player-card {
            background: #fff;
            padding: 15px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border: 2px solid transparent;
            transition: border-color 0.3s, box-shadow 0.3s;
        }
        .player-card.active {
            border-color: #4f46e5;
            box-shadow: 0 8px 20px rgba(79, 70, 229, 0.2);
        }
        .player-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
        }
        .player-stone {
            width: 24px;
            height: 24px;
            border-radius: 50%;
        }
        .player-name {
            font-size: 1.2rem;
            font-weight: 700;
        }
        .black { background-color: #1a202c; }
        .white { background-color: #f7fafc; border: 1px solid #718096; }
        .captures { font-size: 1rem; color: #4a5568; }

        .game-container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        #board-container {
            padding: 20px;
            background-color: #d2b48c;
            border-radius: 8px;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
        }
        .board {
            display: grid;
            grid-template-columns: repeat(19, 1fr);
            grid-template-rows: repeat(19, 1fr);
            width: 570px; /* 19 * 30px */
            height: 570px;
            background-color: #d2b48c;
            border: 2px solid #8c6d46;
            position: relative;
        }
        .grid-lines-container {
            position: absolute;
            top: 15px;
            left: 15px;
            width: calc(100% - 30px);
            height: calc(100% - 30px);
            pointer-events: none;
        }
        .line {
            position: absolute;
            background-color: #8c6d46;
        }
        .vertical { width: 1px; height: 100%; }
        .horizontal { height: 1px; width: 100%; }
        
        .star-point {
            position: absolute;
            width: 6px;
            height: 6px;
            background-color: #8c6d46;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }

        .cell {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: pointer;
        }
        .cell:hover::before {
            content: '';
            position: absolute;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.1);
        }
        .stone {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            position: absolute;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            transform: scale(0);
            animation: place-stone 0.2s forwards;
        }
        .territory-marker {
            width: 12px;
            height: 12px;
            opacity: 0.7;
        }

        @keyframes place-stone {
            from { transform: scale(0); }
            to { transform: scale(1); }
        }

        .game-controls {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        .control-button {
            padding: 10px 20px;
            font-size: 1rem;
            font-weight: 700;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .pass-button { background-image: linear-gradient(to right, #3b82f6, #60a5fa); }
        .restart-button { background-image: linear-gradient(to right, #4f46e5, #818cf8); }
        .control-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 7px 14px rgba(0,0,0,0.1);
        }

        .game-over-modal {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255,255,255,0.95);
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            z-index: 100;
        }
        .game-over-modal h2 { margin-top: 0; font-size: 1.8rem; color: #1a202c; }
        .game-over-modal p { font-size: 1.1rem; color: #4a5568; }

        @media (max-width: 900px) {
            .game-wrapper { flex-direction: column; align-items: center; }
            .info-panel { flex-direction: row; justify-content: center; width: 100%; max-width: 570px;}
            .board { width: 90vw; height: 90vw; }
            .cell { width: 4.73vw; height: 4.73vw; }
            .stone { width: 4.2vw; height: 4.2vw; }
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" data-type="module">
        import React, { useState, useCallback, useMemo, useEffect } from 'react';
        import ReactDOM from 'react-dom/client';

        const BOARD_SIZE = 19;
        const komi = 6.5; // 덤

        const BadukGame = () => {
            const createEmptyBoard = () => Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));

            const [board, setBoard] = useState(createEmptyBoard());
            const [currentPlayer, setCurrentPlayer] = useState('black');
            const [history, setHistory] = useState([JSON.stringify(createEmptyBoard())]);
            const [captures, setCaptures] = useState({ black: 0, white: 0 });
            const [passCount, setPassCount] = useState(0);
            const [gameOver, setGameOver] = useState(false);
            const [territory, setTerritory] = useState(null);
            const [winner, setWinner] = useState(null);

            const opponent = (player) => player === 'black' ? 'white' : 'black';

            const findGroup = useCallback((row, col, player, currentBoard, visited) => {
                if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE || visited[row][col] || currentBoard[row][col] !== player) {
                    return { group: [], liberties: new Set() };
                }

                visited[row][col] = true;
                const group = [{ row, col }];
                const liberties = new Set();
                
                const directions = [{ r: 0, c: 1 }, { r: 0, c: -1 }, { r: 1, c: 0 }, { r: -1, c: 0 }];

                for (const dir of directions) {
                    const newRow = row + dir.r;
                    const newCol = col + dir.c;

                    if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
                        if (currentBoard[newRow][newCol] === null) {
                            liberties.add(newRow + ',' + newCol);
                        } else if (currentBoard[newRow][newCol] === player && !visited[newRow][newCol]) {
                            const result = findGroup(newRow, newCol, player, currentBoard, visited);
                            group.push(...result.group);
                            result.liberties.forEach(lib => liberties.add(lib));
                        }
                    }
                }
                return { group, liberties };
            }, []);

            const checkAndRemoveCapturedGroups = useCallback((row, col, player, currentBoard) => {
                let capturedStonesCount = 0;
                const newBoard = currentBoard.map(r => [...r]);
                const directions = [{ r: 0, c: 1 }, { r: 0, c: -1 }, { r: 1, c: 0 }, { r: -1, c: 0 }];

                for (const dir of directions) {
                    const adjRow = row + dir.r;
                    const adjCol = col + dir.c;

                    if (adjRow >= 0 && adjRow < BOARD_SIZE && adjCol >= 0 && adjCol < BOARD_SIZE && newBoard[adjRow][adjCol] === opponent(player)) {
                        const visited = Array(BOARD_SIZE).fill(false).map(() => Array(BOARD_SIZE).fill(false));
                        const { group, liberties } = findGroup(adjRow, adjCol, opponent(player), newBoard, visited);
                        if (liberties.size === 0) {
                            capturedStonesCount += group.length;
                            for (const stone of group) {
                                newBoard[stone.row][stone.col] = null;
                            }
                        }
                    }
                }
                return { newBoard, capturedStonesCount };
            }, [findGroup]);
            
            const isMoveValid = (row, col, player, currentBoard) => {
                if (currentBoard[row][col] !== null) return false;
                
                const tempBoard = currentBoard.map(r => [...r]);
                tempBoard[row][col] = player;

                // Check for captures first
                let capturesMade = false;
                const directions = [{ r: 0, c: 1 }, { r: 0, c: -1 }, { r: 1, c: 0 }, { r: -1, c: 0 }];
                for (const dir of directions) {
                    const adjRow = row + dir.r;
                    const adjCol = col + dir.c;
                    if (adjRow >= 0 && adjRow < BOARD_SIZE && adjCol >= 0 && adjCol < BOARD_SIZE && tempBoard[adjRow][adjCol] === opponent(player)) {
                        const visited = Array(BOARD_SIZE).fill(false).map(() => Array(BOARD_SIZE).fill(false));
                        const { liberties } = findGroup(adjRow, adjCol, opponent(player), tempBoard, visited);
                        if (liberties.size === 0) {
                           capturesMade = true;
                           break;
                        }
                    }
                }
                if (capturesMade) {
                    const { newBoard } = checkAndRemoveCapturedGroups(row, col, player, tempBoard);
                    if (history.includes(JSON.stringify(newBoard))) return false; // Ko rule
                    return true;
                }

                // Check for suicide
                const visited = Array(BOARD_SIZE).fill(false).map(() => Array(BOARD_SIZE).fill(false));
                const { liberties } = findGroup(row, col, player, tempBoard, visited);
                if (liberties.size === 0) return false;

                // Ko rule for non-capture moves
                 if (history.includes(JSON.stringify(tempBoard))) return false;

                return true;
            };

            const handleCellClick = (row, col) => {
                if (gameOver || !isMoveValid(row, col, currentPlayer, board)) return;

                const newBoardWithMove = board.map(r => [...r]);
                newBoardWithMove[row][col] = currentPlayer;

                const { newBoard, capturedStonesCount } = checkAndRemoveCapturedGroups(row, col, currentPlayer, newBoardWithMove);
                
                setBoard(newBoard);
                setHistory(prev => [...prev, JSON.stringify(newBoard)]);
                if (capturedStonesCount > 0) {
                    setCaptures(prev => ({ ...prev, [currentPlayer]: prev[currentPlayer] + capturedStonesCount }));
                }
                setCurrentPlayer(opponent(currentPlayer));
                setPassCount(0);
            };

            const calculateTerritory = () => {
                const visited = Array(BOARD_SIZE).fill(false).map(() => Array(BOARD_SIZE).fill(false));
                const territoryData = { black: 0, white: 0 };
                const territoryMap = createEmptyBoard();

                for (let r = 0; r < BOARD_SIZE; r++) {
                    for (let c = 0; c < BOARD_SIZE; c++) {
                        if (board[r][c] === null && !visited[r][c]) {
                            const queue = [{ r, c }];
                            visited[r][c] = true;
                            const region = [];
                            let bordersBlack = false;
                            let bordersWhite = false;

                            while (queue.length > 0) {
                                const { r: currR, c: currC } = queue.shift();
                                region.push({ r: currR, c: currC });

                                const directions = [{ r: 0, c: 1 }, { r: 0, c: -1 }, { r: 1, c: 0 }, { r: -1, c: 0 }];
                                for (const dir of directions) {
                                    const newR = currR + dir.r;
                                    const newC = currC + dir.c;

                                    if (newR >= 0 && newR < BOARD_SIZE && newC >= 0 && newC < BOARD_SIZE) {
                                        if (board[newR][newC] === null && !visited[newR][newC]) {
                                            visited[newR][newC] = true;
                                            queue.push({ r: newR, c: newC });
                                        } else if (board[newR][newC] === 'black') {
                                            bordersBlack = true;
                                        } else if (board[newR][newC] === 'white') {
                                            bordersWhite = true;
                                        }
                                    }
                                }
                            }

                            if (bordersBlack && !bordersWhite) {
                                territoryData.black += region.length;
                                region.forEach(pt => territoryMap[pt.r][pt.c] = 'black');
                            } else if (!bordersBlack && bordersWhite) {
                                territoryData.white += region.length;
                                 region.forEach(pt => territoryMap[pt.r][pt.c] = 'white');
                            }
                        }
                    }
                }
                setTerritory(territoryMap);
                return territoryData;
            };
            
            useEffect(() => {
                if (passCount >= 2 && !gameOver) {
                    setGameOver(true);
                    const finalTerritory = calculateTerritory();
                    const blackScore = finalTerritory.black + captures.black;
                    const whiteScore = finalTerritory.white + captures.white + komi;
                    setWinner({ blackScore, whiteScore, result: blackScore > whiteScore ? '흑' : '백' });
                }
            }, [passCount, gameOver]);


            const handlePass = () => {
                if (gameOver) return;
                setPassCount(prev => prev + 1);
                setCurrentPlayer(opponent(currentPlayer));
            };

            const handleRestart = () => {
                setBoard(createEmptyBoard());
                setCurrentPlayer('black');
                setHistory([JSON.stringify(createEmptyBoard())]);
                setCaptures({ black: 0, white: 0 });
                setPassCount(0);
                setGameOver(false);
                setTerritory(null);
                setWinner(null);
            };
            
            const starPoints = useMemo(() => [
                {r: 3, c: 3}, {r: 3, c: 9}, {r: 3, c: 15},
                {r: 9, c: 3}, {r: 9, c: 9}, {r: 9, c: 15},
                {r: 15, c: 3}, {r: 15, c: 9}, {r: 15, c: 15}
            ], []);
            
            const GridLines = React.memo(() => (
              <div className="grid-lines-container">
                  {Array.from({ length: BOARD_SIZE }).map((_, i) => (
                      <React.Fragment key={i}>
                          <div className="line vertical" style={{ left: (i / (BOARD_SIZE - 1)) * 100 + '%' }} />
                          <div className="line horizontal" style={{ top: (i / (BOARD_SIZE - 1)) * 100 + '%' }} />
                      </React.Fragment>
                  ))}
                  {starPoints.map(({r, c}, i) => (
                      <div key={i} className="star-point" style={{
                          top: (r / (BOARD_SIZE-1) * 100) + '%',
                          left: (c / (BOARD_SIZE-1) * 100) + '%'
                      }}></div>
                  ))}
              </div>
            ));

            return (
                <div className="game-wrapper">
                    <div className="info-panel">
                        <div className={'player-card ' + (currentPlayer === 'black' ? 'active' : '')}>
                            <div className="player-header">
                                <div className="player-stone black"></div>
                                <span className="player-name">흑</span>
                            </div>
                            <div className="captures">잡은 돌: {captures.black}</div>
                        </div>
                        <div className={'player-card ' + (currentPlayer === 'white' ? 'active' : '')}>
                             <div className="player-header">
                                <div className="player-stone white"></div>
                                <span className="player-name">백</span>
                            </div>
                            <div className="captures">잡은 돌: {captures.white}</div>
                        </div>
                    </div>
                    <div className="game-container">
                        <div id="board-container">
                            <div className="board" style={{position: 'relative'}}>
                                <GridLines />
                                {board.map((row, rowIndex) =>
                                    row.map((cell, colIndex) => (
                                        <div
                                            key={rowIndex + '-' + colIndex}
                                            className="cell"
                                            onClick={() => handleCellClick(rowIndex, colIndex)}
                                        >
                                            {cell && <div className={'stone ' + cell}></div>}
                                            {territory && territory[rowIndex][colIndex] && 
                                                <div className={'territory-marker ' + territory[rowIndex][colIndex]}></div>
                                            }
                                        </div>
                                    ))
                                )}
                                {gameOver && winner && (
                                  <div className="game-over-modal">
                                    <h2>게임 종료</h2>
                                    <p><strong>{winner.result}</strong> 승리!</p>
                                    <p>흑: {winner.blackScore}집 / 백: {winner.whiteScore}집</p>
                                  </div>
                                )}
                            </div>
                        </div>
                        <div className="game-controls">
                            <button className="control-button pass-button" onClick={handlePass}>패스</button>
                            <button className="control-button restart-button" onClick={handleRestart}>다시 시작</button>
                        </div>
                    </div>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<BadukGame />);
    </script>
</body>
</html>
`
  },
  {
    id: 'uno',
    name: '우노',
    description: '같은 색깔이나 숫자의 카드를 내서 가장 먼저 모든 카드를 없애는 사람이 승리하는 클래식 카드 게임입니다.',
    code: `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>우노 게임</title>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="importmap">
    {
      "imports": {
        "react": "https://aistudiocdn.com/react@^19.2.0",
        "react-dom/client": "https://aistudiocdn.com/react-dom@^19.2.0/client"
      }
    }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
        :root {
            --uno-red: #ff5555;
            --uno-yellow: #ffaa00;
            --uno-green: #55aa55;
            --uno-blue: #5555ff;
            --uno-black: #2e2e2e;
        }
        body {
            font-family: 'Noto Sans KR', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #1a3a2a;
            overflow: hidden;
            color: white;
        }
        .game-board {
            position: relative;
            width: 100%;
            height: 100vh;
            max-width: 1200px;
            margin: auto;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
        }
        .hand {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            min-height: 150px;
            position: relative;
        }
        .player-hand .card {
            cursor: pointer;
            transition: transform 0.2s ease, margin 0.3s ease;
        }
        .player-hand .card:hover {
            transform: translateY(-20px) scale(1.05);
            z-index: 100;
        }
        .ai-hand .card-container {
            margin: 0 -30px;
        }
        .player-hand .card-container {
            margin: 0 -40px;
        }
        .card {
            width: 90px;
            height: 135px;
            border-radius: 10px;
            background-color: white;
            color: white;
            font-size: 3rem;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 3px solid white;
            user-select: none;
        }
        .card.red { background-color: var(--uno-red); }
        .card.yellow { background-color: var(--uno-yellow); }
        .card.green { background-color: var(--uno-green); }
        .card.blue { background-color: var(--uno-blue); }
        .card.black { background-color: var(--uno-black); }
        .card-inner {
            width: 60px;
            height: 95px;
            background-color: white;
            border-radius: 5px;
            color: black;
            font-size: 2.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }
        .card.black .card-inner {
            background: linear-gradient(135deg, var(--uno-red), var(--uno-yellow), var(--uno-green), var(--uno-blue));
            background-size: 400% 400%;
            animation: wild-gradient 5s ease infinite;
            color: white;
        }
        .card-back {
            background-color: var(--uno-black);
            justify-content: center;
            align-items: center;
            display: flex;
        }
        .card-back .logo {
            font-size: 2rem;
            color: white;
            font-style: italic;
            transform: rotate(-15deg);
        }
        .center-area {
            display: flex;
            align-items: center;
            gap: 30px;
        }
        .deck-pile, .discard-pile {
            width: 96px;
            height: 141px;
        }
        .deck-pile .card {
            cursor: pointer;
        }
        .game-status {
            position: absolute;
            top: 20px;
            left: 20px;
            background-color: rgba(0,0,0,0.5);
            padding: 10px 15px;
            border-radius: 8px;
        }
        .color-picker {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            gap: 10px;
            background: rgba(0,0,0,0.7);
            padding: 20px;
            border-radius: 15px;
            z-index: 200;
        }
        .color-choice {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            cursor: pointer;
            border: 4px solid white;
            transition: transform 0.2s;
        }
        .color-choice:hover {
            transform: scale(1.1);
        }
        .winner-overlay {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 300;
            animation: fade-in 0.5s;
        }
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .winner-text {
            font-size: 4rem;
            font-weight: bold;
        }
        .restart-button {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 1.2rem;
            border-radius: 8px;
            cursor: pointer;
            background-color: #4f46e5;
            border: none;
            color: white;
        }
        @keyframes wild-gradient {
            0%{background-position:0% 50%}
            50%{background-position:100% 50%}
            100%{background-position:0% 50%}
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" data-type="module">
        import React, { useState, useEffect, useCallback, useMemo } from 'react';
        import ReactDOM from 'react-dom/client';

        const COLORS = ['red', 'yellow', 'green', 'blue'];
        const VALUES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Skip', 'Reverse', 'Draw2'];
        const WILD_VALUES = ['Wild', 'WildDraw4'];

        const createDeck = () => {
            let deck = [];
            for (const color of COLORS) {
                for (const value of VALUES) {
                    deck.push({ color, value });
                    if (value !== '0') {
                        deck.push({ color, value });
                    }
                }
            }
            for (let i = 0; i < 4; i++) {
                deck.push({ color: 'black', value: 'Wild' });
                deck.push({ color: 'black', value: 'WildDraw4' });
            }
            return deck;
        };

        const shuffleDeck = (deck) => {
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
            return deck;
        };
        
        const CardComponent = React.memo(({ card, isBack, onClick, style }) => {
            if (isBack) {
                return (
                    <div className="card-container" style={style}>
                        <div className="card card-back" onClick={onClick}>
                            <div className="logo">UNO</div>
                        </div>
                    </div>
                );
            }
            
            const getDisplayValue = () => {
                if (card.value === 'Skip') return '🚫';
                if (card.value === 'Reverse') return '🔄';
                if (card.value === 'Draw2') return '+2';
                if (card.value === 'Wild') return '🎨';
                if (card.value === 'WildDraw4') return '+4';
                return card.value;
            }

            return (
                <div className="card-container" style={style}>
                    <div className={'card ' + card.color} onClick={onClick}>
                        <div className="card-inner">{getDisplayValue()}</div>
                    </div>
                </div>
            );
        });

        const UnoGame = () => {
            const [gameState, setGameState] = useState({
                deck: [],
                discardPile: [],
                playerHand: [],
                aiHand: [],
                currentPlayer: 'player',
                direction: 1,
                currentColor: '',
                isChoosingColor: false,
                winner: null,
            });
            
            const setupGame = useCallback(() => {
                const newDeck = shuffleDeck(createDeck());
                const playerHand = newDeck.splice(0, 7);
                const aiHand = newDeck.splice(0, 7);
                let firstCard = newDeck.shift();
                
                while (firstCard.color === 'black') {
                    newDeck.push(firstCard);
                    firstCard = newDeck.shift();
                }

                setGameState({
                    deck: newDeck,
                    discardPile: [firstCard],
                    playerHand,
                    aiHand,
                    currentPlayer: 'player',
                    direction: 1,
                    currentColor: firstCard.color,
                    isChoosingColor: false,
                    winner: null,
                });
            }, []);

            useEffect(() => {
                setupGame();
            }, [setupGame]);

            const topCard = useMemo(() => gameState.discardPile[gameState.discardPile.length - 1], [gameState.discardPile]);

            const drawCards = (player, count) => {
                 return (prev) => {
                    let newDeck = [...prev.deck];
                    const cardsDrawn = [];
                    if (newDeck.length < count) {
                       const newDiscard = [...prev.discardPile];
                       const top = newDiscard.pop();
                       newDeck.push(...shuffleDeck(newDiscard));
                       setGameState(p => ({...p, discardPile: [top]}));
                    }
                    for(let i=0; i<count; i++) {
                       cardsDrawn.push(newDeck.shift());
                    }
                    const targetHand = player === 'player' ? 'playerHand' : 'aiHand';
                    return {...prev, deck: newDeck, [targetHand]: [...prev[targetHand], ...cardsDrawn] };
                 }
            };
            
            const handleDrawCard = () => {
                if (gameState.currentPlayer !== 'player' || gameState.winner) return;
                setGameState(drawCards('player', 1));
                setGameState(prev => ({...prev, currentPlayer: 'ai' }));
            };

            const isCardPlayable = (card) => {
                if (card.color === 'black') return true;
                if (card.color === gameState.currentColor) return true;
                if (card.value === topCard.value) return true;
                return false;
            };

            const playCard = (card, hand, player) => {
                const newHand = hand.filter(c => c !== card);
                let nextPlayer = player === 'player' ? 'ai' : 'player';
                let newCurrentColor = card.color === 'black' ? gameState.currentColor : card.color;

                let stateUpdate = {
                    ...gameState,
                    [player === 'player' ? 'playerHand' : 'aiHand']: newHand,
                    discardPile: [...gameState.discardPile, card],
                    currentColor: newCurrentColor,
                };
                
                if (newHand.length === 0) {
                    stateUpdate.winner = player;
                    setGameState(stateUpdate);
                    return;
                }

                // Card effects
                switch(card.value) {
                    case 'Skip':
                        nextPlayer = player;
                        break;
                    case 'Reverse':
                        stateUpdate.direction *= -1;
                         // In 2 player game, it's just a skip
                        nextPlayer = player;
                        break;
                    case 'Draw2':
                        stateUpdate = {...stateUpdate, ...drawCards(nextPlayer, 2)({})};
                        nextPlayer = player;
                        break;
                    case 'Wild':
                        stateUpdate.isChoosingColor = player === 'player';
                        break;
                    case 'WildDraw4':
                        stateUpdate = {...stateUpdate, ...drawCards(nextPlayer, 4)({})};
                        stateUpdate.isChoosingColor = player === 'player';
                        nextPlayer = player;
                        break;
                }
                
                stateUpdate.currentPlayer = nextPlayer;
                setGameState(stateUpdate);
            };
            
            const handlePlayCard = (card) => {
                if (gameState.currentPlayer !== 'player' || gameState.winner || !isCardPlayable(card)) return;
                playCard(card, gameState.playerHand, 'player');
            };
            
            const handleColorChoice = (color) => {
                setGameState(prev => ({
                    ...prev,
                    currentColor: color,
                    isChoosingColor: false,
                    currentPlayer: 'ai'
                }));
            };

            useEffect(() => {
                if (gameState.currentPlayer === 'ai' && !gameState.winner) {
                    const timeoutId = setTimeout(() => {
                        const playableCards = gameState.aiHand.filter(isCardPlayable);
                        if (playableCards.length > 0) {
                            const cardToPlay = playableCards[0]; // Simple AI: play first possible card
                            playCard(cardToPlay, gameState.aiHand, 'ai');
                            if(cardToPlay.color === 'black') {
                                // AI chooses a color
                                const colorCounts = gameState.aiHand.reduce((acc, c) => {
                                    if(c.color !== 'black') acc[c.color] = (acc[c.color] || 0) + 1;
                                    return acc;
                                }, {});
                                const bestColor = Object.keys(colorCounts).reduce((a, b) => colorCounts[a] > colorCounts[b] ? a : b, COLORS[0]);
                                setGameState(prev => ({...prev, currentColor: bestColor}));
                            }
                        } else {
                           setGameState(drawCards('ai', 1));
                           setGameState(prev => ({...prev, currentPlayer: 'player'}));
                        }
                    }, 1000);
                    return () => clearTimeout(timeoutId);
                }
            }, [gameState.currentPlayer, gameState.aiHand, gameState.winner]);

            return (
                <div className="game-board">
                    <div className="hand ai-hand">
                        {gameState.aiHand.map((card, i) => <CardComponent key={i} card={card} isBack={true} style={{transform: 'translateX(' + (i - gameState.aiHand.length / 2) * 60 + 'px)'}} />)}
                    </div>

                    <div className="center-area">
                        <div className="deck-pile">
                            <CardComponent isBack={true} onClick={handleDrawCard}/>
                        </div>
                        <div className="discard-pile">
                            {topCard && <CardComponent card={topCard} />}
                        </div>
                    </div>
                    
                     <div className="hand player-hand">
                        {gameState.playerHand.map((card, i) => <CardComponent key={i} card={card} onClick={() => handlePlayCard(card)} style={{transform: 'translateX(' + (i - gameState.playerHand.length / 2) * 80 + 'px)'}} />)}
                    </div>
                    
                    {gameState.isChoosingColor && (
                       <div className="color-picker">
                           {COLORS.map(color => (
                               <div key={color} className={'color-choice ' + color} style={{backgroundColor: 'var(--uno-' + color + ')'}} onClick={() => handleColorChoice(color)}></div>
                           ))}
                       </div>
                    )}
                    
                    {gameState.winner && (
                        <div className="winner-overlay">
                           <div className="winner-text">{gameState.winner === 'player' ? '승리!' : '패배!'}</div>
                           <button className="restart-button" onClick={setupGame}>다시 시작</button>
                        </div>
                    )}

                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<UnoGame />);
    </script>
</body>
</html>
`
  },
  {
    id: 'chess',
    name: '체스',
    description: '왕을 보호하고 상대방의 왕을 쓰러뜨리세요. 세계에서 가장 인기 있는 전략 게임입니다.',
    code: `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>체스 게임</title>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="importmap">
    {
      "imports": {
        "react": "https://aistudiocdn.com/react@^19.2.0",
        "react-dom/client": "https://aistudiocdn.com/react-dom@^19.2.0/client"
      }
    }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
        body {
            font-family: 'Noto Sans KR', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #312e2b;
        }
        .game-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }
        .board {
            width: 640px;
            height: 640px;
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            grid-template-rows: repeat(8, 1fr);
            border: 5px solid #6b4b32;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .square {
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 56px;
            position: relative;
        }
        .square.light { background-color: #f0d9b5; }
        .square.dark { background-color: #b58863; }
        .piece { 
            cursor: pointer;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            transition: transform 0.1s ease;
        }
        .piece:hover {
            transform: scale(1.1);
        }
        .square.selected {
            background-color: #6a9ac5 !important;
        }
        .valid-move-indicator {
            width: 30px;
            height: 30px;
            background-color: rgba(20, 85, 30, 0.5);
            border-radius: 50%;
            cursor: pointer;
        }
        .status-bar {
            width: 640px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #f0d9b5;
        }
        .status-text {
            font-size: 1.5rem;
            font-weight: 700;
        }
        .restart-button {
            padding: 10px 20px;
            font-size: 1rem;
            font-weight: 700;
            color: #312e2b;
            background-color: #f0d9b5;
            border: 2px solid #b58863;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .restart-button:hover {
            background-color: #b58863;
            color: #f0d9b5;
        }
        @media (max-width: 700px) {
            .board { width: 90vw; height: 90vw; border-width: 3px; }
            .square { width: 11.25vw; height: 11.25vw; font-size: 7vw; }
            .status-bar { width: 90vw; }
            .status-text { font-size: 1.2rem; }
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" data-type="module">
        import React, { useState, useCallback, useMemo } from 'react';
        import ReactDOM from 'react-dom/client';

        const PIECES = {
            white: { king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙' },
            black: { king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟︎' }
        };

        const getInitialBoard = () => [
            [{type: 'rook', color: 'black'}, {type: 'knight', color: 'black'}, {type: 'bishop', color: 'black'}, {type: 'queen', color: 'black'}, {type: 'king', color: 'black'}, {type: 'bishop', color: 'black'}, {type: 'knight', color: 'black'}, {type: 'rook', color: 'black'}],
            Array(8).fill({type: 'pawn', color: 'black'}),
            Array(8).fill(null), Array(8).fill(null), Array(8).fill(null), Array(8).fill(null),
            Array(8).fill({type: 'pawn', color: 'white'}),
            [{type: 'rook', color: 'white'}, {type: 'knight', color: 'white'}, {type: 'bishop', color: 'white'}, {type: 'queen', color: 'white'}, {type: 'king', color: 'white'}, {type: 'bishop', color: 'white'}, {type: 'knight', color: 'white'}, {type: 'rook', color: 'white'}],
        ];

        const ChessGame = () => {
            const [board, setBoard] = useState(getInitialBoard);
            const [turn, setTurn] = useState('white');
            const [selectedPiece, setSelectedPiece] = useState(null);
            const [validMoves, setValidMoves] = useState([]);
            const [winner, setWinner] = useState(null);

            const getValidMoves = useCallback((piece, r, c, currentBoard) => {
                const moves = [];
                if (!piece) return moves;
                const { type, color } = piece;
                const opponentColor = color === 'white' ? 'black' : 'white';

                const isOutOfBounds = (row, col) => row < 0 || row >= 8 || col < 0 || col >= 8;
                const isFriend = (row, col) => currentBoard[row]?.[col]?.color === color;

                const addLineMoves = (directions) => {
                    for (const dir of directions) {
                        for (let i = 1; i < 8; i++) {
                            const newR = r + i * dir.r;
                            const newC = c + i * dir.c;
                            if (isOutOfBounds(newR, newC) || isFriend(newR, newC)) break;
                            moves.push({ r: newR, c: newC });
                            if (currentBoard[newR][newC]?.color === opponentColor) break;
                        }
                    }
                };

                if (type === 'pawn') {
                    const dir = color === 'white' ? -1 : 1;
                    if (!isOutOfBounds(r + dir, c) && !currentBoard[r + dir][c]) moves.push({ r: r + dir, c });
                    if ((color === 'white' && r === 6) || (color === 'black' && r === 1)) {
                        if (!currentBoard[r + dir][c] && !currentBoard[r + 2 * dir][c]) moves.push({ r: r + 2 * dir, c });
                    }
                    [-1, 1].forEach(cd => {
                        if (!isOutOfBounds(r + dir, c + cd) && currentBoard[r + dir][c + cd]?.color === opponentColor) moves.push({ r: r + dir, c: c + cd });
                    });
                } else if (type === 'knight') {
                    const knightMoves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
                    for (const [dr, dc] of knightMoves) {
                        const newR = r + dr, newC = c + dc;
                        if (!isOutOfBounds(newR, newC) && !isFriend(newR, newC)) moves.push({ r: newR, c: newC });
                    }
                } else if (type === 'king') {
                    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
                        if (dr === 0 && dc === 0) continue;
                        const newR = r + dr, newC = c + dc;
                        if (!isOutOfBounds(newR, newC) && !isFriend(newR, newC)) moves.push({ r: newR, c: newC });
                    }
                }
                
                if (type === 'rook' || type === 'queen') addLineMoves([{r:1, c:0}, {r:-1, c:0}, {r:0, c:1}, {r:0, c:-1}]);
                if (type === 'bishop' || type === 'queen') addLineMoves([{r:1, c:1}, {r:1, c:-1}, {r:-1, c:1}, {r:-1, c:-1}]);
                
                return moves;
            }, []);

            const handleSquareClick = (r, c) => {
                if (winner) return;

                const clickedPiece = board[r][c];

                if (selectedPiece) {
                    const isValidMove = validMoves.some(move => move.r === r && move.c === c);
                    if (isValidMove) {
                        const newBoard = board.map(row => [...row]);
                        const pieceToMove = newBoard[selectedPiece.r][selectedPiece.c];
                        
                        if (clickedPiece?.type === 'king') {
                            setWinner(turn);
                        }

                        newBoard[r][c] = pieceToMove;
                        newBoard[selectedPiece.r][selectedPiece.c] = null;
                        
                        // Pawn promotion
                        if (pieceToMove.type === 'pawn' && (r === 0 || r === 7)) {
                            newBoard[r][c] = { ...pieceToMove, type: 'queen' };
                        }

                        setBoard(newBoard);
                        setTurn(turn === 'white' ? 'black' : 'white');
                        setSelectedPiece(null);
                        setValidMoves([]);
                    } else {
                        setSelectedPiece(null);
                        setValidMoves([]);
                    }
                }
                
                if (clickedPiece && clickedPiece.color === turn) {
                    setSelectedPiece({ r, c });
                    setValidMoves(getValidMoves(clickedPiece, r, c, board));
                }
            };
            
            const restartGame = () => {
                setBoard(getInitialBoard());
                setTurn('white');
                setSelectedPiece(null);
                setValidMoves([]);
                setWinner(null);
            };

            const statusMessage = useMemo(() => {
                // FIX: Replaced template literals with string concatenation to avoid parsing errors.
                if (winner) return (winner === 'white' ? '백' : '흑') + '이(가) 승리했습니다!';
                return (turn === 'white' ? '백' : '흑') + '의 턴';
            }, [winner, turn]);

            return (
                <div className="game-container">
                    <div className="status-bar">
                        <div className="status-text">{statusMessage}</div>
                        <button className="restart-button" onClick={restartGame}>다시 시작</button>
                    </div>
                    <div className="board">
                        {board.map((row, r) => row.map((piece, c) => (
                            <div
                                // FIX: Replaced template literals with string concatenation to avoid parsing errors.
                                key={r + '-' + c}
                                className={'square ' + ((r + c) % 2 === 0 ? 'light' : 'dark') + (selectedPiece?.r === r && selectedPiece?.c === c ? ' selected' : '')}
                                onClick={() => handleSquareClick(r, c)}
                            >
                                {piece && <span className="piece">{PIECES[piece.color][piece.type]}</span>}
                                {validMoves.some(move => move.r === r && move.c === c) && <div className="valid-move-indicator"></div>}
                            </div>
                        )))}
                    </div>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<ChessGame />);
    </script>
</body>
</html>
`
  },
  {
    id: 'rhythm-master',
    name: '리액트 리듬',
    description: '음악에 맞춰 내려오는 노트를 정확한 타이밍에 눌러보세요. 자신만의 음악 파일을 업로드하여 플레이할 수도 있습니다.',
    code: `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>리액트 리듬</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="importmap">
    {
      "imports": {
        "react": "https://aistudiocdn.com/react@^19.2.0",
        "react-dom/client": "https://aistudiocdn.com/react-dom@^19.2.0/client"
      }
    }
    </script>
    <style>
        body { margin: 0; }
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gold-dust {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        @keyframes judgment-line-flash {
            0% { opacity: 0.8; height: 0.25rem; background-color: #fde047; box-shadow: 0 0 24px 8px #fde047; }
            100% { opacity: 0; height: 1.5rem; background-color: #fde047; box-shadow: 0 0 48px 16px #fde047; }
        }
        @keyframes judgment-pop {
            0% { transform: scale(0.8); opacity: 0; }
            20% { transform: scale(1.2); opacity: 1; }
            50% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1); opacity: 0; }
        }
        @keyframes combo-bounce-in {
            0% { transform: scale(0.7); opacity: 0; }
            60% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-gold-dust { animation: gold-dust 0.3s ease-out forwards; }
        .animate-judgment-line-flash { animation: judgment-line-flash 0.15s ease-out forwards; }
        .animate-judgment-pop { animation: judgment-pop 0.8s ease-out forwards; }
        .animate-combo-bounce-in { animation: combo-bounce-in 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" data-type="module">
        import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
        import ReactDOM from 'react-dom/client';

        const GameState = { MainMenu: 'mainMenu', Playing: 'playing', Results: 'results' };
        const Difficulty = { Easy: '쉬움', Normal: '보통', Hard: '어려움' };
        const Judgment = { Perfect: 'PERFECT', Great: 'GREAT', Good: 'GOOD', Miss: 'MISS' };

        const LANE_COUNT = 4;
        const NOTE_FALL_DURATION = 1000;
        const KEY_BINDINGS = { 'd': 0, 'f': 1, 'j': 2, 'k': 3 };
        const TIMING_WINDOWS = { [Judgment.Perfect]: 60, [Judgment.Great]: 100, [Judgment.Good]: 150, [Judgment.Miss]: 200 };
        const SCORES = { [Judgment.Perfect]: 300, [Judgment.Great]: 200, [Judgment.Good]: 100, [Judgment.Miss]: 0 };
        const TARGET_COLORS = ['border-cyan-400', 'border-pink-400', 'border-lime-400', 'border-orange-400'];
        const JUDGMENT_GRADIENTS = {
            [Judgment.Perfect]: 'from-yellow-300 via-amber-400 to-orange-500',
            [Judgment.Great]: 'from-lime-400 via-green-500 to-emerald-600',
            [Judgment.Good]: 'from-sky-400 via-cyan-500 to-blue-600',
            [Judgment.Miss]: 'from-slate-500 to-slate-700',
        };
        const GRADES = [
          { name: 'S', threshold: 0.98, gradient: 'from-yellow-300 via-amber-400 to-orange-500' },
          { name: 'AAA', threshold: 0.95, gradient: 'from-pink-400 via-fuchsia-500 to-purple-600' },
          { name: 'AA', threshold: 0.9, gradient: 'from-lime-400 via-green-500 to-emerald-600' },
          { name: 'A', threshold: 0.85, gradient: 'from-sky-400 via-cyan-500 to-blue-600' },
          { name: 'B', threshold: 0.7, gradient: 'from-slate-400 to-slate-500' },
          { name: 'C', threshold: 0.6, gradient: 'from-stone-500 to-stone-600' },
          { name: 'D', threshold: 0, gradient: 'from-neutral-600 to-neutral-700' },
        ];
        
        const generateBeatmap = (bpm, lengthInSeconds) => {
            const beatDuration = 60000 / bpm;
            const notes = [];
            let currentTime = 1500;
            const endTime = lengthInSeconds * 1000;
            while (currentTime < endTime) {
                const patternType = Math.random();
                if (patternType < 0.6) { // Single note
                    notes.push({ id: notes.length, time: currentTime, lane: Math.floor(Math.random() * 4) });
                } else if (patternType < 0.8) { // Double note
                    const lane1 = Math.floor(Math.random() * 4);
                    let lane2 = Math.floor(Math.random() * 4);
                    while (lane1 === lane2) lane2 = Math.floor(Math.random() * 4);
                    notes.push({ id: notes.length, time: currentTime, lane: lane1 });
                    notes.push({ id: notes.length + 1, time: currentTime, lane: lane2 });
                }
                // Stream or stairs can be added here
                currentTime += beatDuration / (Math.random() < 0.5 ? 2 : 1);
            }
            return notes;
        }

        const SAMPLE_SONG = {
            title: "리듬 마스터",
            artist: "내장 음원",
            duration: 60,
            difficulties: {
                [Difficulty.Easy]: { level: 3, notes: generateBeatmap(120, 60) },
                [Difficulty.Normal]: { level: 6, notes: generateBeatmap(140, 60) },
                [Difficulty.Hard]: { level: 9, notes: generateBeatmap(160, 60) },
            }
        };

        const MainMenu = ({ onStartGame }) => {
            const [selectedDifficulty, setSelectedDifficulty] = useState(Difficulty.Normal);
            const [audioFile, setAudioFile] = useState(null);
            const fileInputRef = useRef(null);

            const handleFileChange = (event) => {
                const file = event.target.files[0];
                if (file) {
                    const url = URL.createObjectURL(file);
                    setAudioFile({ name: file.name, url: url });
                }
            };
            
            const startGame = () => {
                onStartGame(SAMPLE_SONG.difficulties[selectedDifficulty].notes, audioFile ? audioFile.url : null);
            };

            return (
                <div className="w-full h-full bg-gray-900 text-white flex flex-col justify-center items-center p-8 animate-fade-in">
                    <h1 className="text-6xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">리액트 리듬</h1>
                    <p className="text-xl text-gray-400 mb-12">D, F, J, K 키를 사용하여 노트를 맞춰보세요.</p>

                    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-3">난이도 선택</h2>
                            <div className="flex justify-center gap-2">
                                {Object.values(Difficulty).map(diff => (
                                    <button
                                        key={diff}
                                        onClick={() => setSelectedDifficulty(diff)}
                                        className={'w-full py-3 px-4 rounded-lg font-bold transition-all ' + (selectedDifficulty === diff ? 'bg-indigo-600 shadow-lg' : 'bg-gray-700 hover:bg-gray-600')}
                                    >{diff}</button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-6">
                           <h2 className="text-2xl font-bold mb-3">음악 파일 (선택)</h2>
                           <button onClick={() => fileInputRef.current.click()} className="w-full py-3 px-4 rounded-lg font-bold bg-gray-700 hover:bg-gray-600 transition-colors">
                               {audioFile ? audioFile.name : '음악 파일 업로드'}
                           </button>
                           <input type="file" accept="audio/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                        </div>
                        <button onClick={startGame} className="w-full py-4 text-xl font-extrabold rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition-all transform hover:scale-105">
                            게임 시작
                        </button>
                    </div>
                </div>
            );
        };
        
        const ResultsScreen = ({ results, onRestart }) => {
            const { score, judgments, maxCombo, beatmap } = results;
            const totalNotes = beatmap.length;
            const maxScore = totalNotes * SCORES[Judgment.Perfect];
            const accuracy = maxScore > 0 ? (score / maxScore * 100).toFixed(2) : 0;

            const grade = useMemo(() => {
                const scoreRatio = maxScore > 0 ? score / maxScore : 0;
                return GRADES.find(g => scoreRatio >= g.threshold) || GRADES[GRADES.length - 1];
            }, [score, maxScore]);

            return (
                <div className="w-full h-full bg-gray-900 text-white flex flex-col justify-center items-center p-8 animate-fade-in">
                    <h1 className="text-5xl font-black mb-6">결과</h1>
                    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-2xl grid grid-cols-2 gap-x-12 gap-y-6">
                        <div className="col-span-2 flex justify-between items-center bg-gray-900 p-6 rounded-lg">
                           <div>
                               <p className="text-lg text-gray-400">점수</p>
                               <p className="text-5xl font-bold">{score.toLocaleString()}</p>
                           </div>
                           <div className="text-right">
                               <p className="text-lg text-gray-400">등급</p>
                               <p className={'text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br ' + grade.gradient}>{grade.name}</p>
                           </div>
                        </div>
                        
                        {Object.values(Judgment).map(j => (
                           <div key={j} className="flex justify-between items-center text-2xl font-bold">
                               <span className={'text-transparent bg-clip-text bg-gradient-to-r ' + JUDGMENT_GRADIENTS[j]}>{j}</span>
                               <span>{judgments[j]}</span>
                           </div>
                        ))}

                        <div className="col-span-2 grid grid-cols-2 gap-8 pt-4">
                           <div className="text-center">
                               <p className="text-lg text-gray-400">최대 콤보</p>
                               <p className="text-4xl font-bold">{maxCombo}</p>
                           </div>
                           <div className="text-center">
                               <p className="text-lg text-gray-400">정확도</p>
                               <p className="text-4xl font-bold">{accuracy}%</p>
                           </div>
                        </div>

                    </div>
                    <button onClick={onRestart} className="mt-8 py-3 px-12 text-xl font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-all">
                        메인 메뉴로
                    </button>
                </div>
            );
        };
        
        const GameScreen = ({ beatmap, audioSrc, onFinish }) => {
            const [gameState, setGameState] = useState({
                score: 0,
                combo: 0,
                maxCombo: 0,
                judgments: { [Judgment.Perfect]: 0, [Judgment.Great]: 0, [Judgment.Good]: 0, [Judgment.Miss]: 0 },
                activeNotes: beatmap.map(note => ({ ...note, judged: false })),
            });
            const [currentTime, setCurrentTime] = useState(0);
            const [visualEffects, setVisualEffects] = useState({ judgments: [], laneFlashes: [0, 0, 0, 0], particles: [] });

            const gameStartTime = useRef(null);
            const audioRef = useRef(null);
            const gameLoopRef = useRef(null);
            const lastLaneFlashTime = useRef([0,0,0,0]);

            const gameLoop = useCallback((timestamp) => {
                if (!gameStartTime.current) {
                    gameStartTime.current = timestamp;
                    if (audioRef.current) audioRef.current.play();
                }
                const newCurrentTime = timestamp - gameStartTime.current;
                setCurrentTime(newCurrentTime);

                // Handle missed notes
                setGameState(prev => {
                    const newActiveNotes = [...prev.activeNotes];
                    let missed = false;
                    for (const note of newActiveNotes) {
                        if (!note.judged && newCurrentTime > note.time + TIMING_WINDOWS[Judgment.Miss]) {
                            note.judged = true;
                            missed = true;
                            prev.judgments[Judgment.Miss]++;
                        }
                    }
                    if (missed) {
                         setVisualEffects(ve => ({...ve, judgments: [...ve.judgments, { id: Math.random(), type: Judgment.Miss }] }));
                         return {...prev, activeNotes: newActiveNotes, combo: 0 };
                    }
                    return prev;
                });
                
                // End game condition
                if (newCurrentTime > beatmap[beatmap.length - 1].time + NOTE_FALL_DURATION) {
                     onFinish({ score: gameState.score, judgments: gameState.judgments, maxCombo: gameState.maxCombo, beatmap });
                     return;
                }

                gameLoopRef.current = requestAnimationFrame(gameLoop);
            }, [beatmap, gameState.score, gameState.judgments, gameState.maxCombo]);

            const handleKeyPress = useCallback((e) => {
                const lane = KEY_BINDINGS[e.key.toLowerCase()];
                if (lane === undefined) return;

                const pressTime = performance.now() - gameStartTime.current;
                
                // Visual flash on key press
                const now = performance.now();
                if(now - lastLaneFlashTime.current[lane] > 150) { // Debounce flash
                    lastLaneFlashTime.current[lane] = now;
                    setVisualEffects(v => {
                        const newFlashes = [...v.laneFlashes];
                        newFlashes[lane] = (newFlashes[lane] || 0) + 1;
                        return { ...v, laneFlashes: newFlashes };
                    });
                }
                
                const targetNote = gameState.activeNotes.find(note =>
                    !note.judged &&
                    note.lane === lane &&
                    Math.abs(pressTime - note.time) <= TIMING_WINDOWS[Judgment.Miss]
                );

                if (targetNote) {
                    const timeDiff = Math.abs(pressTime - targetNote.time);
                    let judgment = Judgment.Miss;
                    if (timeDiff <= TIMING_WINDOWS[Judgment.Perfect]) judgment = Judgment.Perfect;
                    else if (timeDiff <= TIMING_WINDOWS[Judgment.Great]) judgment = Judgment.Great;
                    else if (timeDiff <= TIMING_WINDOWS[Judgment.Good]) judgment = Judgment.Good;
                    
                    if(judgment !== Judgment.Miss) {
                        targetNote.judged = true;
                        setGameState(prev => {
                           const newCombo = prev.combo + 1;
                           const newMaxCombo = Math.max(prev.maxCombo, newCombo);
                           const newJudgments = {...prev.judgments, [judgment]: prev.judgments[judgment] + 1};
                           const newScore = prev.score + SCORES[judgment] + newCombo;
                           return {...prev, combo: newCombo, maxCombo: newMaxCombo, judgments: newJudgments, score: newScore};
                        });
                        if (judgment === Judgment.Perfect) {
                            // Create particles for perfect
                            const newParticles = Array.from({length: 8}).map(() => ({
                                id: Math.random(),
                                lane,
                                tx: (Math.random() - 0.5) * 80,
                                ty: (Math.random() - 0.5) * 80,
                            }));
                            setVisualEffects(ve => ({...ve, particles: [...ve.particles, ...newParticles]}));
                        }
                    } else {
                         setGameState(prev => ({...prev, combo: 0, judgments: {...prev.judgments, [Judgment.Miss]: prev.judgments[Judgment.Miss] + 1}}));
                    }
                     setVisualEffects(ve => ({...ve, judgments: [...ve.judgments, { id: Math.random(), type: judgment }] }));

                }
            }, [gameState.activeNotes]);
            
            useEffect(() => {
                gameLoopRef.current = requestAnimationFrame(gameLoop);
                window.addEventListener('keydown', handleKeyPress);
                return () => {
                    cancelAnimationFrame(gameLoopRef.current);
                    window.removeEventListener('keydown', handleKeyPress);
                    if(audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                    }
                };
            }, [gameLoop, handleKeyPress]);

            return (
                <div className="relative w-full h-full bg-gray-900 overflow-hidden select-none">
                    {audioSrc && <audio ref={audioRef} src={audioSrc} />}
                    
                    {/* Game UI */}
                    <div className="absolute top-4 left-4 text-white font-bold z-20">
                        <p className="text-4xl">{gameState.score.toLocaleString().padStart(8, '0')}</p>
                    </div>
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        {gameState.combo > 2 && (
                            <div className="text-center animate-combo-bounce-in">
                                <p className="text-7xl font-black text-white" style={{WebkitTextStroke: '3px black'}}>{gameState.combo}</p>
                                <p className="text-2xl font-bold text-gray-200 -mt-2">COMBO</p>
                            </div>
                        )}
                        {visualEffects.judgments.map(j => (
                             <p key={j.id} className={'absolute top-0 left-1/2 -translate-x-1/2 text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r animate-judgment-pop ' + JUDGMENT_GRADIENTS[j.type]}>{j.type}</p>
                        ))}
                    </div>

                    {/* Playfield */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full">
                        <div className="relative w-full h-full flex justify-center gap-1">
                            {Array.from({ length: LANE_COUNT }).map((_, i) => (
                                <div key={i} className="relative w-24 h-full bg-black/50">
                                   {/* Judgment Line */}
                                   <div className="absolute bottom-12 left-0 right-0 h-1 bg-white/20">
                                      {visualEffects.laneFlashes[i] > 0 && <div key={visualEffects.laneFlashes[i]} className="absolute bottom-0 left-[-50%] w-[200%] animate-judgment-line-flash" />}
                                   </div>
                                   {/* Keys display */}
                                   <div className={'absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-8 rounded border-2 ' + TARGET_COLORS[i] + ' flex justify-center items-center text-white font-bold'}>
                                       {Object.keys(KEY_BINDINGS).find(key => KEY_BINDINGS[key] === i).toUpperCase()}
                                   </div>
                                    {/* Particles */}
                                    {visualEffects.particles.filter(p => p.lane === i).map(p => (
                                        <div key={p.id} className="absolute bottom-12 left-1/2 w-3 h-3 bg-yellow-300 rounded-full animate-gold-dust"
                                             onAnimationEnd={() => setVisualEffects(v => ({...v, particles: v.particles.filter(particle => particle.id !== p.id)}))}
                                             style={{ '--tx': p.tx+'px', '--ty': -p.ty+'px' }}></div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        
                        {/* Notes */}
                        {gameState.activeNotes.filter(n => !n.judged).map(note => {
                            const yPos = (note.time - currentTime) / NOTE_FALL_DURATION;
                            if (yPos < -0.1 || yPos > 1.1) return null;
                            return <div key={note.id} className={'absolute w-24 h-4 rounded-md ' + TARGET_COLORS[note.lane].replace('border', 'bg')}
                                style={{
                                    left: 'calc(50% - 12.5rem + ' + note.lane * 6.25 + 'rem)',
                                    bottom: (12 + (yPos * (window.innerHeight - 48))) + 'px'
                                }}/>
                        })}
                    </div>
                </div>
            );
        };
        
        const RhythmGame = () => {
            const [gameState, setGameState] = useState(GameState.MainMenu);
            const [gameSettings, setGameSettings] = useState(null);
            const [lastResults, setLastResults] = useState(null);

            const handleStartGame = (beatmap, audioSrc) => {
                setGameSettings({ beatmap, audioSrc });
                setGameState(GameState.Playing);
            };

            const handleGameFinish = (results) => {
                setLastResults(results);
                setGameState(GameState.Results);
            };

            const handleRestart = () => {
                setGameSettings(null);
                setLastResults(null);
                setGameState(GameState.MainMenu);
            };

            switch (gameState) {
                case GameState.Playing:
                    return <GameScreen {...gameSettings} onFinish={handleGameFinish} />;
                case GameState.Results:
                    return <ResultsScreen results={lastResults} onRestart={handleRestart} />;
                case GameState.MainMenu:
                default:
                    return <MainMenu onStartGame={handleStartGame} />;
            }
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<RhythmGame />);
    </script>
</body>
</html>
`
  },
  {
    id: 'da-vinci-code',
    name: '다빈치 코드',
    description: '상대방의 비밀 코드를 모두 맞춰보세요. 추리와 논리가 승리의 열쇠입니다.',
    code: `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>다빈치 코드</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="importmap">
    {
      "imports": {
        "react": "https://aistudiocdn.com/react@^19.2.0",
        "react-dom/client": "https://aistudiocdn.com/react-dom@^19.2.0/client"
      }
    }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Noto+Sans+KR:wght@400;700&display=swap');
        body {
            font-family: 'Noto Sans KR', sans-serif;
            margin: 0;
            user-select: none;
        }
        .cinzel {
            font-family: 'Cinzel', serif;
        }
        .tile-black {
            background-color: #262626;
            color: #f5f5f5;
        }
        .tile-white {
            background-color: #f5f5f5;
            color: #262626;
        }
        .tile-back {
            background-image: linear-gradient(135deg, #a1887f 0%, #795548 100%);
            box-shadow: inset 0 0 5px rgba(0,0,0,0.5);
        }
        @keyframes flip-reveal {
            from { transform: rotateY(90deg); }
            to { transform: rotateY(0deg); }
        }
        .animate-flip-reveal {
            animation: flip-reveal 0.4s ease-out;
        }
        @keyframes pop-in {
            from { transform: scale(0.7); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
            animation: pop-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" data-type="module">
        import React, { useState, useEffect, useCallback, useMemo } from 'react';
        import ReactDOM from 'react-dom/client';

        const GameState = {
            PLAYER_TURN_DRAW: 'PLAYER_TURN_DRAW',
            PLAYER_TURN_GUESS: 'PLAYER_TURN_GUESS',
            PLAYER_TURN_CONTINUE_GUESS: 'PLAYER_TURN_CONTINUE_GUESS',
            AI_TURN: 'AI_TURN',
            GAME_OVER: 'GAME_OVER',
        };

        const createDeck = () => {
            let deck = [];
            for (let i = 0; i <= 11; i++) {
                deck.push({ color: 'black', value: i, id: 'b'+i });
                deck.push({ color: 'white', value: i, id: 'w'+i });
            }
            return deck;
        };
        
        const shuffle = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const sortHand = (hand) => {
            return hand.sort((a, b) => {
                if (a.value < b.value) return -1;
                if (a.value > b.value) return 1;
                if (a.color === 'black') return -1; // Black comes before white for same value
                return 1;
            });
        };

        const Tile = ({ tile, isRevealed, isPlayer, onClick, isSelected }) => {
            const revealed = isRevealed || (isPlayer && !tile);
            
            let tileClasses = 'w-16 h-24 rounded-lg flex justify-center items-center font-bold text-4xl shadow-md transition-all duration-300 transform ';
            
            if (isRevealed) {
                tileClasses += tile.color === 'black' ? 'tile-black ' : 'tile-white ';
                tileClasses += 'animate-flip-reveal ';
            } else {
                tileClasses += 'tile-back ';
                 if (!isPlayer && onClick) {
                     tileClasses += 'cursor-pointer hover:-translate-y-2 ';
                 }
            }

            if(isSelected) {
                tileClasses += 'ring-4 ring-yellow-400 -translate-y-2';
            }

            return (
                <div className={tileClasses} onClick={onClick}>
                    {isRevealed && <span className="cinzel">{tile.value}</span>}
                </div>
            );
        };
        
        const GuessModal = ({ onGuess, onCancel, targetTileIndex }) => {
            const [selectedNumber, setSelectedNumber] = useState(null);
            
            const handleGuess = (color) => {
                if (selectedNumber !== null) {
                    onGuess({ index: targetTileIndex, value: selectedNumber, color });
                }
            }

            return (
                <div className="absolute inset-0 bg-black/70 flex justify-center items-center z-50 animate-pop-in">
                    <div className="bg-stone-800 p-8 rounded-xl shadow-2xl text-white w-full max-w-sm">
                        <h2 className="text-2xl font-bold text-center mb-6 cinzel">Make Your Guess</h2>
                        <div className="grid grid-cols-6 gap-2 mb-6">
                            {Array.from({length: 12}).map((_, i) => (
                                <button key={i} onClick={() => setSelectedNumber(i)} className={'h-12 rounded-md font-bold text-xl transition-colors ' + (selectedNumber === i ? 'bg-yellow-500 text-black' : 'bg-stone-700 hover:bg-stone-600')}>
                                    {i}
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <button onClick={() => handleGuess('black')} disabled={selectedNumber === null} className="py-3 font-bold rounded-md bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed">검정</button>
                           <button onClick={() => handleGuess('white')} disabled={selectedNumber === null} className="py-3 font-bold rounded-md bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed">하양</button>
                        </div>
                         <button onClick={onCancel} className="w-full mt-4 py-2 text-stone-400 hover:text-white transition-colors">취소</button>
                    </div>
                </div>
            );
        };


        const DaVinciCodeGame = () => {
            const [gameState, setGameState] = useState(null);
            const [message, setMessage] = useState('');
            const [playerHand, setPlayerHand] = useState([]);
            const [aiHand, setAIHand] = useState([]);
            const [deck, setDeck] = useState([]);
            const [newlyDrawnTile, setNewlyDrawnTile] = useState(null);
            const [guessTarget, setGuessTarget] = useState(null); // { index: number }
            const [winner, setWinner] = useState(null);
            const [lastGuessResult, setLastGuessResult] = useState(null);

            const setupGame = useCallback(() => {
                const fullDeck = shuffle(createDeck());
                const pHand = [];
                const aHand = [];
                for(let i=0; i<4; i++) {
                    pHand.push(fullDeck.pop());
                    aHand.push(fullDeck.pop());
                }
                setPlayerHand(sortHand(pHand.map(t => ({...t, revealed: false}))));
                setAIHand(sortHand(aHand.map(t => ({...t, revealed: false}))));
                setDeck(fullDeck);
                setGameState(GameState.PLAYER_TURN_DRAW);
                setMessage('당신의 턴입니다. 타일을 뽑으세요.');
                setNewlyDrawnTile(null);
                setWinner(null);
                setLastGuessResult(null);
            }, []);

            useEffect(() => {
                setupGame();
            }, [setupGame]);
            
            const handleDrawTile = () => {
                if (gameState !== GameState.PLAYER_TURN_DRAW) return;
                const newDeck = [...deck];
                const drawnTile = newDeck.pop();
                setDeck(newDeck);
                setNewlyDrawnTile(drawnTile);
                
                const tempHand = [...playerHand, { ...drawnTile, revealed: false }];
                setPlayerHand(sortHand(tempHand));

                setGameState(GameState.PLAYER_TURN_GUESS);
                setMessage('상대방의 타일 중 하나를 추리하세요.');
            };
            
            const handleTileClick = (index) => {
                if (gameState !== GameState.PLAYER_TURN_GUESS && gameState !== GameState.PLAYER_TURN_CONTINUE_GUESS) return;
                setGuessTarget({ index });
            };
            
            const handleGuess = ({ index, value, color }) => {
                const targetTile = aiHand[index];
                const correct = targetTile.value === value && targetTile.color === color;
                
                setLastGuessResult({ correct, value, color, index });
                
                if (correct) {
                    const newAIHand = [...aiHand];
                    newAIHand[index].revealed = true;
                    setAIHand(newAIHand);
                    setMessage('정답입니다! 계속 추리하거나 턴을 마칠 수 있습니다.');
                    
                    if (newAIHand.every(t => t.revealed)) {
                        setWinner('player');
                        setGameState(GameState.GAME_OVER);
                        setMessage('승리했습니다!');
                    } else {
                        setGameState(GameState.PLAYER_TURN_CONTINUE_GUESS);
                    }

                } else {
                    // FIX: Replaced template literal with string concatenation to fix parsing error.
                    setMessage('틀렸습니다. 당신이 뽑은 타일(' + newlyDrawnTile.value + ' ' + newlyDrawnTile.color + ')이 공개됩니다.');
                    const newPlayerHand = playerHand.map(t => t.id === newlyDrawnTile.id ? {...t, revealed: true} : t);
                    setPlayerHand(newPlayerHand);
                    
                    if (newPlayerHand.every(t => t.revealed)) {
                         setWinner('ai');
                         setGameState(GameState.GAME_OVER);
                         setMessage('패배했습니다.');
                    } else {
                         setGameState(GameState.AI_TURN);
                    }
                }
                setGuessTarget(null);
                setNewlyDrawnTile(null);
            };
            
            const handleEndTurn = () => {
                setGameState(GameState.AI_TURN);
            };

            // AI Logic
            useEffect(() => {
                if (gameState === GameState.AI_TURN) {
                    setMessage('AI의 턴입니다...');
                    
                    const timeoutId = setTimeout(() => {
                        // 1. AI draws a tile
                        const newDeck = [...deck];
                        const drawnTile = newDeck.pop();
                        if (!drawnTile) {
                            // No tiles left to draw, this shouldn't happen in normal play but as a fallback
                             setGameState(GameState.PLAYER_TURN_DRAW);
                             setMessage('당신의 턴입니다. 타일을 뽑으세요.');
                             return;
                        }
                        
                        const tempAIHand = [...aiHand, { ...drawnTile, revealed: false }];
                        const sortedAIHand = sortHand(tempAIHand);
                        
                        // 2. AI makes a guess
                        const unrevealedPlayerTiles = playerHand
                            .map((tile, index) => ({ ...tile, index }))
                            .filter(tile => !tile.revealed);
                        
                        if(unrevealedPlayerTiles.length === 0) { // Should be caught by win condition but good to have
                            setGameState(GameState.PLAYER_TURN_DRAW);
                            return;
                        }

                        // Super simple AI: just guess a random unrevealed tile with a random value
                        const target = unrevealedPlayerTiles[Math.floor(Math.random() * unrevealedPlayerTiles.length)];
                        const guessedValue = Math.floor(Math.random() * 12);
                        const guessedColor = Math.random() < 0.5 ? 'black' : 'white';
                        
                        const correct = target.value === guessedValue && target.color === guessedColor;
                        
                        // FIX: Replaced template literal with string concatenation to fix parsing error.
                        setMessage('AI가 당신의 ' + (target.index + 1) + '번째 타일을 ' + guessedValue + ' ' + guessedColor + '(으)로 추측합니다.');
                        setLastGuessResult({ correct, value: guessedValue, color: guessedColor, index: target.index, isAI: true });

                        setTimeout(() => {
                            if (correct) {
                                const newPlayerHand = [...playerHand];
                                newPlayerHand[target.index].revealed = true;
                                setPlayerHand(newPlayerHand);
                                setAIHand(sortedAIHand); // Place drawn tile without revealing
                                
                                if (newPlayerHand.every(t => t.revealed)) {
                                    setWinner('ai');
                                    setGameState(GameState.GAME_OVER);
                                    setMessage('패배했습니다.');
                                } else {
                                    // Simple AI doesn't continue guessing
                                    setMessage('AI가 맞췄습니다. 당신의 턴입니다.');
                                    setGameState(GameState.PLAYER_TURN_DRAW);
                                }
                            } else {
                                setMessage('AI가 틀렸습니다. AI가 뽑은 타일이 공개됩니다.');
                                const revealedAIHand = sortedAIHand.map(t => t.id === drawnTile.id ? {...t, revealed: true} : t);
                                setAIHand(revealedAIHand);
                                setGameState(GameState.PLAYER_TURN_DRAW);
                            }
                        }, 2000);
                        
                    }, 2000);
                    return () => clearTimeout(timeoutId);
                }
            }, [gameState]);


            return (
                <div className="w-full h-full bg-stone-900 text-white flex flex-col justify-center items-center p-4"
                     style={{backgroundImage: 'radial-gradient(circle, #5d4037, #212121)'}}>
                    
                    {guessTarget && <GuessModal onGuess={handleGuess} onCancel={() => setGuessTarget(null)} targetTileIndex={guessTarget.index} />}
                    
                    {winner && (
                        <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center z-50 animate-pop-in">
                            <h2 className="text-6xl font-bold cinzel mb-4">{winner === 'player' ? 'YOU WIN' : 'YOU LOSE'}</h2>
                            <button onClick={setupGame} className="mt-4 px-8 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-lg text-xl font-bold">다시하기</button>
                        </div>
                    )}

                    {/* AI Hand */}
                    <div className="flex justify-center items-end gap-2 h-40">
                       {aiHand.map((tile, index) => (
                           <Tile 
                               key={tile.id} 
                               tile={tile} 
                               isRevealed={tile.revealed} 
                               isPlayer={false}
                               onClick={!tile.revealed ? () => handleTileClick(index) : null}
                               isSelected={guessTarget?.index === index}
                           />
                       ))}
                    </div>

                    {/* Center Area */}
                    <div className="flex-grow flex flex-col justify-center items-center w-full max-w-2xl my-4">
                        <div className="flex justify-between w-full items-center mb-4">
                            <div className="text-center">
                                <p className="cinzel text-lg">AI Tiles</p>
                                <p className="text-3xl font-bold">{aiHand.filter(t=>!t.revealed).length}</p>
                            </div>
                             <div className="text-center">
                                <h1 className="text-4xl cinzel font-bold tracking-widest">DA VINCI CODE</h1>
                                <p className="text-stone-400 h-6 mt-2">{message}</p>
                             </div>
                            <div className="text-center">
                                <p className="cinzel text-lg">Your Tiles</p>
                                <p className="text-3xl font-bold">{playerHand.filter(t=>!t.revealed).length}</p>
                            </div>
                        </div>

                        {/* Deck and Actions */}
                        <div className="h-24 flex items-center">
                        {gameState === GameState.PLAYER_TURN_DRAW && (
                            <button onClick={handleDrawTile} className="px-6 py-3 rounded-lg bg-stone-700 hover:bg-stone-600 font-bold transition-colors">타일 뽑기 ({deck.length} 남음)</button>
                        )}
                        {gameState === GameState.PLAYER_TURN_CONTINUE_GUESS && (
                            <button onClick={handleEndTurn} className="px-6 py-3 rounded-lg bg-stone-700 hover:bg-stone-600 font-bold transition-colors">턴 종료</button>
                        )}
                        </div>
                    </div>
                    
                    {/* Player Hand */}
                    <div className="flex justify-center items-start gap-2 h-40">
                         {playerHand.map((tile, index) => <Tile key={tile.id} tile={tile} isRevealed={tile.revealed} isPlayer={true} />)}
                    </div>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<DaVinciCodeGame />);
    </script>
</body>
</html>
`
  },
];