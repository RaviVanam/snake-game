import GameGrid from "./components/GameGrid";
import { useEffect, useReducer } from "react";
import { initialCells, snakePositions as initialPostions, initialSnakeSet } from "./initialValues.js"
import { gridReducer } from "./reducers.js";
import { Directions } from "./components/utilities/directions";

export default function Game() {

    // state ------------------------------------------------------------------------

    const [grid, dispatchGrid] = useReducer(gridReducer, {
        cells: initialCells,
        direction: Directions.UP,
        snake: initialPostions,
        snakeSet: initialSnakeSet,
        food: [],
        speed: 5
    });


    // side effects -----------------------------------------------------------------

    // add keydown listener
    useEffect(() => {
        const handleKeyPressedEvent = (e) => {
            e.preventDefault();
            if (e.keyCode >= 37 && e.keyCode <= 40) // keycodes 37 to 40 match arrow keys
                handleDirectionChanged(e.key);
        }
        window.addEventListener('keydown', handleKeyPressedEvent);

        return () => {
            window.removeEventListener('keydown', handleKeyPressedEvent);
        }
    }, []);

    // auto move snake
    useEffect(() => {
        const id = setInterval(() => {
            handleMove();
        }, 500 / grid.speed)

        return () => {
            clearInterval(id);
        }
    }, [grid.speed]);

    // randomly generate food
    useEffect(() => {
        const id = setInterval(() => {
            handlePlaceFood();
        }, 5000)

        return () => {
            clearInterval(id);
        }
    }, []);


    // event handlers ---------------------------------------------------------------

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

    function handlePlaceFood() {
        dispatchGrid({
            type: 'placeFood',
        })
    }

    return (
        <>
            <button onClick={handleMove} style={{ fontSize: 42, marginLeft: '700px' }}>move</button>

            <div className="game-container">
                <GameGrid cells={grid.cells} />
            </div>
        </>
    )
}