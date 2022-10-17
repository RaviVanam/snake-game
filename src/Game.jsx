import GameGrid from "./components/GameGrid";
import { useReducer } from "react";
import { gridRows as rows, gridCols as cols, snakePosition as initialPostion } from "./initialValues.js"
import { gridReducer } from "./reducers.js";

export default function Game() {

    const [grid, dispatchGrid] = useReducer(gridReducer, {
        cells: new Array(rows).fill(null).map(() => new Array(cols).fill('empty')),
        snake: [],
        food: [],
    });

    return (
        <>
            <button style={{ fontSize: 42, marginLeft: '700px' }}>move</button>
            <GameGrid cells={grid.cells} />
        </>
    )
}