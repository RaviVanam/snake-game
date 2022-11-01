import './styles/DirectionControls.css'
import { Directions } from "./utilities/directions";
export default function DirectionControls({ gameHandlers }) {
    return (
        <div className="direction-buttons">
            <button className="direction-button button-up" onClick={() => gameHandlers.handleDirectionChanged(Directions.UP)}>UP</button>
            <button className="direction-button button-left" onClick={() => gameHandlers.handleDirectionChanged(Directions.LEFT)}>LEFT</button>
            <button className="direction-button button-down" onClick={() => gameHandlers.handleDirectionChanged(Directions.DOWN)}>DOWN</button>
            <button className="direction-button button-right" onClick={() => gameHandlers.handleDirectionChanged(Directions.RIGHT)}>RIGHT</button>
        </div>
    );
}