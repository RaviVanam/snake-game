export const gridRows = 20;
export const gridCols = 40;
export const snakePositions = [[10, 20], [11, 20], [12, 20], [13, 20], [14, 20], [15, 20], [16, 20], [17, 20], [18, 20]].reverse();

const initialCells = new Array(gridRows).fill(null).map(() => new Array(gridCols).fill('empty'));
snakePositions.forEach(([i, j]) => {
    initialCells[i][j] = 'snake';
});

export { initialCells };