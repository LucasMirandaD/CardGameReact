import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/* MIS COMPONENTES */

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import Profile from './components/user/Profile';
import Password from './components/user/Password.jsx';
import Create from './components/game/Create';
import Join from './components/game/Join';
import Games from './components/game/Games';
import Game from './components/game/Game';
import Help from './components/others/Help';

/* RUTAS */
const routers = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/password",
    element: <Password/>
  },
  {
    path: "/create_game",
    element: <Create/>
  },
  {
    path: "/join_game",
    element: <Join/>
  },
  {
    path: "/my_games",
    element: <Games/>
  },
  {
    path: "/game/:token",
    element: <Game/>
  },
  {
    path: "*",
    element: <Login/>
  },
  {
    path: "/help",
    element: <Help/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div >
      <RouterProvider router={routers}/>
    </div>
    
  </React.StrictMode>
);

