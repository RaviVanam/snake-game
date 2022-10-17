const gridRows = 20;
const gridCols = 40;

const gridValues = [];

for (let i = 0; i < gridRows; i++) {
    gridValues.push([]);
    for (let j = 0; j < gridCols; j++) {
        gridValues[i].push(
            {
                className: 'land', // snake, snakeHead, snakeTail, food are the possible values
            }
        )
    }
}

export { gridValues };