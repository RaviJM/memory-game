function Scoreboard({ currentScore, highScore }) {
  return (
    <div className="scoreboard-container">
      <h1>Scoreboard</h1>
      <p>Score: {currentScore}</p>
      <p>High Score: {highScore}</p>
    </div>
  );
}

export default Scoreboard;
