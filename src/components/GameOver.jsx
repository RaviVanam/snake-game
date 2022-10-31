export default function GameOver({ score, handlePlayAgain }) {
    return (
        <div className="end-game-box">
            <div className="details">
                Game Over! <br />
                <div className="score-board">
                    Score: {score}
                </div>
            </div>
            <button onClick={handlePlayAgain} style={{ fontSize: 42 }}>Play again?</button>
        </div>
    )
}