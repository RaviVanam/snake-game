import GridBox from './GridBox'
import { v4 as uuid } from 'uuid'

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