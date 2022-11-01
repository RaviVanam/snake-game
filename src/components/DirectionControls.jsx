import { Directions } from "./utilities/directions";
export default function DirectionControls({ gameHandlers }) {
    return (
        <div className="direction-buttons">
            <button className="button" onClick={() => gameHandlers.handleDirectionChanged(Directions.UP)}>UP</button>
            <button className="button" onClick={() => gameHandlers.handleDirectionChanged(Directions.LEFT)}>LEFT</button>
            <button className="button" onClick={() => gameHandlers.handleDirectionChanged(Directions.DOWN)}>DOWN</button>
            <button className="button" onClick={() => gameHandlers.handleDirectionChanged(Directions.RIGHT)}>RIGHT</button>
        </div>
    );
}