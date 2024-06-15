import Scoreboard from "../src/components/Scoreboard/Scoreboard";
import Cards from "./components/Cards/Cards";
import "./assets/styles/App.css";
import { useState } from "react";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <>
      <Scoreboard />
      <Cards />
    </>
  );
}

export default App;
