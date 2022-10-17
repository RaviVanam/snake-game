import GridBox from './GridBox'

export default function GameGrid({ gridValues }) {
    return (
        <div className="grid">
            {gridValues.map(gridRowValues =>
                <div className="grid-row">
                    {gridRowValues.map(gridItemValues =>
                        <GridBox itemValues={gridItemValues} />
                    )}
                </div>
            )}
        </div>
    )
}