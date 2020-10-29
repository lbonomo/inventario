import React from "react";

// Material UI
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import useStyles from './style'

const NoData = ( {reset}) => {

  const classes = useStyles()

  return (
    <React.Fragment>
      <h1 className={ classes.noData }>Sin dato para este código</h1>

      <Fab
        color="secondary"
        className={ `${classes.fab} ${classes.back}` }
        onClick={ () => { reset() } }>
        <Icon className={ classes.icon }>qr_code</Icon>
      </Fab>

    </React.Fragment>
  )
}

export default NoData
