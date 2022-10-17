import GameGrid from "./components/GameGrid";
import { useState } from "react";
import { gridRows as rows, gridCols as cols, snakePosition as initialPostion } from "./initialValues.js"

export default function Game() {

    const [grid, setGrid] = useState({
        cells: new Array(rows).fill(null).map(() => new Array(cols).fill('empty')),
        snake: [],
        food: [],
    });

    return (
        <>
            <GameGrid cells={grid.cells} />
        </>
    )
}