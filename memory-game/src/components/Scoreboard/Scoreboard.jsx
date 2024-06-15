import "../Scoreboard/Scoreboard.css";

function Scoreboard({ currentScore, highScore }) {
  return (
    <div className="scoreboard-container">
      <h1>Scoreboard</h1>
      <div className="scores">
        <p>Score: {currentScore}</p>
        <p>High Score: {highScore}</p>
      </div>
    </div>
  );
}

export default Scoreboard;
