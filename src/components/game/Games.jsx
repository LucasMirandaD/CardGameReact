import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Header from './../others/Header';

import apiDomain from '../../config';

import './Games.css';

function Games() {
  const navigate = useNavigate();
  const [myBoards, setMyBoards] = useState([]);

  const fetchUserInfo = async (user_id) => {
    let nickname = "";
    try {
      const response = await axios.get(`${apiDomain}player/${user_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        nickname = response.data.player.nickname;
      }
    } catch (error) {
      console.error("Error al obtener información del usuario");
    }
    return nickname;
  };

  const requestData = {
    id: localStorage.getItem("id")
  };

  const fetchBoardInfo = async (board_token) => { // Usado por fetchBoards para obtener las entidades de los Boards
    let newBoard = {};
    try {
      const response = await axios.get(`${apiDomain}boards/${board_token}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        let json_data = response.data.board
        const nickname = await fetchUserInfo(json_data.player1_id);

        newBoard= {
          name: json_data.board_name,
          administrator: nickname,
          status: json_data.winner? "Finalizado":"En curso",
          token: board_token,
          action: json_data.winner? "-":"Reanudar",
        };
      }
    } catch (error) {
      console.error("Error al obtener información de la partida");
    }
    return newBoard;
  };

  const fetchBoards = async () => { // Trae todas las entidades de board asociadas al player
    try {
      const response = await axios.get(`${apiDomain}board/my_games/${requestData.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (response.status === 200) {
        const myBoardsPromises = response.data.boards.map((board) => fetchBoardInfo(board.id));
        
        const myBoardsData = await Promise.all(myBoardsPromises);
  
        setMyBoards(myBoardsData);
      }
    } catch (error) {
      console.error("Error al obtener las partidas del usuario");
    }
  };

  const handleSubmit = (board) => {
    console.log("Ejecutando accion");
    if (board.action === "-") {
      return;
    }
    if (board.action === "Reanudar") {
      navigate(`/game/${board.token}`);
    }
  };


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/login');
    }
    fetchBoards();
  }, []);

  return (
    <div>
      {!window.location.pathname.includes('/home') && <Header />}
      <div className="container mt-5">
        <h2 className="font-weight-bold">Mis Partidas</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr id="cabecera" className="text-white">
                <th scope="col">Nombre Tablero</th>
                <th scope="col">Creador</th>
                <th scope="col">Estado</th>
                <th scope="col">Token</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
            {
            myBoards.map( (board) => {
              return (
                <tr key={board.token}>
                  <td>{board.name}</td>
                  <td>{board.administrator}</td>
                  <td>{board.status}</td>
                  <td>{board.token}</td>
                  <td>
                    <button onClick={() => handleSubmit(board)} className="btn btn-primary">{board.action}</button>
                  </td>
                </tr>
              );
            })
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  )
}

export default Games