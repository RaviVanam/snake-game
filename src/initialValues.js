export const gridRows = 20;
export const gridCols = 40;
export const snakePositions = [[10, 20], [11, 20], [12, 20]];

const initialCells = new Array(gridRows).fill(null).map(() => new Array(gridCols).fill('empty'));
snakePositions.forEach(([i, j]) => {
    initialCells[i][j] = 'snake';
});

export { initialCells };