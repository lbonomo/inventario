import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import firebaseConfig from '../../../firebaseConfig'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles(() => ({
  button: {
    fontSize: "1rem",
    borderRadius: 0,
  }
}));

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

  // Estate error
  const [error, setError ] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent Default actin

    // TODO - Show loading

    // Validamos que el campo no este vacio.
    if (name.trim() === '') {
      setError(true)
      return
    }
    setError(false) // Reseteo el valor error

    setProvider({ name:'' })
    // Paso los datos al componente padre para guardarlos
    addProvider()


    // TODO - Hiden loading

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
    <React.Fragment>

      { error ? <p className="form-error">Todos los campos son obligatorios</p> : null }

      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">Nuevo proveedor</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="container mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            <div className="mdl-textfield fullwidth">
              <input
                required
                className="mdl-textfield__input"
                placeholder="Proveedor"
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={name}
                />
            </div>
          </div>
        </div>

        <div className="container mdl-grid">
          <div className="mdl-layout-spacer"></div>
          <div className="mdl-cell mdl-cell--2-col">
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

          </div>
        </div>
      </form>
    </React.Fragment>
  )
}

export default ProviderCRUD
