import "./AddPlayer.scss";
import { useState } from "react";

const AddPlayer = ({ getPlayerData, setAddPlayers }) => {
  const [p1, setP1] = useState("a");
  const [p2, setP2] = useState("b");
  const [p3, setP3] = useState("c");
  const [p4, setP4] = useState("d");
  const [uniquePlayer, setUniquePlayer] = useState(false);
  const [emptyPlayer, setEmptyPlayer] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();

    const playerList = [p1, p2, p3, p4];

    const lowerCaseNames = playerList.map((player) => {
      return player.toLowerCase();
    });

    const uniquePlayers = new Set(lowerCaseNames);

    if (p1 === "" || p2 === "" || p3 === "" || p4 === "") {
      setUniquePlayer(false);
      setEmptyPlayer(true);
      return;
    } else if (uniquePlayers.size !== playerList.length) {
      setEmptyPlayer(false);
      setUniquePlayer(true);
    } else {
      // Takes playerData as prop/function from app.jsx and passes player data from form to function
      getPlayerData(playerList);
      setAddPlayers(false);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={submitForm} className="player-form">
          <label className="player-form__label">
            Player 1
            <input
              onChange={(e) => {
                setP1(e.target.value);
              }}
              type="text"
              name="p1"
              placeholder="Enter player name"
              className="player-form__input"
            />
          </label>
          <label className="player-form__label">
            Player 2
            <input
              onChange={(e) => {
                setP2(e.target.value);
              }}
              type="text"
              name="p2"
              placeholder="Enter player name"
              className="player-form__input"
            />
          </label>
          <label className="player-form__label">
            Player 3
            <input
              onChange={(e) => {
                setP3(e.target.value);
              }}
              type="text"
              name="p3"
              placeholder="Enter player name"
              className="player-form__input"
            />
          </label>
          <label className="player-form__label">
            Player 4
            <input
              onChange={(e) => {
                setP4(e.target.value);
              }}
              type="text"
              name="p4"
              placeholder="Enter player name"
              className="player-form__input"
            />
          </label>
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

          <button type="submit" className="player-form__button">
            Start Game
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPlayer;
