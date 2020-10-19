import React from 'react'

const Header = (name) => {
  // Set header title
  let title=''
  // ???
  switch (true) {

    case RegExp('#/deposit/add').test(window.location.hash):
      title='Nuevo item'
      break;

    case RegExp('#/deposit').test(window.location.hash):
      title='Deposito'
      break;

    case RegExp('#/products/add').test(window.location.hash):
      title='Nuevo producto'
      break;

    case RegExp('#/products').test(window.location.hash):
      title='Productos'
      break;

    case RegExp('#/providers/add').test(window.location.hash):
      title='Nuevo proveedor'
      break;

    case RegExp('#/providers').test(window.location.hash):
      title='Proveedores'
      break;

    case RegExp('#/scanner').test(window.location.hash):
      title='Scanner'
      break;

    case RegExp('#/').test(window.location.hash):
      title='Tablero de control'
      break;

    default:
      // TODO
      title='name'
      break;
  }

  const showBar = () => {
    // TODO - Resolver problema MDL
    let sidebar = document.getElementById('sidebar')
    sidebar.classList.add('is-visible')
  }

  return (
    <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
      <div aria-expanded="false" role="button" tabIndex="0" className="mdl-layout__drawer-button">
        <i className="material-icons" onClick={() => showBar() }></i>
      </div>
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
