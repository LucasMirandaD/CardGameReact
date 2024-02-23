import React from 'react';
import Header from './others/Header';
import Create from './game/Create'; // Importa el componente Create
import Join from './game/Join'; // Importa el componente Join
import Games from './game/Games'; // Importa el componente Games

function Home() {
  return (
    <div>
      <Header />
      <div className="container mt-5 col-md-9">
        <br />
        <center>
          <h1>Tablero Principal</h1>
        </center>
        <hr />
        <div className="row shadow mb-4">
          {/* Div para el componente Create */}
          <div className="col-md-6 mb-5">
            <Create />
          </div>
          {/* Div para el componente Join */}
          <div className="col-md-6">
            <Join />
          </div>
        </div>
        {/* Div para el componente Games */}
        <div className="row mb-5 shadow">
          <div className="col-md-12 ">
            <Games />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

