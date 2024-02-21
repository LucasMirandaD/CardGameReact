import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import apiDomain from '../../config';

import Header from './../others/Header';
import Warning from '../others/Warning';
import Error from '../others/Error';
import Success from '../others/Success';
import InputForm from '../others/InputForm';

function Create() {
    const navigate = useNavigate();
    const [warningMessage, setWarningMessage] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const [successMessage, setsuccessMessage] = useState('');

    const [boardInfo, setBoardInfo] = useState({
        boardName: '',
        id: ''
      });
    const handleName = async (event) => {
        const { value } = event.target;
        setBoardInfo(prevState => ({
            ...prevState,
            boardName: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setWarningMessage("");
        setErrorMessages([]);
        setsuccessMessage("");

        const requestData = {
            board: {
                board_name: boardInfo.boardName,
                player1_id: localStorage.getItem("id")
            }
          };
        const requestBody = JSON.stringify(requestData);
        
        try {
            const response = await axios.post(`${apiDomain}boards`, requestBody, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setBoardInfo({
                    id: response.data.board.id,
                    boardName: response.data.board.board_name,
                  });
                const boardId = response.data.board.id

                setsuccessMessage("Partida creada correctamente. Token: "+boardId);
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
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Crear partida</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="mode">Ingresa el nombre de tu tablero</label>
                                    <InputForm 
                                    className="form-control" 
                                    id="boardName"
                                    value={boardInfo.boardName}
                                    onChange={handleName}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Crear partida</button>
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

export default Create