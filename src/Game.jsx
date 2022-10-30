import './Game.css';
import GameGrid from "./components/GameGrid";
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

    // remove food
    useEffect(autoRemoveFood, [grid.endGame, grid.foodSpeed]);

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

    function handlePlayAgain() {
        dispatchGrid({
            type: 'resetGame',
        })

        setTimeout(handlePlay, transitionDuration);
    }

    // dynamic content ---------------------------------------------------------------

    const endGameBox = (gameOverScreen) ? (
        <div className="end-game-box">
            <div className="details">
                Game Over! <br />
                <div className="score-board">
                    Score: {score}
                </div>
            </div>
            <button onClick={handlePlayAgain} style={{ fontSize: 42 }}>Play again?</button>
        </div>
    ) : false

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
            </div>
            <div className="game-container">
                <GameGrid cells={grid.cells} gameOverScreen={gameOverScreen} />
                {endGameBox}
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