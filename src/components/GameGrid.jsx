import GridBox from './GridBox'

export default function GameGrid({ cells, gameOverScreen }) {
    const gridActiveClassNames = "grid" + ((gameOverScreen) ? " blur" : "");

    return (
        <div className={gridActiveClassNames}>
            {cells.map((rows, i) =>
                <div key={i} className="grid-row">
                    {rows.map((value, j) =>
                        <GridBox key={j} value={value} />
                    )}
                </div>
            )}
        </div>
    )
}