import GridBox from './GridBox'
import { v4 as uuid } from 'uuid'

export default function GameGrid({ grid }) {

    return (
        <div className="grid">
            {grid.map(rows =>
                <div key={uuid()} className="grid-row">
                    {rows.map(gridItemValues =>
                        <GridBox key={uuid()} itemValues={gridItemValues} />
                    )}
                </div>
            )}
        </div>
    )
}