import { useEffect, useState } from "react";
import "./Points.scss";

const Points = ({ playerNames, gameDetails, roundEdited, setRoundEdited }) => {
  const [totalPoints, setTotalPoints] = useState(
    Array(playerNames.length).fill(0)
  );
  const [roundDetails, setRoundDetails] = useState([]);
  const [history, setHistory] = useState([]);

  // Destructure gameDetails into playerPoints, round, and winnerName
  const { playerPoints, round, winnerName } = gameDetails;

  // Updating the points for each player
  useEffect(() => {
    if (roundEdited) {
      for (let i = 0; i < history.length; i++) {
        if (history[i].round === gameDetails.round) {
          const updatedHistory = [...history];

          updatedHistory[i] = {
            ...updatedHistory[i],
            playerdetails: playerNames.map((player, index) => ({
              playername: player,
              playerpoints: playerPoints[index],
            })),
            winner: winnerName,
          };

          // Update the history state with the modified array
          setHistory(updatedHistory);

          // Update totalPoints for edited players
          setTotalPoints((prevPoints) =>
            prevPoints.map(
              (point, index) =>
                point -
                (history[i].playerdetails[index]?.playerpoints || 0) + // Subtract old points
                (playerPoints[index] || 0) // Add new points
            )
          );

          break;
        }
      }

      setRoundEdited(false); //Reset edit round flag
    } else {
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
    }
  }, [playerPoints, round, winnerName]);

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
                <p>{player.playername} points:</p>
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
