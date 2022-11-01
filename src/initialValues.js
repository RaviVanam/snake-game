import { Directions } from "./components/utilities/directions";

export const transitionDuration = 1000;
export const gridRows = 15;
export const gridCols = 20;
const snakePositions = [[10, 10], [11, 10], [12, 10], [13, 10]].reverse();

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