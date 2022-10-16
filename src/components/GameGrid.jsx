import GridBox from './GridBox'

export default function GameGrid({ gridValues }) {
    return (
        gridValues.map(gridRowValues =>
            <div className="grid-row">
                {gridRowValues.map(gridItemValues =>
                    <GridBox itemValues={gridItemValues} />
                )}
            </div>
        )
    )
}