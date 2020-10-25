import React from "react";

// Material UI
import AppBar from '@material-ui/core/AppBar';


import '../../css/scanner.css'

const Header = () => {
  return (
    <React.Fragment>
      <AppBar position="static" className="header">
        <h1>Fundición Qatti</h1>
      </AppBar>
    </React.Fragment>
  )
}

export default Header
