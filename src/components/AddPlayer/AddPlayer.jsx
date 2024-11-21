import "./AddPlayer.scss";
import { useState } from "react";

const AddPlayer = ({ getPlayerData, setAddPlayers }) => {
  const [p1, setP1] = useState("Mickey");
  const [p2, setP2] = useState("Taryn");
  const [p3, setP3] = useState("Enney");
  const [p4, setP4] = useState("Reza");
  const [uniquePlayer, setUniquePlayer] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();

    const playerList = [p1, p2, p3, p4];

    const uniquePlayers = new Set(playerList);

    console.log(uniquePlayers.size, playerList.length);

    if (uniquePlayers.size !== playerList.length) {
      setUniquePlayer(true);
      return;
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
