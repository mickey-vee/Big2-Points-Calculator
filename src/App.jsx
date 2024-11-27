import { useState } from "react";
import AddPlayer from "./components/AddPlayer/AddPlayer";
import GetPoints from "./components/GetPoints/GetPoints";
import Points from "./components/Points/Points";
import "./App.scss";

function App() {
  const [playerNames, setPlayerNames] = useState([]);
  const [addPlayers, setAddPlayers] = useState(true);
  const [gameDetails, setGameDetails] = useState({
    playerPoints: [0, 0, 0, 0],
    round: 0,
    winnerName: "",
  });
  const [roundEdited, setRoundEdited] = useState(false);
  const [roundCounter, setRoundCounter] = useState(1);

  // Function to get player data from AddPlayer component
  const getPlayerData = (playerList) => {
    setPlayerNames(playerList);
  };

  // Function to get game details
  const getGameDetails = (points, winner, editRoundNumber) => {
    const counter = roundEdited ? roundCounter : roundCounter + 1;
    setRoundCounter(counter);

    setGameDetails(() => ({
      playerPoints: points,
      round: roundEdited ? editRoundNumber : roundCounter,
      winnerName: winner,
    }));
  };

  // Function to reset game
  const resetGame = () => {
    let confirmReset = confirm("Do you want to reset the game?");

    if (confirmReset) {
      setAddPlayers(true);
      setGameDetails({ playerPoints: [0, 0, 0, 0], round: 0, winnerName: "" });
    } else {
      return;
    }
  };

  return (
    <>
      {addPlayers && (
        <AddPlayer
          getPlayerData={getPlayerData}
          setAddPlayers={setAddPlayers}
        />
      )}

      {!addPlayers && (
        <GetPoints
          playerNames={playerNames}
          getGameDetails={getGameDetails}
          setRoundEdited={setRoundEdited}
          roundCounter={roundCounter}
        />
      )}

      {!addPlayers && (
        <Points
          playerNames={playerNames}
          gameDetails={gameDetails} // Pass the gameDetails object
          roundEdited={roundEdited}
          setRoundEdited={setRoundEdited}
        />
      )}

      {/* Button to reset player list */}
      {!addPlayers && (
        <button
          className="reset-button"
          onClick={() => {
            resetGame();
          }}
        >
          Reset Game
        </button>
      )}
    </>
  );
}

export default App;
