import GameGrid from "./components/GameGrid";
import { useEffect, useReducer } from "react";
import { gridReducer } from "./reducers.js";
import { initialState } from "./initialValues";
export default function Game() {

    // state ------------------------------------------------------------------------

    const [grid, dispatchGrid] = useReducer(gridReducer, initialState);

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
        if (grid.endGame) return () => { };
        const id = setInterval(() => {
            console.log('snake moving');
            handleMove();
        }, 500 / grid.speed)

        return () => {
            clearInterval(id);
        }
    }, [grid.endGame]);

    // randomly generate food
    useEffect(() => {
        if (grid.endGame) return () => { };

        const id = setInterval(() => {
            handlePlaceFood();
        }, 5000)

        return () => {
            clearInterval(id);
        }
    }, [grid.endGame]);


    // event handlers ---------------------------------------------------------------

    function handleMove() {
        dispatchGrid({
            type: 'moved',
        })
    }

    function handlePlay() {
        dispatchGrid({
            type: 'startGame',
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
            {grid.firstGame && <button onClick={handlePlay} style={{ fontSize: 42, marginLeft: '300px' }}>play</button>}
            {grid.endGame && !grid.firstGame && <button onClick={handlePlay} style={{ fontSize: 42, marginLeft: '300px' }}>play again?</button>}

            <div className="game-container">
                <GameGrid cells={grid.cells} />
            </div>
        </>
    )
}