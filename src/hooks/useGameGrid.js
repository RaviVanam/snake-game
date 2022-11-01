import { useReducer } from "react";
import { useEffect } from "react";
import { gridReducer } from "../reducers.js";
import { initialState, transitionDuration } from "../initialValues";

export default function useGameGrid() {
    const [grid, dispatchGrid] = useReducer(gridReducer, initialState);

    const handlers = {
        handleMove() {
            dispatchGrid({
                type: 'moved',
            })
        },

        handlePlay() {
            dispatchGrid({
                type: 'startGame',
                snakeSpeed: grid.snakeSpeed,
                foodSpeed: grid.foodSpeed,
            })
        },

        handleDirectionChanged(newDirection) {
            dispatchGrid({
                type: 'directionChanged',
                newDirection: newDirection,
            })
        },

        handlePlaceFood() {
            dispatchGrid({
                type: 'placeFood',
            })
        },

        handleRemoveFood() {
            dispatchGrid({
                type: 'removeFood',
            })
        },

        handlePlaceMine() {
            dispatchGrid({
                type: 'placeMine',
            })
        },

        handleRemoveMine() {
            dispatchGrid({
                type: 'removeMine',
            })
        },

        handleSnakeSpeedChange(e) {
            dispatchGrid({
                type: 'snakeSpeedChanged',
                speed: e.target.value,
            })
        },

        handleFoodSpeedChange(e) {
            dispatchGrid({
                type: 'foodSpeedChanged',
                speed: e.target.value,
            })
        },

        handleMineSpeedChange(e) {
            dispatchGrid({
                type: 'mineSpeedChanged',
                speed: e.target.value,
            })
        },

        handlePlayAgain() {
            dispatchGrid({
                type: 'resetGame',
            })

            setTimeout(handlers.handlePlay, transitionDuration);
        },
    }

    const effects = {
        addKeydownListener() {
            const handleKeyPressedEvent = (e) => {
                e.preventDefault();
                if (e.keyCode >= 37 && e.keyCode <= 40) // keycodes 37 to 40 match arrow keys
                    handlers.handleDirectionChanged(e.key);
            }
            window.addEventListener('keydown', handleKeyPressedEvent);

            return () => {
                window.removeEventListener('keydown', handleKeyPressedEvent);
            }
        },

        autoMoveSnake() {
            if (grid.endGame) return () => { };
            const id = setInterval(() => {
                handlers.handleMove();
            }, 500 / grid.snakeSpeed)

            return () => {
                clearInterval(id);
            }
        },

        autoGenerateFood() {
            if (grid.endGame) return () => { };

            const id = setInterval(() => {
                handlers.handlePlaceFood();
            }, 5000 / grid.foodSpeed)

            return () => {
                clearInterval(id);
            }
        },

        autoRemoveFood() {
            if (grid.endGame) return () => { };

            const id = setInterval(() => {
                handlers.handleRemoveFood();
            }, 30000 / grid.foodSpeed)

            return () => {
                clearInterval(id);
            }
        },

        autoDropMines() {
            if (grid.endGame) return () => { };

            const id = setInterval(() => {
                handlers.handlePlaceMine();
            }, 7000 / grid.mineSpeed)

            return () => {
                clearInterval(id);
            }
        },

        autoRemoveMines() {
            if (grid.endGame) return () => { };

            const id = setInterval(() => {
                handlers.handleRemoveMine();
            }, 100000 / grid.mineSpeed)

            return () => {
                clearInterval(id);
            }
        },
    }

    useEffect(effects.addKeydownListener, []);
    useEffect(effects.autoMoveSnake, [grid.endGame, grid.snakeSpeed]);
    useEffect(effects.autoGenerateFood, [grid.endGame, grid.foodSpeed]);
    useEffect(effects.autoRemoveFood, [grid.endGame, grid.foodSpeed]);
    useEffect(effects.autoDropMines, [grid.endGame, grid.mineSpeed]);
    useEffect(effects.autoRemoveMines, [grid.endGame, grid.mineSpeed]);

    return [grid, handlers];
}