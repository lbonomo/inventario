import React from 'react'
import { NavLink } from "react-router-dom";

// Material UI
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import "../css/style.css"

function CollectionBar({colection}) {

    // const show =true;

    return (
      <React.Fragment>
          <span className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--fab mdl-color--accent">
            {
              ( window.location.hash === `#/${colection}`)
              ?
                <NavLink exact to={`/${colection}/add`}>
                  <Fab color="secondary" aria-label="add" >
                    <Icon>add</Icon>
                  </Fab>
                </NavLink>
              :
                <NavLink exact to={`/${colection}`}>
                  <Fab color="secondary" aria-label="add" >
                    <Icon>navigate_before</Icon>
                  </Fab>
                </NavLink>
            }
          </span>
      </React.Fragment>
    )
}

export default CollectionBar
