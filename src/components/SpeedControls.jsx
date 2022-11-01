export default function SpeedControls({ gameHandlers }) {
    return (
        <div className="speed-options">
            <div className="snake-speed-options">
                <label htmlFor="">Snake Speed</label>
                <button onClick={gameHandlers.handleSnakeSpeedChange} value={5}>Slow</button>
                <button onClick={gameHandlers.handleSnakeSpeedChange} value={10}>Fast</button>
                <button onClick={gameHandlers.handleSnakeSpeedChange} value={20}>Very Fast</button>
            </div>
            <div className="food-speed-options">
                <label htmlFor="">Food Speed</label>
                <button onClick={gameHandlers.handleFoodSpeedChange} value={5}>Slow</button>
                <button onClick={gameHandlers.handleFoodSpeedChange} value={10}>Fast</button>
                <button onClick={gameHandlers.handleFoodSpeedChange} value={40}>Very Fast</button>
            </div>
            <div className="mine-speed-options">
                <label htmlFor="">Mine Speed</label>
                <button onClick={gameHandlers.handleMineSpeedChange} value={5}>Slow</button>
                <button onClick={gameHandlers.handleMineSpeedChange} value={10}>Fast</button>
                <button onClick={gameHandlers.handleMineSpeedChange} value={40}>Very Fast</button>
            </div>
        </div>
    );
}