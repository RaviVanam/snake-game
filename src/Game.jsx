import GameGrid from "./components/GameGrid";
import { useEffect, useReducer } from "react";
import { initialCells, snakePositions as initialPostions } from "./initialValues.js"
import { gridReducer } from "./reducers.js";
import { Directions } from "./components/utilities/directions";

export default function Game() {

    // side effects stuff -----------------------------------------------------------

    useEffect(() => {
        const eventHandler = (e) => {
            if (e.keyCode >= 37 && e.keyCode <= 40) // keycodes 37 to 40 match arrow keys
                handleDirectionChanged(e.key);
        }
        window.addEventListener('keydown', eventHandler);

        return () => {
            window.removeEventListener('keydown', eventHandler);
        }
    }, [])

    // state stuff ----------------------------------------------------------------

    const [grid, dispatchGrid] = useReducer(gridReducer, {
        cells: initialCells,
        direction: Directions.UP,
        snake: initialPostions,
        food: [],
    });

    // event handlers -------------------------------------------------------------

    function handleMove() {
        dispatchGrid({
            type: 'moved',
        })
    }

    function handleDirectionChanged(newDirection) {
        dispatchGrid({
            type: 'directionChanged',
            newDirection: newDirection,
        })
    }

    return (
        <>
            <button onClick={handleMove} style={{ fontSize: 42, marginLeft: '700px' }}>move</button>
            <GameGrid cells={grid.cells} />
        </>
    )
}