import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

import './Header.css';

import apiDomain from '../../config';

function Header() {
  const [userInfo, setUserInfo] = useState({});

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${apiDomain}player/${localStorage.getItem("id")}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setUserInfo({
          name: response.data.player.name,
          nickname: response.data.player.nickname,
          email: response.data.player.email,
          image_url: response.data.image_url,
        });
      }
    } catch (error) {
      console.error("Error al obtener información del usuario");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUserInfo();
    }
  }, []);

  return (
    <header className="py-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-9">
            <nav className="navbar navbar-expand-lg navbar-light">
              <Link className="navbar-brand text-white" to="/home">
                <img
                  src={apiDomain+"images/logo.png"}
                  alt="Logo"
                  className="logo-image"
                />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                {
                localStorage.getItem("token")?
                  <div className="navbar-nav">
                    <Link className="nav-link text-white" to="/create_game">Crear partida</Link>
                    <Link className="nav-link text-white" to="/join_game">Unirse partida</Link>
                    <Link className="nav-link text-white" to="/my_games">Mis partidas</Link>
                    <Link to="/help" className="nav-link text-black">
                      <i className="fas fa-question-circle"></i>
                    </Link>
                  </div>
                :
                  <div className="navbar-nav">
                    <Link className="nav-link text-white" to="/login">Iniciar sesión</Link>
                    <Link className="nav-link text-white" to="/register">Crear cuenta</Link>
                  </div>
                }
              </div>
            </nav>
          </div>
          {
          localStorage.getItem("token")?
          <div className="col-3 d-flex flex-column align-items-center">
            <div className="dropdown">
              <img
                src={userInfo.image_url}
                alt="Foto de perfil"
                className="profile-image"
                data-toggle="dropdown"
              />
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" to="/profile">Perfil</Link>
                <div className="dropdown-divider"></div>
                <Link to="/" className="dropdown-item" onClick={() => { localStorage.clear(); }}>
                  Cerrar sesión
                </Link>
              </div>
            </div>
            <span className="text-white">{userInfo.name} ({userInfo.nickname})</span>
          </div>
          :<div></div>}
        </div>
      </div>
    </header>
  )
}

export default Header;
