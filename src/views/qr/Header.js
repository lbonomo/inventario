import React from "react";

// Material UI
import AppBar from '@material-ui/core/AppBar';

import useStyles from './style'

const Header = ({username}) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <AppBar position="static" >
        <h1 className={classes.header}>{username}</h1>
      </AppBar>
    </React.Fragment>
  )
}

export default Header
