import React from 'react'
import { NavLink } from "react-router-dom";

// Material UI
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import "../css/style.css"

function CollectionBar({colection}) {

    // const show =true;

    return (
      <React.Fragment>
          <button className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--fab mdl-color--accent">
            {
              ( window.location.hash === `#/${colection}`)
              ?
                <NavLink exact to={`/${colection}/add`}>
                  <Fab color="secondary" aria-label="add" >
                    <AddIcon />
                  </Fab>
                </NavLink>
              :
                <NavLink exact to={`/${colection}`}>
                  <Fab color="secondary" aria-label="add" >
                    <NavigateBeforeIcon />
                  </Fab>
                </NavLink>
            }
          </button>
      </React.Fragment>
    )
}

export default CollectionBar
