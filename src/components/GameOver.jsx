export default function GameOver({ score, handlePlayAgain }) {
    function setHighScore(score) {
        window.localStorage.setItem('high-score', score);
    }

    function getHighScore() {
        return window.localStorage.getItem('high-score');
    }

    if (!getHighScore()) setHighScore(score);

    if (getHighScore() < score) setHighScore((score));

    const highScore = getHighScore();

    return (
        <div className="end-game-box">
            <div className="details">
                Game Over! <br />
                <div className="score-board">
                    Current Score: {score}
                </div>
                <div className="score-board">
                    High Score: {highScore}
                </div>
            </div>
            <button onClick={handlePlayAgain} style={{ fontSize: 42 }}>Play again?</button>
        </div>
    )
}