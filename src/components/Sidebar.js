import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { consoleURL } from '../firebaseConfig'

import { Auth } from '../context/AuthContext'
// import firebaseConfig from '../firebaseConfig';

const Sidebar = () => {

    const { user } = useContext(Auth)

    let hashPath = window.location.hash;

    const hiddenSidebar = () => {
      // TODO - Resolver los problemas con MDL o implementar Material UI
      let sidebar = document.getElementById('sidebar')
      if ( sidebar.classList.contains('is-visible') ) {
        sidebar.classList.remove('is-visible')
      }
    }

    return (
      <div className='demo-drawer mdl-layout__drawer mdl-color--grey-900 mdl-color-text--grey-50'
         id='sidebar' aria-hidden='true' onFocus={() => hiddenSidebar() }>
        <header className='demo-drawer-header'>
          <div className='demo-avatar-dropdown'>
            <span>{ user.email }</span>
          </div>
        </header>
        <nav className='demo-navigation mdl-navigation mdl-color--grey-800'>

          {/*
          <NavLink exact to='/'
            className={`mdl-navigation__link ${ (hashPath === '#/') && 'mdl-navigation__link--current' }`}
            >
            <i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>dashboard</i>
            Tablero
          </NavLink>
          */}

          <NavLink exact to='/labels'
            className={`mdl-navigation__link ${ (hashPath.match('#/labels/*') ) && 'mdl-navigation__link--current' }`}
            >
            <i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>label</i>
            Etiquetas
          </NavLink>

          <NavLink exact to='/products'
            className={`mdl-navigation__link ${ (hashPath.match('#/products/*') ) && 'mdl-navigation__link--current' }`}
            >
            <i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>extension</i>
            Productos
          </NavLink>

          <NavLink exact to='/providers'
            className={`mdl-navigation__link ${ ( hashPath.match('#/providers/*') ) && 'mdl-navigation__link--current' }`}
            >
            <i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>store</i>
            Proveedores
          </NavLink>

          <NavLink exact to='/scanner'
            className={`mdl-navigation__link ${ ( hashPath.match('#/scanner/*') ) && 'mdl-navigation__link--current' }`}
            >
            <i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>qr_code_scanner</i>
            Scanner
          </NavLink>

          <a className='mdl-navigation__link' target='_blank' rel='noopener noreferrer' href={consoleURL}>
            <i className='mdl-color-text--blue-grey-400 material-icons' role='presentation' >build</i>
            Backend
          </a>

          {/*
            <a className='mdl-navigation__link' href=''><i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>qr_code</i>Suministros</a>
            <a className='mdl-navigation__link' href=''><i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>store</i>Suministros</a>
            <a className='mdl-navigation__link' href=''><i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>inbox</i>Supplies</a>
            <a className='mdl-navigation__link' href=''><i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>delete</i>Supplies</a>
            <a className='mdl-navigation__link' href=''><i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>report</i>Spam</a>
          */}
          <div className='mdl-layout-spacer'></div>
          {/* TODO - Leer la URL de un archivo de configuración */}
          <NavLink exact to='/logout' className='mdl-navigation__link'><i className='mdl-color-text--blue-grey-400 material-icons' role='presentation'>close</i>Salir</NavLink>
        </nav>
      </div>
    )
}

export default Sidebar
