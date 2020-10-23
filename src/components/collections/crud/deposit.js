import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import firebaseConfig from '../../../firebaseConfig'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// Propios
import SearchProduct from '../../SearchProduct'
import SearchProvider from '../../SearchProvider'


// Estilos
const useStyles = makeStyles(() => ({
  container: {
    marginTop:'2rem',
  },

  formRow: {
    marginTop:'2rem',
  },

  submitRow: {
    margin:'2rem 0 1rem',
    flexDirection: 'row-reverse'
  },

  textField: {
    // margin: '0 auto',
    width:'100%',
  },

  button: {
    fontSize: "1rem",
    borderRadius: 0,
  },

  crudActions: {
    textAlign: "right"
  },

  textField: {
    margin: '1rem',
    width: 450,
  },

  textFieldSmall: {
    margin: '1rem',
    width: 300,
  }

}));

const DepositCRUD = () => {
  const classes = useStyles();
  const history = useHistory();

  const db = firebaseConfig.firestore()

  // Creo el state del proveedor
  const [item, setItem] = useState({})
  const [product, setProduct] = useState('')
  const [disabled, setDisabled] = useState(true)

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
    // if (name.trim() === '') {
    //   setError(true)
    //   return
    // }
    setError(false) // Reseteo el valor error

    setItem({ name:'' })
    // Paso los datos al componente padre para guardarlos
    addProduct(product)


    // TODO - Hiden loading

    // Go tabla
    history.push("/products");
  }

  // Se ejecuanta cuando el usuario escribe en el input
  const handleChange = (e) => {
    // Usamos destructuring para escribir el state
    setItem({ ...item, [e.target.name]:e.target.value })
  }

  return (
    <Container className={classes.container}>

      { error ? <p className="form-error">Todos los campos son obligatorios</p> : null }

      <form onSubmit={handleSubmit}>
        <div className="container mdl-grid">
          <Grid container justify="space-around">
            {/* Search product */}
            <FormControl id="fcProduct" className={classes.textField} fullWidth>
              <SearchProduct item={item} setItem={setItem} setDisabled={setDisabled}/>
            </FormControl>

            <FormControl id="fcProvider" className={classes.textField} disabled={disabled} fullWidth>
              <SearchProvider disabled={disabled} item={item} setItem={setItem}/>
            </FormControl>
          </Grid>

          {/* Fechas */}
          <Grid container justify="space-around" className={classes.formRow}>
            <TextField
              id="dateIn"
              name="dateIn"
              value={item.dateIn}
              label="Fecha de ingreso"
              onChange={handleChange}
              type="date"
              disabled={disabled}
              className={classes.textField}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="dateExpiration"
              name="dateExpiration"
              value={item.dateExpiration}
              onChange={handleChange}
              label="Fecha de vencimiento"
              type="date"
              disabled={disabled}
              className={classes.textField}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* Fechas */}

          {/* Otros datos */}
          <Grid container justify="space-around" className={classes.formRow}>
            <TextField
              id="kg"
              name="kg"
              value={item.kg}
              onChange={handleChange}
              label="Kg"
              type="number"
              disabled={disabled}
              className={classes.textFieldSmall}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="lote"
              name="lote"
              value={item.lote}
              onChange={handleChange}
              label="Lote"
              type="text"
              disabled={disabled}
              className={classes.textFieldSmall}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="set"
              name="set"
              value={item.set}
              onChange={handleChange}
              label="Set"
              type="text"
              disabled={disabled}
              className={classes.textFieldSmall}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </div>

        <Grid container className={classes.submitRow}>
            <Button
              id="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<SaveIcon />}
              >
              Grabar
            </Button>
        </Grid>

      </form>

    </Container>
  )
}

export default DepositCRUD
