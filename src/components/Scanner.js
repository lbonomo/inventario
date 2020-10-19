import React, { Fragment, useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import QrReader from 'react-qr-scanner'
// import labelContext from '../context/labelContext';
import Result from './Result'
// Material UI
import { makeStyles } from '@material-ui/core/styles';

/* Verifico que el codigo leido sea el correcto */
const GetItem = async (cadena) => {
  console.log(cadena)
  if (cadena === null ) {
    return false;
  } else {
    return true;
  }
}

const useStyles = makeStyles((theme) => ({
  scanner: {
    margin: '3rem auto 1rem',
    width:'100%',
  },
}));

const Scanner = () => {
  const classes = useStyles();
  const [scann, setScann] = useState(true)
  const [data, setData] = useState()

  /* Callback - ERROR */
  function handleError(err) {
    console.error(err);
  };

  /* Callback - Cuando el lector de QR hace una lectura exitosa */
  async function handleScan(data) {
    // Si el formato es el correcto, paso los daatos a "Resultados"
    console.log(data)
    if ( data !== null ) {
        console.log(data)
        setScann(false)
        setData(data)
      }
      // window.location.hash="/result";
  };

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
    <div className="mdl-card collections-main mdl-cell mdl-cell--12-col mdl-color--grey-100">



      <div className="container mdl-grid">
        <div className="mdl-cell mdl-cell--12-col">

          <div className={classes.scanner}>
          {
            ( scann ) ?
            <QrReader onScan = { handleScan } onError = { handleError } delay = { config.delay } style = { config.style } />
              :
            <Result data={data} />
            }
          </div>
        </div>
      </div>
    </div>
  )

}

export default Scanner
