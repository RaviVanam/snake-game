import './Game.css';
import GameGrid from "./components/GameGrid";
import GameOver from './components/GameOver';
import useGameGrid from './hooks/useGameGrid';
import SpeedControls from './components/SpeedControls';
import DirectionControls from './components/DirectionControls';

export default function Game() {

    const [gameGrid, gameHandlers] = useGameGrid();

    const score = gameGrid.snake.length;
    const gameOverScreen = gameGrid.gameOverScreen;

    return (
        <>
            {gameGrid.firstGame && <button onClick={gameHandlers.handlePlay} style={{ fontSize: 42 }} > play</button>}
            <SpeedControls gameHandlers={gameHandlers} />
            <div className="game-container">
                <GameGrid cells={gameGrid.cells} gameOverScreen={gameOverScreen} />
                {gameOverScreen && <GameOver score={score} handlePlayAgain={gameHandlers.handlePlayAgain} />}
            </div>
            <DirectionControls gameHandlers={gameHandlers} />
        </>
    )
}