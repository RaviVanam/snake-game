import GameGrid from "./components/GameGrid";
import { useState } from "react";

export default function Game() {
    const [rows, cols] = [20, 40];

    const [grid, setGrid] = useState(
        new Array(rows).fill(null).map(() => new Array(cols).fill(null))
    );

    return (
        <>
            <GameGrid grid={grid} />
        </>
    )
}