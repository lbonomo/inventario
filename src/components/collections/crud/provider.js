import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import firebaseConfig from '../../../firebaseConfig'

// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import useStyles from './style'

const ProviderCRUD = () => {
  const classes = useStyles();
  const history = useHistory();
  // if (show) { var dialog = document.querySelector('dialog'); // dialog.showModal(); }

  const db = firebaseConfig.firestore()

  // Creo el state del proveedor
  const [provider, setProvider] = useState({
    name: '',
  })

  const addProvider = async () => {
    await db.collection('providers').doc().set(provider)
  }

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent Default actin

    setProvider({ name:'' })
    // Paso los datos al componente padre para guardarlos
    addProvider()

    // Go tabla
    history.push("/providers");
  }

  // Se ejecuanta cuando el usuario escribe en el input
  const handleChange = (e) => {
    // Usamos destructuring para escribir el state
    setProvider({ ...provider, [e.target.name]:e.target.value })
  }
  const { name } = provider



  return (
    <Container className={ classes.container }>

      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} className={classes.formRow}>
            <TextField
              className={classes.textField}
              label="Proveedor"
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={name}
              required
              />
            </Grid>

            <Grid item xs={12} className={classes.submitRow}>
              <Button
                id="submit"
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<SaveIcon />}
                >
                Grabar
              </Button>
            </Grid>

        </Grid>
      </form>
    </Container>
  )
}

export default ProviderCRUD
