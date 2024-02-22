import React from "react";
import Header from "./others/Header";

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
              - El juego se juega con una baraja de cartas, que incluye cartas
              numeradas en cuatro colores (rojo, amarillo, verde y azul), cartas
              especiales y cartas comodín.
              <br />
              - Se reparten 7 cartas a cada jugador y se coloca una carta boca
              arriba en el centro como pila de descarte.
              <br />- El resto de las cartas forma el mazo para robar.
            </p>
            <h2>Reglas del juego:</h2>
            <p>
              - Los jugadores deben coincidir con la carta superior de la pila
              de descarte en número, color o símbolo. Si un jugador no puede
              hacer una jugada, debe sacar una carta del mazo y su turno
              termina.
              <br />- Las cartas especiales tienen acciones especiales:
              <ul>
                <li>
                  <strong>Retorno:</strong> Cambia la dirección del juego.
                  Cuando esta carta se juega, la dirección del juego se
                  invierte. Por ejemplo, si el juego estaba avanzando en sentido
                  horario, después de jugar la carta Reversa, el juego empezará
                  a avanzar en sentido antihorario.
                </li>
                <li>
                  <strong>Intermisión:</strong> Saltea el siguiente jugador en
                  turno. Cuando esta carta se juega, el siguiente jugador en
                  turno es saltado y se omite su turno. El juego continúa con el
                  jugador después del que fue saltado.
                </li>
                <li>
                  <strong>Toma Dos:</strong> Obliga al siguiente jugador a robar
                  dos cartas y perder su turno. Cuando esta carta se juega, el
                  siguiente jugador en turno debe robar dos cartas del mazo y su
                  turno se salta. El juego continúa con el jugador después del
                  que robó las cartas.
                </li>
                <li>
                  <strong>Cambio de color:</strong> Esta carta comodín permite
                  al jugador cambiar el color del juego. Al jugar esta carta, el
                  jugador elige un nuevo color y el siguiente jugador debe jugar
                  una carta de ese color.
                </li>
                <li>
                  <strong>Cambio de color +4:</strong> Esta carta comodín
                  especial permite al jugador cambiar el color del juego y
                  obliga al siguiente jugador a robar cuatro cartas del mazo y
                  perder su turno. Al jugar esta carta, el jugador elige un
                  nuevo color y el siguiente jugador debe robar cuatro cartas y
                  su turno se salta.
                </li>
              </ul>
            </p>
            <h2>Penalizaciones:</h2>
            <p>
              Si un jugador no respeta las reglas, debe tomar una o más cartas
              de pena. Las reglas son las siguientes:
              <ul>
                <li>
                  <strong>Puesto incorrecto:</strong> Quién pone una carta, a
                  pesar de que no está o una carta incorrecta, debe reanudarla y
                  además, recibe una carta de pena.
                </li>
              </ul>
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

export default Home;
