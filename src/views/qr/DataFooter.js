import React, { useContext } from "react";

// Material UI
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import useStyles from './style'

import { Auth } from '../../context/AuthContext';
import firebaseConfig from '../../firebaseConfig'
import { dateField } from '../../libs/date'

const DataFooter = ({reset, label, data}) => {
  const { user } = useContext(Auth)
  const classes = useStyles()

  let disabled = true
  if (data.out.date === '') { disabled = false }

  const handleTake = async() => {
    const db = firebaseConfig.firestore()
    await db.collection('labels').doc(label).update(
      {
        'out': {
          'user': user.email,
          'date': dateField()
        }
      }
    )
    reset()
  }

  const handleBack = () => {
    reset()
  }

  return (
    <React.Fragment>

      <Fab
        id="back"
        color="secondary"
        onClick={handleBack}
        className={ `${classes.fab} ${classes.back}` }
        >
        <Icon className={ classes.icon }>qr_code</Icon>
      </Fab>

      <Fab
        id="take"
        color="secondary"
        onClick={handleTake}
        disabled={disabled}
        className={ `${classes.fab} ${classes.take}` }
        >
        <Icon className={ classes.icon }>archive</Icon>
      </Fab>
    </React.Fragment>
  )
}

export default DataFooter
