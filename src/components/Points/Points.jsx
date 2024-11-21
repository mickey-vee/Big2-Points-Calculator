import { useEffect, useState } from "react";
import "./Points.scss";

const Points = ({ playerNames, gameDetails }) => {
  const [totalPoints, setTotalPoints] = useState(
    Array(playerNames.length).fill(0)
  );
  const [roundDetails, setRoundDetails] = useState([]);
  const [history, setHistory] = useState([]);

  // Destructure gameDetails into playerPoints, round, and winnerName
  const { playerPoints, round, winnerName } = gameDetails;

  // Updating the points for each player
  useEffect(() => {
    setTotalPoints((prevPoints) =>
      prevPoints.map((point, index) => point + (playerPoints[index] || 0))
    );

    let playerDetails = playerNames.map((player, index) => ({
      playername: player,
      playerpoints: playerPoints[index],
    }));

    setRoundDetails({
      winner: winnerName,
      round: round,
      playerdetails: playerDetails,
    });
  }, [playerPoints, playerNames, round, winnerName]);

  // updating the round
  useEffect(() => {
    if (roundDetails && roundDetails.winner) {
      setHistory((prevHistory) => {
        return [...prevHistory, roundDetails];
      });
    }
  }, [roundDetails]);

  return (
    <div className="rounds">
      {history.map((item, index) => (
        <div key={index} className="rounds-card">
          <div className="rounds__label">
            <p className="rounds-title">
              Round {item.round} winner - {item.winner}
            </p>
          </div>
          <div className="rounds-player-info">
            {item.playerdetails.map((player, playerIndex) => (
              <div key={playerIndex}>
                <p>{player.playername}</p>
                <p>{player.playerpoints}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="rounds-card">
        <p className="rounds-title">Total points</p>
        <div className="rounds-player-info">
          {playerNames.map((player, index) => (
            <div key={index}>
              <p>{player} total</p>
              <p>{totalPoints[index]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Points;
