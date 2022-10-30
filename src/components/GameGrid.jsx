import GridBox from './GridBox'

export default function GameGrid({ cells, gameOverScreen }) {
    return (
        <div className={"grid" + ((gameOverScreen) ? " blur" : "")}>
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