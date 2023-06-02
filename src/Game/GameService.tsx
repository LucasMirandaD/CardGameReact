import axios, { responseEncoding } from "axios"
import { environment } from "../app/environment/environment"
/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
axios.defaults.headers.common["Content-Type"] = "application/json"


export interface Board {
    id: number
    player1Id: number
    player2Id: number
    boardName: string
    result: string
    turn: number
    winner: number
  }
  /* eslint-disable no-use-before-define */
  export async function NewBoard(params: {
    player1Id: number
    boardName: string

  }): Promise<Board> {
    const respuesta = (
        await axios.post(environment.backendUrl+ "/boards", params)
    ).data
    let board: Board = {
        id:         respuesta.board.id,
        player1Id:  respuesta.board.player1_id,
        player2Id:  respuesta.board.player2_id,
        boardName:  respuesta.board.boardName,
        result:     respuesta.board.result,
        turn:       respuesta.board.turn,
        winner:     respuesta.board.winner}
    return board
  }
/* eslint-enable no-use-before-define */