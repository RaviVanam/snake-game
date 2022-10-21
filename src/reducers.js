import { Directions } from "./components/utilities/directions";
import { initialState, gridRows, gridCols } from "./initialValues";

export function gridReducer(grid, action) {
    switch (action.type) {
        case 'startGame': {
            return { ...initialState, firstGame: false, endGame: false, foodSpeed: action.foodSpeed, snakeSpeed: action.snakeSpeed };
        }
        case 'moved': {
            const [i, j] = grid.snake[grid.snake.length - 1];
            const newPostion = getNextPostion(i, j, grid.cells.length, grid.cells[0].length, grid.direction);
            // if newPostion is snake itself then end the game
            if (grid.snakeSet[newPostion[0]][newPostion[1]]) return { ...grid, endGame: true, firstGame: false };
            const isFood = grid.cells[newPostion[0]][newPostion[1]] === 'food';
            const newSnake = grid.snake.filter((pos, i) => (i !== 0 || isFood));
            newSnake.push(newPostion);
            const newCells = grid.cells.map((cellRows) => cellRows.map((cellValue) => (cellValue === 'snake') ? 'empty' : cellValue));
            const newSnakeSet = new Array(grid.cells.length).fill(null).map(() => new Array(grid.cells[0].length).fill(false));
            newSnake.forEach(pos => {
                newCells[pos[0]][pos[1]] = 'snake';
                newSnakeSet[pos[0]][pos[1]] = true;
            });
            return {
                ...grid,
                cells: newCells,
                snake: newSnake,
                snakeSet: newSnakeSet,
            };
        }
        case 'directionChanged': {
            if (isSnakeTryingToReverse(grid.snake, action.newDirection)) return grid;
            return { ...grid, direction: action.newDirection }
        }
        case 'placeFood': {
            let i = grid.snake[0][0];
            let j = grid.snake[0][1];

            while (grid.snakeSet[i][j]) {
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