import React from 'react'
import Header from './others/Header'

function Home() {
  return (
    <div>
      <Header />
      <div className="container">
        <br />
        <center>
          <h1>¿Cómo jugar al UNO?</h1>
        </center>
        <hr />
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <h2>Objetivo del juego:</h2>
            <p>
              El objetivo del UNO es ser el primer jugador en quedarse sin
              cartas en la mano. Los jugadores deben deshacerse de sus cartas
              eligiendo una carta que coincida en número, color o símbolo con la
              carta en la parte superior del mazo.
            </p>
            <h2>Preparación:</h2>
            <p>
              - El juego se juega con una baraja cartas, que incluye
              cartas numeradas en cuatro colores (rojo, amarillo, verde y azul),
              cartas especiales y cartas comodín.
              <br />
              - Se reparten 7 cartas a cada jugador y se coloca una carta boca
              arriba en el centro como pila de descarte.
              <br />
              - El resto de las cartas forma el mazo para robar.
            </p>
            <h2>Reglas del juego:</h2>
            <p>
              - Los jugadores deben coincidir con la carta superior de la pila
              de descarte en número, color o símbolo. Si un jugador no puede
              hacer una jugada, debe sacar una carta del mazo y su turno
              termina.
              <br />
              - Las cartas especiales tienen acciones especiales:
              <ul>
                <li>
                  <strong>Reversa:</strong> Cambia la dirección del juego.
                </li>
                <li>
                  <strong>Skip:</strong> Saltea el siguiente jugador en turno.
                </li>
                <li>
                  <strong>Dos:</strong> Obliga al siguiente jugador a robar dos
                  cartas y perder su turno.
                </li>
              </ul>
              - Las cartas comodín permiten al jugador cambiar el color del juego
              y elegir qué color debe jugar el siguiente jugador.
            </p>
            <h2>Final del juego:</h2>
            <p>
              El juego continúa hasta que un jugador se quede sin cartas. Ese
              jugador es el ganador de la partida. Puedes jugar varias rondas
              para determinar al ganador general del juego (mediante fósforos).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home