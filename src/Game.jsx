import './Game.css';
import GameGrid from "./components/GameGrid";
import GameOver from './components/GameOver';
import { useEffect, useReducer } from "react";
import { gridReducer } from "./reducers.js";
import { initialState, transitionDuration } from "./initialValues";
import { Directions } from "./components/utilities/directions";

export default function Game() {

    // state ------------------------------------------------------------------------
    const [grid, dispatchGrid] = useReducer(gridReducer, initialState);

    // derived states
    const score = grid.snake.length;
    const gameOverScreen = grid.gameOverScreen;

    // side effects -----------------------------------------------------------------
    // add keydown listener
    useEffect(addKeydownListener, []);

    // auto move snake
    useEffect(autoMoveSnake, [grid.endGame, grid.snakeSpeed]);

    // randomly generate food
    useEffect(autoGenerateFood, [grid.endGame, grid.foodSpeed]);

    // auto remove food
    useEffect(autoRemoveFood, [grid.endGame, grid.foodSpeed]);

    // randomly drop mines
    useEffect(autoDropMines, [grid.endGame, grid.mineSpeed]);

    // auto remove mines
    useEffect(autoRemoveMines, [grid.endGame, grid.mineSpeed]);

    // use effect callbacks ---------------------------------------------------------
    function addKeydownListener() {
        const handleKeyPressedEvent = (e) => {
            e.preventDefault();
            if (e.keyCode >= 37 && e.keyCode <= 40) // keycodes 37 to 40 match arrow keys
                handleDirectionChanged(e.key);
        }
        window.addEventListener('keydown', handleKeyPressedEvent);

        return () => {
            window.removeEventListener('keydown', handleKeyPressedEvent);
        }
    }

    function autoMoveSnake() {
        if (grid.endGame) return () => { };
        const id = setInterval(() => {
            handleMove();
        }, 500 / grid.snakeSpeed)

        return () => {
            clearInterval(id);
        }
    }

    function autoGenerateFood() {
        if (grid.endGame) return () => { };

        const id = setInterval(() => {
            handlePlaceFood();
        }, 5000 / grid.foodSpeed)

        return () => {
            clearInterval(id);
        }
    }

    function autoRemoveFood() {
        if (grid.endGame) return () => { };

        const id = setInterval(() => {
            handleRemoveFood();
        }, 30000 / grid.foodSpeed)

        return () => {
            clearInterval(id);
        }
    }

    function autoDropMines() {
        if (grid.endGame) return () => { };

        const id = setInterval(() => {
            handlePlaceMine();
        }, 7000 / grid.mineSpeed)

        return () => {
            clearInterval(id);
        }
    }

    function autoRemoveMines() {
        if (grid.endGame) return () => { };

        const id = setInterval(() => {
            handleRemoveMine();
        }, 100000 / grid.mineSpeed)

        return () => {
            clearInterval(id);
        }
    }

    // event handlers ---------------------------------------------------------------
    function handleMove() {
        dispatchGrid({
            type: 'moved',
        })
    }

    function handlePlay() {
        dispatchGrid({
            type: 'startGame',
            snakeSpeed: grid.snakeSpeed,
            foodSpeed: grid.foodSpeed,
        })
    }

    function handleDirectionChanged(newDirection) {
        dispatchGrid({
            type: 'directionChanged',
            newDirection: newDirection,
        })
    }

    function handlePlaceFood() {
        dispatchGrid({
            type: 'placeFood',
        })
    }

    function handleRemoveFood() {
        dispatchGrid({
            type: 'removeFood',
        })
    }

    function handlePlaceMine() {
        dispatchGrid({
            type: 'placeMine',
        })
    }

    function handleRemoveMine() {
        dispatchGrid({
            type: 'removeMine',
        })
    }

    function handleSnakeSpeedChange(e) {
        dispatchGrid({
            type: 'snakeSpeedChanged',
            speed: e.target.value,
        })
    }

    function handleFoodSpeedChange(e) {
        dispatchGrid({
            type: 'foodSpeedChanged',
            speed: e.target.value,
        })
    }

    function handleMineSpeedChange(e) {
        dispatchGrid({
            type: 'mineSpeedChanged',
            speed: e.target.value,
        })
    }

    function handlePlayAgain() {
        dispatchGrid({
            type: 'resetGame',
        })

        setTimeout(handlePlay, transitionDuration);
    }

    return (
        <>
            {/* <button onClick={autoMoveSnake} style={{ fontSize: 42, marginLeft: '700px' }}>move</button> */}
            {grid.firstGame && <button onClick={handlePlay} style={{ fontSize: 42 }} > play</button>}
            <div className="speed-options">
                <div className="snake-speed-options">
                    <label htmlFor="">Snake Speed</label>
                    <button onClick={handleSnakeSpeedChange} value={5}>Slow</button>
                    <button onClick={handleSnakeSpeedChange} value={10}>Fast</button>
                    <button onClick={handleSnakeSpeedChange} value={20}>Very Fast</button>
                </div>
                <div className="food-speed-options">
                    <label htmlFor="">Food Speed</label>
                    <button onClick={handleFoodSpeedChange} value={5}>Slow</button>
                    <button onClick={handleFoodSpeedChange} value={10}>Fast</button>
                    <button onClick={handleFoodSpeedChange} value={40}>Very Fast</button>
                </div>
                <div className="mine-speed-options">
                    <label htmlFor="">Mine Speed</label>
                    <button onClick={handleMineSpeedChange} value={5}>Slow</button>
                    <button onClick={handleMineSpeedChange} value={10}>Fast</button>
                    <button onClick={handleMineSpeedChange} value={40}>Very Fast</button>
                </div>
            </div>
            <div className="game-container">
                <GameGrid cells={grid.cells} gameOverScreen={gameOverScreen} />
                {gameOverScreen && <GameOver score={score} handlePlayAgain={handlePlayAgain} />}
            </div>

            <div className="direction-buttons">
                <button className="button" onClick={() => handleDirectionChanged(Directions.UP)}>UP</button>
                <button className="button" onClick={() => handleDirectionChanged(Directions.LEFT)}>LEFT</button>
                <button className="button" onClick={() => handleDirectionChanged(Directions.DOWN)}>DOWN</button>
                <button className="button" onClick={() => handleDirectionChanged(Directions.RIGHT)}>RIGHT</button>
            </div>
        </>
    )
}