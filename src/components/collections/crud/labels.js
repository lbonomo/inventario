import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import firebaseConfig from '../../../firebaseConfig'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
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

const LabelsCRUD = () => {
  const classes = useStyles();
  const history = useHistory();

  const db = firebaseConfig.firestore()

  // Creo el state del proveedor
  const [item, setItem] = useState({})
  // const [product, setProduct] = useState('')
  const [disabled, setDisabled] = useState(true)

  // Estate error
  // const [error, setError ] = useState(false)

  const saveItem = async() => {
    console.log('Guardando...')
    await db.collection('store').doc().set(
      {
        'product': item.product,
        'provider': item.provider,
        'dateIn': item.dateIn,
        'dateExpiration': item.dateExpiration,
        'kg': item.kg,
        'lote': item.lote,
        'set': item.set,
      }
    )
  }

  const handleSubmit = async(e) => {
    console.log("Submit...")
    e.preventDefault() // Prevent Default actin
    // setError(false) // Reseteo el valor error
    await saveItem()
    history.push("/label");
  }

  // Se ejecuanta cuando el usuario escribe en el input
  const handleChange = (e) => {
    // Usamos destructuring para escribir el state
    setItem({ ...item, [e.target.name]:e.target.value })
  }

  return (
    <Container className={classes.container}>

      <form onSubmit={handleSubmit}>
        <div className="container mdl-grid">
          <Grid container justify="space-around">
            {/* Search product */}
            <FormControl id="fcProduct" className={classes.textField} fullWidth>
              <SearchProduct item={item} setItem={setItem} setDisabled={setDisabled}/>
            </FormControl>

            <FormControl id="fcProvider" className={classes.textField} disabled={disabled} fullWidth>
              <SearchProvider item={item} setItem={setItem} disabled={disabled}/>
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
              type="submit"
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

export default LabelsCRUD
