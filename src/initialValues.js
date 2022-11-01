import { Directions } from "./components/utilities/directions";

export const transitionDuration = 1000;
export const gridRows = 30;
export const gridCols = 40;
const snakePositions = [[10, 20], [11, 20], [12, 20], [13, 20], [14, 20], [15, 20], [16, 20], [17, 20], [18, 20]].reverse();

const initialCells = new Array(gridRows).fill(null).map(() => new Array(gridCols).fill('empty'));
snakePositions.forEach(([i, j]) => {
    initialCells[i][j] = 'snake';
});

export const initialState = {
    cells: initialCells,
    direction: Directions.UP,
    snake: snakePositions,
    food: [],
    mines: [],
    snakeSpeed: 10,
    foodSpeed: 10,
    mineSpeed: 10,
    foodLimit: 5,
    minesLimit: 12,
    endGame: true,
    firstGame: true,
    gameOverScreen: false,
}