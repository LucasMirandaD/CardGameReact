import React from "react"
import { NavLink } from "react-router-dom"
import "./Menu.css"
import { logout } from "../user/userService"

export default function MainMenu() {
  const logoutApp = () => {
    void logout()
  }

  return (
    <div>
      <NavLink to="/info" className="menu_item btn btn-sm btn-link">Sesión</NavLink><br />
      <NavLink to="/password" className="menu_item btn btn-sm btn-link">Password</NavLink><br />
      <NavLink to="" onClick={logoutApp} className="menu_item btn btn-sm btn-link">Logout</NavLink><br />
      <NavLink to="/Game" className="menu_item btn btn-sm btn-link">Game</NavLink><br />
      <h6 className="menu_section">Perfil</h6>
      <NavLink to="/profile" className="menu_item btn btn-sm btn-link">Editar</NavLink><br />
    </div>
  )
}
