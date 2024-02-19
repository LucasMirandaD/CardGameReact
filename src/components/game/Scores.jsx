import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams} from 'react-router-dom';

import apiDomain from "../../config";
import "./Scores.css";

function Scores(props) {
  
  const [playersScore, setPlayersScore] = useState([]);
  const navigate = useNavigate();

  const getPlayersScore = async () => {
    try {
      const response = await axios.get(
        `${apiDomain}boards/${props.gameInfo.id}/score`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setPlayersScore(response.data.scores);
        console.log(playersScore);
      }
    } catch (error) {
      console.error("Error al obtener puntaje del usuario");
    }
  };

  const increaseScore = async (userID) => {
    const resquestDataBoard = {
      board: {
        id: props.gameInfo.id,
        player_id: userID
      }
    };
  
    const resquestBodyBoard = JSON.stringify(resquestDataBoard);

    try {
      const response = await axios.post(
        `${apiDomain}board/increase_score`, resquestBodyBoard,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
          },
        }
      );
      if (response.status === 200) {
        console.log("Se ha incrementado el puntaje");
      }
    } catch (error) {
      console.error("Error al obtener puntaje del usuario");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/login');
    }
    
    const intervalId = setInterval(() => {
      getPlayersScore();
    }, 500);

    return () => {
      clearInterval(intervalId);
    };

  }, []);

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="scores-container">
          <table className="scores-table">
            <thead>
              <tr className="scores-table-header">
                <th>jugador</th>
                <th>Puntaje</th>
                {
                localStorage.getItem("id")==props.gameInfo.player1_id?
                <th>Acciones</th>:""
                }
              </tr>
            </thead>
            <tbody>
              {playersScore.map((playerScore) => {
                return (
                  <tr className="score-card" key={playerScore.id}>
                    <td>
                      <div className="group-name">{playerScore.nickname}</div>
                    </td>
                    <td>
                      <div className="score-photos-container">
                        {Array.from({ length: playerScore.score }).map(
                          (_, index) => (
                            <img
                              key={index}
                              className="score-photo"
                              src={apiDomain + "images/match.png"}
                              alt="Fósforo"
                            />
                          )
                        )}
                      </div>
                    </td>
                    {
                    localStorage.getItem("id")==props.gameInfo.player1_id?
                    <td>
                      <button className="score-button" onClick={() => increaseScore(playerScore.id) }>+</button>
                    </td>
                    :""}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Scores;
