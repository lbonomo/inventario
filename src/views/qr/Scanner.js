import React, { useState, useContext } from "react"
// import QrReader from 'react-qr-scanner'
// Si bien *react-qr-scanner* no muestra mensaje de error, es muy lerdo para leer
import QrReader from 'react-qr-reader'


import { Auth } from '../../context/AuthContext';
import Loading from '../../components/Loading'

import useStyles from './style'
import Header from './Header'
import Result from './Result'

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const Scanner = () => {
  const [scann, setScann] = useState(true)
  const [id, setID] = useState()
  const { user } = useContext(Auth)
  const classes = useStyles()

  /* Callback - ERROR */
  function handleError(err) {
    console.error(err);
  };

  /* Callback - Cuando el lector de QR hace una lectura exitosa */
  async function handleScan(data) {
    if ( data !== null ) {
        setScann(false)
        setID(data)
      }
      // window.location.hash="/result";
  };

  const reset = () => {
    setScann(true)
    setID(null)
  }

  // Scanner Config
  const config = {
    'delay': 300,
    'style': {
        width: '100%',
        maxWidth: '400px',
        maxHeight: '400px',
        height: '90vw',
        margin: 'auto',
        objectFit:'cover',
        overflow: 'hidden'
    },
    'facingMode': 'rear',
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Header username={ user.email } />
      <Container>
        <div className={classes.scanner}>
          { ( scann )
            ?
              <QrReader onScan = { handleScan } onError = { handleError } delay = { config.delay } style = { config.style } />
            :
              ( !id )
                ?
                  <Loading />
                :
                  <Result id={id} reset={reset} />
          }
        </div>
      </Container>
    </React.Fragment>
  )

}

export default Scanner
