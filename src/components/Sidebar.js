import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { Auth } from "../context/AuthContext";
// import firebaseConfig from "../firebaseConfig";

const Sidebar = () => {

    const { user } = useContext(Auth)

    let hashPath = window.location.hash;


    return (
      <div className="theme1-drawer mdl-layout__drawer mdl-color--grey-900 mdl-color-text--grey-50">
        <header className="theme1-drawer-header">
          <div className="theme1-avatar-dropdown">
            <span>{ user.email }</span>
          </div>
        </header>
        <nav className="theme1-navigation mdl-navigation mdl-color--grey-800">

          <NavLink exact to="/"
            className={`mdl-navigation__link ${ (hashPath === '#/') && 'mdl-navigation__link--current' }`}
            >
            <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">dashboard</i>
            Tablero
          </NavLink>

          <NavLink exact to="/deposit"
            className={`mdl-navigation__link ${ (hashPath.match('#/deposit/*') ) && 'mdl-navigation__link--current' }`}
            >
            <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">assignment</i>
            Deposito
          </NavLink>

          <NavLink exact to="/products"
            className={`mdl-navigation__link ${ (hashPath.match('#/products/*') ) && 'mdl-navigation__link--current' }`}
            >
            <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">extension</i>
            Productos
          </NavLink>

          <NavLink exact to="/providers"
            className={`mdl-navigation__link ${ ( hashPath.match('#/providers/*') ) && 'mdl-navigation__link--current' }`}
            >
            <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">store</i>
            Proveedores
          </NavLink>

          {/* TODO - Leer la URL de un archivo de configuración */}
          <a className="mdl-navigation__link" target="_blank" rel="noopener noreferrer" href="https://console.firebase.google.com/u/1/project/gatti-inventrio/overview">
            <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation" >build</i>
              Panel de control
          </a>

          {/*
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">qr_code</i>Suministros</a>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">store</i>Suministros</a>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Supplies</a>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Supplies</a>
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">report</i>Spam</a>
          */}
          <div className="mdl-layout-spacer"></div>
          <NavLink exact to="/logout" className="mdl-navigation__link"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">close</i>Salir</NavLink>
        </nav>
      </div>
    )
}

export default Sidebar
