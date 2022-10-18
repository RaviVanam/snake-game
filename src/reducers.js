import { Directions } from "./components/utilities/directions";

export function gridReducer(grid, action) {
    switch (action.type) {
        case 'moved': {
            const [i, j] = grid.snake[grid.snake.length - 1];
            const newPostion = getNextPostion(i, j, grid.cells.length, grid.cells[0].length, grid.direction);
            const newSnake = grid.snake.filter((pos, i) => i !== 0);
            newSnake.push(newPostion);
            const newCells = grid.cells.map((cellRows) => cellRows.map((cellValue) => (cellValue === 'snake') ? 'empty' : cellValue));
            newSnake.forEach(pos => {
                newCells[pos[0]][pos[1]] = 'snake';
            });
            return {
                ...grid,
                cells: newCells,
                snake: newSnake,
            };
        }
        case 'directionChanged': {
            return { ...grid, direction: action.newDirection }
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

