import React, { useState } from "react"
import QrReader from 'react-qr-scanner'
// import QrReader from 'react-qr-reader'

import '../../css/scanner.css'

import Loading from '../../components/Loading'
import Header from './Header'
import Result from './Result'


// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';



const Scanner = () => {
  const [scann, setScann] = useState(true)
  const [id, setID] = useState()

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
      <Header />
      <Container>
        <div className='scanner'>
          { ( scann )
            ?
              <QrReader onScan = { handleScan } onError = { handleError } delay = { config.delay } style = { config.style } />
            :
            ( !id ) ? <Loading /> :  <Result id={id} reset={reset} />
          }
        </div>
      </Container>
    </React.Fragment>
  )

}

export default Scanner
