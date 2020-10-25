import React from "react";

// Material UI
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import '../../css/scanner.css'

const Footer = ({reset}) => {

  // <div className="footer">

  // <Fab color="secondary" aria-label="edit">
  // <AddIcon />
  // </Fab>
  // </div>

  const handleTake = () => {
    console.log("Take")
    reset()
  }

  const handleBack = () => {
    reset()
  }

  return (
    <React.Fragment>

      <Fab id="back" aria-label="add" color="secondary" onClick={handleBack}>
        <Icon>qr_code</Icon>
      </Fab>


      <Fab id="take" aria-label="add" color="secondary" onClick={handleTake}>
        <Icon>check</Icon>
      </Fab>
    </React.Fragment>
  )
}

export default Footer
