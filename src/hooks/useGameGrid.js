import { useReducer, useMemo } from "react";
import useGameEffects from "./useGameEffects.js";
import { gridReducer } from "../reducers.js";
import { initialState, transitionDuration } from "../initialValues";

export default function useGameGrid() {
    const [grid, dispatchGrid] = useReducer(gridReducer, initialState);

    const handlers = useMemo(() => {
        return {
            handleMove() {
                dispatchGrid({
                    type: 'moved',
                })
            },

            handlePlay() {
                dispatchGrid({
                    type: 'startGame',
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
    }, [])

    useGameEffects(grid, handlers);

    return [grid, handlers];
}