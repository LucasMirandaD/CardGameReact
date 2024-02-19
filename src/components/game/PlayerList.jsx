import React, { useState, useEffect } from 'react';
import './PlayerList.css';

function PlayerList(props) {
  const [visiblePlayers, setVisiblePlayers] = useState([0, 1]);

  useEffect(() => {

    setVisiblePlayers([0, 1]); // queda asi por si tiene que crecer y mostrar mas jugadores
  }, [props.players]);

  return (
    <div>
      <div className="player-list-container justify-content-center align-items-center" style={{ height: "48vh", flexDirection: "column" }}>
        <ul className="player-list" id="playerList">
          {
            visiblePlayers.map((indexPlayer, index) => (
              <div className="mb-3 mt-3" key={indexPlayer}>
                {props.players[indexPlayer] && (
                  <div>
                    <li className="player-item">
                      <div className="player-info">
                        <img
                          src={props.players[indexPlayer].url}
                          alt={`Avatar jugador ${indexPlayer}`}
                        />
                        <span className="card-count">{props.players[indexPlayer].amountCards}</span>
                      </div>
                      <span className="player-name">{props.players[indexPlayer].name}</span>
                    </li>
                    <hr />
                  </div>
                )}
              </div>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default PlayerList;
