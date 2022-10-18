import { Directions } from "./components/utilities/directions";

const gridRows = 30;
const gridCols = 40;
const snakePositions = [[10, 20], [11, 20], [12, 20], [13, 20], [14, 20], [15, 20], [16, 20], [17, 20], [18, 20]].reverse();

const initialCells = new Array(gridRows).fill(null).map(() => new Array(gridCols).fill('empty'));
const initialSnakeSet = new Array(gridRows).fill(null).map(() => new Array(gridCols).fill(false));
snakePositions.forEach(([i, j]) => {
    initialCells[i][j] = 'snake';
    initialSnakeSet[i][j] = true;
});

export const initialState = {
    cells: initialCells,
    direction: Directions.UP,
    snake: snakePositions,
    snakeSet: initialSnakeSet,
    food: [],
    speed: 5,
    endGame: true,
    firstGame: true,
}