import React from 'react'

const Header = (name) => {
  // Set header title
  let title=''
  // ???
  switch (true) {

    case RegExp('#/deposit').test(window.location.hash):
      title='Deposito'
      break;

    case RegExp('#/products').test(window.location.hash):
      title='Productos'
      break;

    case RegExp('#/providers').test(window.location.hash):
      title='Proveedores'
      break;

    case RegExp('#/').test(window.location.hash):
      title='Tablero de control'
      break;

    default:
      // TODO
      title='name'
      break;
  }

  return (
    <header className="theme1-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
      <div className="mdl-layout__header-row">
        <div className="mdl-layout-spacer"></div>

        <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
          <span className="mdl-layout-title">{title}</span>
        </div>

        {/*
        <div className="mdl-layout-spacer"></div>
        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
          <i className="material-icons">more_vert</i>
        </button>

        <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="hdrbtn">
          <li className="mdl-menu__item">Salir</li>
        </ul>
        */}

      </div>

    </header>
  )
}

export default Header
