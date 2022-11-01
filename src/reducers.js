import { Directions } from "./components/utilities/directions";
import { initialState, gridRows, gridCols } from "./initialValues";

export function gridReducer(grid, action) {
    switch (action.type) {
        case 'resetGame': {
            return { ...initialState, firstGame: false };
        }
        case 'startGame': {
            return { ...grid, endGame: false };
        }
        case 'moved': {
            const currentPostion = grid.snake[grid.snake.length - 1];
            const nextPosition = getNextPosition(currentPostion[0], currentPostion[1], grid.cells.length, grid.cells[0].length, grid.direction);

            if (isSnakeGoingToDie(grid.cells, nextPosition))
                return {
                    ...grid,
                    endGame: true,
                    firstGame: false,
                    gameOverScreen: true
                };

            const newSnake = getUpdatedSnake(grid.cells, grid.snake, nextPosition);
            const newFood = getUpdatedFood(grid.food, nextPosition);
            const newCells = getUpdatedCells(grid.cells, newSnake, newFood, grid.mines);

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

function getNextPosition(i, j, rows, cols, direction) {
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
    const nextPosition = getNextPosition(...snake[snake.length - 1], gridRows, gridCols, direction);
    return nextPosition[0] === snake[snake.length - 2][0] && nextPosition[1] === snake[snake.length - 2][1];
}

function isSnakeGoingToDie(cells, nextPosition) {
    if (cells[nextPosition[0]][nextPosition[1]] === 'snake' || cells[nextPosition[0]][nextPosition[1]] === 'mine')
        return true;
    return false;
}

function isNextFood(cells, nextPosition) {
    if (cells[nextPosition[0]][nextPosition[1]] === 'food')
        return true;
    return false;
}

function getUpdatedCells(cells, snake, food, mines) {
    const newCells = cells.map((cellRows) => cellRows.map(() => 'empty'));

    // update cells
    snake.forEach(pos => {
        newCells[pos[0]][pos[1]] = 'snake';
    });
    food.forEach(pos => {
        newCells[pos[0]][pos[1]] = 'food';
    })
    mines.forEach(pos => {
        newCells[pos[0]][pos[1]] = 'mine';
    })

    return newCells;
}

function getUpdatedSnake(cells, snake, nextPosition) {
    const nextIsFood = isNextFood(cells, nextPosition);

    // remove the tail. but if snake ate food don't remove it
    const newSnake = snake.filter((pos, i) => (i !== 0 || nextIsFood));

    newSnake.push(nextPosition)

    return newSnake;
}

function getUpdatedFood(food, nextPosition) {
    // if snake head is on food then remove food from there
    const newFood = food.filter(pos => (pos[0] !== nextPosition[0]) || (pos[1] !== nextPosition[1]));
    return newFood;
}