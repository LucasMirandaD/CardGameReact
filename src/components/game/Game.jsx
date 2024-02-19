import React, { useState, useRef, useEffect } from 'react';
import Header from '../others/Header';
import { useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';

import ListCards from './ListCards';
import PlayerList from './PlayerList';
import apiDomain from '../../config';
import Scores from './Scores';
import './Game.css';
import Warning from '../others/Warning';
import Success from '../others/Success';
import Error from '../others/Error';

function Game() {
  const { token } = useParams();
  const [playerCards, setPlayerCards] = useState([]);
  const [players, setPlayers] = useState([]);
  const [amount, setAmount] = useState(0);
  const [lastCard, setLastCard] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [gameInfo, setGameInfo] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [successMessage, setsuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const resquestDataBoard = {
    board: {
      id: token,
      player_id: localStorage.getItem('id')
    }
  };

  const resquestBodyBoard = JSON.stringify(resquestDataBoard);

  const getGameInfo = async () => {
    try {
      const response = await axios.get(`${apiDomain}boards/${token}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
         setGameInfo(response.data.board);
        if (response.data.winner){
          setWarningMessage("La partida ha finalizado");
        }
      }
    } catch (error) {
      console.error("Error al obtener puntaje del usuario");
    }
  };

  const getPlayerInfo = async (userID) => {
    try {
      const response = await axios.get(`${apiDomain}player/${userID}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (response.status === 200) {
        // setPlayerCards(response.data.deck);
        return [response.data.player, response.data.deck, response.data.image_url];
      }
    } catch (error) {
      console.error("Error al obtener información del usuario");
    }
  };
  

  const getCount = async (playerId) => {
    try{
      const response = await axios.get(`${apiDomain}players/${playerId}/cards_count`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        return response.data.count;
      }
    } catch (error){
      setErrorMessage('falló al obtener la cuenta de cartas');
      console.log(error);
    }
  };

  const getCards = async (playerId) => {
    try{
      const response = await axios.get(`${apiDomain}players/${playerId}/cards`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        if (response.data.cards !== null) { setPlayerCards(response.data.cards); }
      }
    } catch (error){
      setErrorMessage('falló al obtener las cartas');
      console.log(error);
    }
  };

  const getGamePlayers = async () => {
    try {
      const playersData = [gameInfo.player1_id, gameInfo.player2_id];
      const currentPlayerId = localStorage.getItem("id");
  
      const playerPromises = playersData.map(async (playerId) => {
        if (playerId !== currentPlayerId) {
          const playerInfo = await getPlayerInfo(playerId);
          if (playerInfo) {
            const playerName = playerInfo[0].nickname;
            const playerImageUrl = playerInfo[2];
            const amountCards = await getCount(playerId);
            const playerDeck = playerInfo[1].deck;
            
            return { id: playerId, name: playerName, url: playerImageUrl, amountCards, cards: playerDeck };
          }
        }
        return null;
      });
  
      const players = await Promise.all(playerPromises);
      const validPlayers = players.filter(player => player !== null);
      setPlayers(validPlayers);
    } catch (error) {
      console.error("Error al obtener información de los jugadores", error);
    }
  };
  
  const dealCards = async () => {
    try{
      const response = await axios.post(`${apiDomain}board/deal_cards`, resquestBodyBoard, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 200) {
        setsuccessMessage('Se entregaron las cartas correctamente');
      }
    } catch (error){
      setErrorMessage('No se pudo entregar las cartas');
      console.log(error);
    }
  };

  const takeCard = async () => {
    try {
      const response = await axios.post(`${apiDomain}board/take_card`, resquestBodyBoard, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 200) {
        setPlayerCards([...playerCards, response.data.card]); // agrego la carta que acabo de tomar
      }
    } catch (error) {
      console.error("Error al obtener carta del mazo");
    }
  };

  const throwCard = async (cardId,cardUrl) => {

    const resquetDataCard = {
      board: {
        id: token,
        player_id: localStorage.getItem('id'),
        card_url: cardUrl
      }
    };
    const resquestBodyBoard = JSON.stringify(resquetDataCard);

    try {
      const response = await axios.post(`${apiDomain}board/throw_card`, resquestBodyBoard, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 200) {
        setPlayerCards(prevPlayerCards => prevPlayerCards.filter(card => card.id != cardId));
      }
    } catch (error) {
      console.error("Error al tirar carta");
    }
  };

  const LastCard = async () => {
    try {
      const response = await axios.post(`${apiDomain}board/last_card`, resquestBodyBoard, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 200) {
        setLastCard(response.data.url);
      }
    } catch (error) {
      console.error("Error al obtener ultima carta");
    }
  };

  
  const handleKeyPress = (event) => {
    if (event.key === 'Control') {
      setShowPopup(true);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Control') {
      setShowPopup(false);
    }
  };

  const finishGame = async (playerId) => {

    const resquetDataCard = {
      board: {
        winner: playerId
      }
    };
    const resquestBodyBoard = JSON.stringify(resquetDataCard);

    try {
      const response = await axios.put(`${apiDomain}boards/${token}`,resquestBodyBoard, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 200) {
        console.log("Partida finalizada");
      }
    } catch (error) {
      console.error("Error al obtener ultima carta");
    }
  };

  const resetGame = async () => {
    try {
      const response = await axios.put(apiDomain + 'v1/games/'+token+'/cards',{}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        console.log("Cartas cambiadas correctamente");
      }
    } catch (error) {
      console.error("Error al restablecer la partida");
    }
  };


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate('/login');
    }
    const intervalId = setInterval( () => {
     getGameInfo();
     getPlayerInfo(localStorage.getItem('id'));
     LastCard();
  }, 1000);

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (gameInfo !== null) {
      getGamePlayers();
      getCards(localStorage.getItem('id'));
    }
  }, [gameInfo]);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row no-gutters">
          <div className="col-9 game-container">
            
            <div className="player-card-count">{playerCards.length} cartas</div> 
            
            <div className="row">
              <div className="col">
                <div
                  className="card-on-table"
                  id="cartas-mesa"
                >
                  <img
                    src={lastCard && apiDomain+lastCard}
                    alt="Carta en la mesa"
                    id="carta-mesa"
                  />
                  <img
                    src={apiDomain+"images/cards/back.png"}
                    alt="Carta en la mesa"
                    id="carta-mesa"
                    onClick={takeCard}
                  />
                </div>
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col">
                <ListCards playerCards={playerCards} throwCard={throwCard}/>
              </div>
            </div>
          </div>

          <div className="col-2 game-container">
            <PlayerList players={players} />            
          </div>
        </div>

        {localStorage.getItem("id") === gameInfo.player1_id? // esto es para el admin o player1 que es quien crea la partida
        <div className="row no-gutters">
          <div className="col-9 d-flex justify-content-center mt-3">
            <button className="btn btn-success mr-4" id="botones-partida" onClick={dealCards}>
              Repartir cartas
            </button>
            <button className="btn btn-success mr-4" id="botones-partida" onClick={resetGame}>
              Restablecer partida
            </button>
            <button className="btn btn-danger" id="botones-partida" 
            onClick={finishGame}
            >
              Terminar partida
            </button>
          </div>
        </div>
        :""
        }

        <div className="row no-gutters">
          <div className="col-9 d-flex justify-content-center">
            {warningMessage && <Warning description={warningMessage} />}
          </div>
        </div>
        
      </div>
      {showPopup && <Scores gameInfo={gameInfo} token={token} />}
    </div>
  );
}

export default Game