import React from 'react'
import ReactDOM from 'react-dom'
import './Game.css'
import './GameService'
import { BrowserRouter, useNavigate } from 'react-router-dom'
/* eslint-disable */

interface SquareProps {
    value: string
    onClick: () => void
  }

export function Square(props: SquareProps) {
    return (
      <button className="button square" onClick={props.onClick}>
        {props.value}
      </button>
    )
  }
  

  function Board(){
    // Hooks del board
    const [initialSquares, setInitialSquares] = React.useState(Array(9).fill(null))
    const [squares, setSquares] = React.useState([...initialSquares])
    const [xSigue, setXSigue] = React.useState(true)
    

    function resetBoard() {
      setSquares([...initialSquares])
      setXSigue(true)
    }
    
    function handleClick(i: number){
      const squaresCopy = squares.slice() // copia del arreglo
      if (calculateWinner(squaresCopy) || squaresCopy[i]) {  // si juego tiene ganador o boton seleccionado
        return
      }
      squaresCopy[i] = xSigue ? "X" : "O" 
      setSquares(squaresCopy)
      setXSigue(!xSigue)
      
    }
    function renderSquare(i: number){ // renderiza los cuadrados
      return <Square value={squares[i]} onClick={() => handleClick(i)} />
    }

   const ganador = calculateWinner(squares) // establece la variable ganador con el simbolo

   let status

    if(ganador){// comprueba si hay un simbolo
      status = "Ganador: "+ String(ganador) // lo pidio eslint
    } else if (squares.every((square) => square !== null)) {
      status = "Empate"
    } else {
      status = "Siguiente jugador: " + (xSigue ? "X" : "O")
    }
        return(
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button onClick={resetBoard}>Reiniciar</button>
      </div>
      )
  }
  export function Game() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>

        </div>
      </div>
    )
  }
  // ========================================
  ReactDOM.render(<Game />, document.getElementById("root"))

function calculateWinner(squares: any[]){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    // for(let i = 0; i < lines.length; i++){
    //   const [a, b, c] = lines[i]
    //   if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    //     return squares[a]
    //   }
    // }
    return null
    }