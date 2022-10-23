import GridBox from './GridBox'

export default function GameGrid({ cells }) {

    return (
        <div className="grid">
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