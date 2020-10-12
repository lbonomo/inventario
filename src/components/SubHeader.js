import React from 'react'
import { NavLink } from "react-router-dom";

import "../css/style.css"

function SubHeader() {

    // const show =true;

    return (
      <React.Fragment>
          <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--fab mdl-color--accent">
            {
              ( window.location.hash === '#/providers/add')
              ?
                <NavLink exact to="/providers">
                  <i className="material-icons mdl-color-text--white" role="presentation">navigate_before</i>
                  <span className="visuallyhidden">navigate_before</span>
                  <span className="mdl-button__ripple-container">
                    <span className="mdl-ripple"></span>
                  </span>
                </NavLink>
            :
              <NavLink exact to="/providers/add">
                <i className="material-icons mdl-color-text--white" role="presentation">add</i>
                <span className="visuallyhidden">add</span>
                <span className="mdl-button__ripple-container">
                  <span className="mdl-ripple"></span>
                </span>
              </NavLink>
            }
          </button>
      </React.Fragment>
    )
}

export default SubHeader
