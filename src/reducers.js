import { Directions } from "./components/utilities/directions";
import { initialState, gridRows, gridCols } from "./initialValues";

export function gridReducer(grid, action) {
    switch (action.type) {
        case 'resetGame': {
            return { ...initialState };
        }
        case 'startGame': {
            return { ...grid, endGame: false };
        }
        case 'moved': {
            const [i, j] = grid.snake[grid.snake.length - 1];
            const newPostion = getNextPostion(i, j, grid.cells.length, grid.cells[0].length, grid.direction);

            // if newPostion is snake itself or a mine then end the game
            if (grid.cells[newPostion[0]][newPostion[1]] === 'snake' || grid.cells[newPostion[0]][newPostion[1]] === 'mine')
                return { ...grid, endGame: true, firstGame: false, gameOverScreen: true };

            const isFood = grid.cells[newPostion[0]][newPostion[1]] === 'food';

            // remove the tail. but if snake ate food don't remove it
            const newSnake = grid.snake.filter((pos, i) => (i !== 0 || isFood));

            // if food then remove it cuz the snake ate it.
            const newFood = grid.food.filter(pos => (pos[0] !== newPostion[0]) || (pos[1] !== newPostion[1]));

            newSnake.push(newPostion);
            const newCells = grid.cells.map((cellRows) => cellRows.map(() => 'empty'));

            // update cells
            newSnake.forEach(pos => {
                newCells[pos[0]][pos[1]] = 'snake';
            });
            newFood.forEach(pos => {
                newCells[pos[0]][pos[1]] = 'food';
            })
            grid.mines.forEach(pos => {
                newCells[pos[0]][pos[1]] = 'mine';
            })

            return {
                ...grid,
                cells: newCells,
                snake: newSnake,
                food: newFood
            };
        }
        case 'directionChanged': {
            if (isSnakeTryingToReverse(grid.snake, action.newDirection)) return grid;
            return { ...grid, direction: action.newDirection }
        }
        case 'placeFood': {
            if (grid.food.length >= 7) return grid;
            let i = grid.snake[0][0];
            let j = grid.snake[0][1];

            while (grid.cells[i][j] === 'snake') {
                i = Math.floor(Math.random() * grid.cells.length);
                j = Math.floor(Math.random() * grid.cells[0].length);
            }

            const newFood = [...grid.food, [i, j]]
            const newCells = grid.cells.map((cellRows, row) => cellRows.map((cellValue, col) => (row === i && col === j) ? 'food' : cellValue));
            return {
                ...grid,
                cells: newCells,
                food: newFood,
            }
        }
        case 'placeMine': {
            if (grid.mines.length >= 7) return grid;
            let i = grid.snake[0][0];
            let j = grid.snake[0][1];

            while (grid.cells[i][j] === 'snake') {
                i = Math.floor(Math.random() * grid.cells.length);
                j = Math.floor(Math.random() * grid.cells[0].length);
            }

            const newMines = [...grid.mines, [i, j]]
            const newCells = grid.cells.map((cellRows, row) => cellRows.map((cellValue, col) => (row === i && col === j) ? 'mine' : cellValue));
            return {
                ...grid,
                cells: newCells,
                mines: newMines,
            }
        }
        case 'removeFood': {
            return {
                ...grid,
                food: (grid.food.length > 1) ? grid.food.slice(1) : grid.food,
            }
        }
        case 'removeMine': {
            return {
                ...grid,
                mines: (grid.mines.length > 1) ? grid.mines.slice(1) : grid.mines,
            }
        }
        case 'snakeSpeedChanged': {
            return {
                ...grid,
                snakeSpeed: action.speed,
            }
        }
        case 'foodSpeedChanged': {
            return {
                ...grid,
                foodSpeed: action.speed,
            }
        }
        case 'mineSpeedChanged': {
            return {
                ...grid,
                mineSpeed: action.speed,
            }
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

function getNextPostion(i, j, rows, cols, direction) {
    if (direction === Directions.UP) {
        i = i - 1;
    } else if (direction === Directions.DOWN) {
        i = i + 1;
    } else if (direction === Directions.LEFT) {
        j = j - 1;
    } else if (direction === Directions.RIGHT) {
        j = j + 1;
    } else {
        throw new Error("The direction : " + direction + " is not defined");
    }

    return [(i >= 0) ? i % rows : i + rows, (j >= 0) ? j % cols : j + cols];
}

function isSnakeTryingToReverse(snake, direction) {
    if (snake.length <= 1) return false;
    const nextPostion = getNextPostion(...snake[snake.length - 1], gridRows, gridCols, direction);
    return nextPostion[0] === snake[snake.length - 2][0] && nextPostion[1] === snake[snake.length - 2][1];
}