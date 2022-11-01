import { useReducer } from "react";
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

    return [grid, handlers];
}