import { useEffect } from "react";
export default function useGameEffects(grid, handlers) {

    useEffect(addKeydownListener, [handlers]);
    useEffect(autoMoveSnake, [grid.endGame, grid.snakeSpeed, handlers]);
    useEffect(autoGenerateFood, [grid.endGame, grid.foodSpeed, handlers]);
    useEffect(autoRemoveFood, [grid.endGame, grid.foodSpeed, handlers]);
    useEffect(autoDropMines, [grid.endGame, grid.mineSpeed, handlers]);
    useEffect(autoRemoveMines, [grid.endGame, grid.mineSpeed, handlers]);

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
}