import "./AddPlayer.scss";
import { useState } from "react";

const AddPlayer = ({ getPlayerData, setAddPlayers }) => {
  const [players, setPlayers] = useState([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [uniquePlayer, setUniquePlayer] = useState(false);
  const [emptyPlayer, setEmptyPlayer] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();

    const lowerCaseNames = players.map((player) => {
      return player.toLowerCase();
    });

    const uniquePlayers = new Set(lowerCaseNames);

    if (players.length < numberOfPlayers) {
      setUniquePlayer(false);
      setEmptyPlayer(true);
      return;
    } else if (uniquePlayers.size !== players.length) {
      setEmptyPlayer(false);
      setUniquePlayer(true);
    } else {
      // Takes playerData as prop/function from app.jsx and passes player data from form to function
      getPlayerData(players);
      setAddPlayers(false);
    }
  };

  const submitPlayers = (numOfPlayers) => {
    setNumberOfPlayers(numOfPlayers);
  };

  const addPlayerNames = (e, index) => {
    const getPlayerNames = [...players];
    getPlayerNames[index] = e;

    setPlayers(getPlayerNames);
  };

  return (
    <div>
      <div>
        <h2 className="player-number__title">
          Please select number of players.
        </h2>
        <form
          className="player-number__form"
          onSubmit={(e) => e.preventDefault()}
        >
          <button
            className={
              numberOfPlayers === 2
                ? "player-number__button--selected"
                : "player-number__button"
            }
            type="button"
            onClick={() => submitPlayers(2)}
          >
            2 Players
          </button>
          <button
            className={
              numberOfPlayers === 3
                ? "player-number__button--selected"
                : "player-number__button"
            }
            type="button"
            onClick={() => submitPlayers(3)}
          >
            3 Players
          </button>
          <button
            className={
              numberOfPlayers === 4
                ? "player-number__button--selected"
                : "player-number__button"
            }
            type="button"
            onClick={() => submitPlayers(4)}
          >
            4 Players
          </button>
        </form>
      </div>

      <div>
        <form onSubmit={submitForm} className="player-form">
          {numberOfPlayers !== 0 &&
            Array.from({ length: numberOfPlayers }).map((_, index) => (
              <label key={index} className="player-form__label">
                Player {index + 1}
                <input
                  type="text"
                  name={`player${index + 1}`}
                  placeholder="Enter player name"
                  className="player-form__input"
                  onChange={(e) => addPlayerNames(e.target.value, index)}
                />
              </label>
            ))}

          {emptyPlayer ? (
            <div className="player-form__error">
              Please enter a name for all players.
            </div>
          ) : null}
          {uniquePlayer ? (
            <div className="player-form__error">
              Re-enter player names, players must have different names.
            </div>
          ) : null}

          {numberOfPlayers > 0 ? (
            <button type="submit" className="player-form__button">
              Start Game
            </button>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default AddPlayer;
