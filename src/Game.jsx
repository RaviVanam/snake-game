// TODO: import initial values

import GameGrid from "./components/GameGrid";
import { gridValues } from "./initialValues";

export default function Game() {

    return (
        <>
            <GameGrid gridValues={gridValues} />
        </>
    )
}