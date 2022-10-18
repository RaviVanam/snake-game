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
        }, 500 / grid.snakeSpeed)

        return () => {
            clearInterval(id);
        }
    }, [grid.endGame, grid.snakeSpeed]);

    // randomly generate food
    useEffect(() => {
        if (grid.endGame) return () => { };

        const id = setInterval(() => {
            handlePlaceFood();
        }, 5000 / grid.foodSpeed)

        return () => {
            clearInterval(id);
        }
    }, [grid.endGame, grid.foodSpeed]);


    // event handlers ---------------------------------------------------------------

    function handleMove() {
        dispatchGrid({
            type: 'moved',
        })
    }

    function handlePlay() {
        dispatchGrid({
            type: 'startGame',
            snakeSpeed: grid.snakeSpeed,
            foodSpeed: grid.foodSpeed,
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

    function handleSnakeSpeedChange(e) {
        dispatchGrid({
            type: 'snakeSpeedChanged',
            speed: e.target.value,
        })
    }

    function handleFoodSpeedChange(e) {
        dispatchGrid({
            type: 'foodSpeedChanged',
            speed: e.target.value,
        })
    }

    return (
        <>
            {/* <button onClick={handleMove} style={{ fontSize: 42, marginLeft: '700px' }}>move</button> */}
            {grid.firstGame && <button onClick={handlePlay} style={{ fontSize: 42, marginLeft: '300px' }}>play</button>}
            {grid.endGame && !grid.firstGame && <button onClick={handlePlay} style={{ fontSize: 42, marginLeft: '300px' }}>play again?</button>}
            {grid.endGame &&
                <div className="speed-options">
                    <div className="snake-speed-options">
                        <label htmlFor="">Snake Speed</label>
                        <button onClick={handleSnakeSpeedChange} value={5}>Slow</button>
                        <button onClick={handleSnakeSpeedChange} value={10}>Fast</button>
                        <button onClick={handleSnakeSpeedChange} value={20}>Very Fast</button>
                    </div>
                    <div className="food-speed-options">
                        <label htmlFor="">Food Speed</label>
                        <button onClick={handleFoodSpeedChange} value={5}>Slow</button>
                        <button onClick={handleFoodSpeedChange} value={10}>Fast</button>
                        <button onClick={handleFoodSpeedChange} value={40}>Very Fast</button>
                    </div>
                </div>
            }
            <div className="game-container">
                <GameGrid cells={grid.cells} />
            </div>
        </>
    )
}