import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import firebaseConfig from '../../../firebaseConfig'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({
  textField: {
    // margin: '0 auto',
    width:'100%',
  },
  button: {
    fontSize: "1rem",
    borderRadius: 0,
  },
}));

const ProductCRUD = () => {
  const classes = useStyles();
  const history = useHistory();
  // if (show) { var dialog = document.querySelector('dialog'); // dialog.showModal(); }

  const db = firebaseConfig.firestore()

  // Creo el state del proveedor
  const [product, setProduct] = useState({
    name: '',
  })

  const addProduct = async (dataProduct) => {
    await db.collection('products').doc().set(dataProduct)
    console.log('Listo!');
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

    setProduct({ name:'' })
    // Paso los datos al componente padre para guardarlos
    addProduct(product)


    // TODO - Hiden loading

    // Go tabla
    history.push("/products");
  }

  // Se ejecuanta cuando el usuario escribe en el input
  const handleChange = (e) => {
    // Usamos destructuring para escribir el state
    setProduct({ ...product, [e.target.name]:e.target.value })
  }
  const { name } = product

  return (
    <React.Fragment>

      { error ? <p className="form-error">Todos los campos son obligatorios</p> : null }

      <div className="mdl-layout__header-row">
        {/*<span className="mdl-layout-title">Nuevo producto</span>*/}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="container mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            <div className="mdl-textfield fullwidth">
              <TextField
                className={classes.textField}
                label="Nombre del producto"
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={name}
                required
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

export default ProductCRUD
