import './Game.css';
import GameGrid from "./components/GameGrid";
import GameOver from './components/GameOver';
import { useEffect } from "react";
import { Directions } from "./components/utilities/directions";
import useGameGrid from './hooks/useGameGrid';

export default function Game() {

    const [grid, handlers] = useGameGrid();

    const score = grid.snake.length;
    const gameOverScreen = grid.gameOverScreen;

    useEffect(addKeydownListener, []);
    useEffect(autoMoveSnake, [grid.endGame, grid.snakeSpeed]);
    useEffect(autoGenerateFood, [grid.endGame, grid.foodSpeed]);
    useEffect(autoRemoveFood, [grid.endGame, grid.foodSpeed]);
    useEffect(autoDropMines, [grid.endGame, grid.mineSpeed]);
    useEffect(autoRemoveMines, [grid.endGame, grid.mineSpeed]);

    function addKeydownListener() {
        const handleKeyPressedEvent = (e) => {
            e.preventDefault();
            if (e.keyCode >= 37 && e.keyCode <= 40) // keycodes 37 to 40 match arrow keys
                handlers.handleDirectionChanged(e.key);
        }
        window.addEventListener('keydown', handleKeyPressedEvent);

        return () => {
            window.removeEventListener('keydown', handleKeyPressedEvent);
        }
    }

    function autoMoveSnake() {
        if (grid.endGame) return () => { };
        const id = setInterval(() => {
            handlers.handleMove();
        }, 500 / grid.snakeSpeed)

        return () => {
            clearInterval(id);
        }
    }

    function autoGenerateFood() {
        if (grid.endGame) return () => { };

        const id = setInterval(() => {
            handlers.handlePlaceFood();
        }, 5000 / grid.foodSpeed)

        return () => {
            clearInterval(id);
        }
    }

    function autoRemoveFood() {
        if (grid.endGame) return () => { };

        const id = setInterval(() => {
            handlers.handleRemoveFood();
        }, 30000 / grid.foodSpeed)

        return () => {
            clearInterval(id);
        }
    }

    function autoDropMines() {
        if (grid.endGame) return () => { };

        const id = setInterval(() => {
            handlers.handlePlaceMine();
        }, 7000 / grid.mineSpeed)

        return () => {
            clearInterval(id);
        }
    }

    function autoRemoveMines() {
        if (grid.endGame) return () => { };

        const id = setInterval(() => {
            handlers.handleRemoveMine();
        }, 100000 / grid.mineSpeed)

        return () => {
            clearInterval(id);
        }
    }

    return (
        <>handlers.
            {/* <button onClick={autoMoveSnake} style={{ fontSize: 42, marginLeft: '700px' }}>move</button> */}
            {grid.firstGame && <button onClick={handlers.handlePlay} style={{ fontSize: 42 }} > play</button>}
            <div className="speed-options">
                <div className="snake-speed-options">
                    <label htmlFor="">Snake Speed</label>
                    <button onClick={handlers.handleSnakeSpeedChange} value={5}>Slow</button>
                    <button onClick={handlers.handleSnakeSpeedChange} value={10}>Fast</button>
                    <button onClick={handlers.handleSnakeSpeedChange} value={20}>Very Fast</button>
                </div>
                <div className="food-speed-options">
                    <label htmlFor="">Food Speed</label>
                    <button onClick={handlers.handleFoodSpeedChange} value={5}>Slow</button>
                    <button onClick={handlers.handleFoodSpeedChange} value={10}>Fast</button>
                    <button onClick={handlers.handleFoodSpeedChange} value={40}>Very Fast</button>
                </div>
                <div className="mine-speed-options">
                    <label htmlFor="">Mine Speed</label>
                    <button onClick={handlers.handleMineSpeedChange} value={5}>Slow</button>
                    <button onClick={handlers.handleMineSpeedChange} value={10}>Fast</button>
                    <button onClick={handlers.handleMineSpeedChange} value={40}>Very Fast</button>
                </div>
            </div>
            <div className="game-container">
                <GameGrid cells={grid.cells} gameOverScreen={gameOverScreen} />
                {gameOverScreen && <GameOver score={score} handlePlayAgain={handlers.handlePlayAgain} />}
            </div>

            <div className="direction-buttons">
                <button className="button" onClick={() => handlers.handleDirectionChanged(Directions.UP)}>UP</button>
                <button className="button" onClick={() => handlers.handleDirectionChanged(Directions.LEFT)}>LEFT</button>
                <button className="button" onClick={() => handlers.handleDirectionChanged(Directions.DOWN)}>DOWN</button>
                <button className="button" onClick={() => handlers.handleDirectionChanged(Directions.RIGHT)}>RIGHT</button>
            </div>
        </>
    )
}