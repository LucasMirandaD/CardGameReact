import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams} from 'react-router-dom';

import Header from './../others/Header';
import Warning from '../others/Warning';
import Error from '../others/Error';
import Success from '../others/Success';

import apiDomain from '../../config';
import InputForm from '../others/InputForm';

function Join() {
  const navigate = useNavigate();

  const [boardId, setBoardId] = useState('');

  const [warningMessage, setWarningMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setsuccessMessage] = useState('');

  const redirectToGame = () => {
    if (boardId) {
      navigate(`/game/${boardId}`);
    } else {
      console.error("No existe la partida con este token");
    }
  };

  /* LOGICA PARA VERIFICAR PARTIDA Y UNIRSE */
  const requestData = {
    board: {
      id: boardId,
      player2_id: localStorage.getItem("id")
    }
  }

  const requestBody = JSON.stringify(requestData);
  
  const joinBoard = async (token) => {
    try {
      const response = await axios.post(`${apiDomain}board/join_board`, requestBody, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        redirectToGame();
        localStorage.setItem('boardId', boardId);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.messages) {
        const messageList = error.response.data.messages;
        const errorMessages = messageList.map(messageObj => messageObj.message);
        setErrorMessages(prevErrors => [...prevErrors, ...errorMessages.flat()]);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWarningMessage("");
    setErrorMessages([]);
    setsuccessMessage("");

    if (boardId==""){
      setErrorMessages(prevErrors => [...prevErrors, "El token no puede ser vacío"]);
      return
    }

    try {
        const response = await axios.get(`${apiDomain}boards/${boardId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        });    
        if (response.status === 200) {
          if (response.data.board.finished === true){
            setErrorMessages(prevErrors => [...prevErrors, "La partida ha finalizado"]);
            console.error("La partida ya ha finalizado");
          }
          else if (response.data.board.player1_id === localStorage.getItem("id")){
            alert("Ya estabas unido a la partida. Redireccionando");
            redirectToGame();
          }
          else{
            console.log("Uniendo a partida");
            joinBoard(boardId);
          }
            
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.messages) {
            const messageList = error.response.data.messages;
            const errorMessages = messageList.map(messageObj => messageObj.message);
            setErrorMessages(prevErrors => [...prevErrors, ...errorMessages.flat()]);
        };
    }
  };

  const handleBoardIdChange = (event) => {
    setWarningMessage("");
    setErrorMessages([]);
    setsuccessMessage("");
    setBoardId(event.target.value);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <Header/>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center">Unirse a la partida</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="boardId">Token</label>
                    <InputForm
                      type="text" 
                      id="boardId"
                      placeholder="Ingrese el token de la partida"
                      value={boardId}
                      onChange={handleBoardIdChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Unirse</button>
                </form>
                {warningMessage && <Warning description={warningMessage} />}
                {errorMessages.length > 0 && (
                  errorMessages.map((error, index) => (
                  <Error key={index} description={error} />
                  ))
                )}
                {successMessage && <Success description={successMessage} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Join