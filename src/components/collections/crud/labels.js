import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import firebaseConfig from '../../../firebaseConfig'
import { Auth } from '../../../context/AuthContext';

// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import SaveIcon from '@material-ui/icons/Save';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// Propios
import SearchProduct from '../../SearchProduct'
import SearchProvider from '../../SearchProvider'
import useStyles from './style'

const LabelsCRUD = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useContext(Auth)

  const db = firebaseConfig.firestore()

  // Creo el state del proveedor
  const [item, setItem] = useState({})
  // const [product, setProduct] = useState('')
  const [disabled, setDisabled] = useState(true)

  // Estate error
  // const [error, setError ] = useState(false)

  const saveItem = async() => {
    console.log('Guardando...')
    // TODO - Validar todos los campos.
    await db.collection('labels').doc().set(
      {
        'product': item.product,
        'provider': item.provider,
        'in': {
          'user': user.email,
          'date': item.dateIn
        },
        'out': {
          'user': '',
          'date': ''
        },
        'expiry': item.dateExpiration,
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
    history.push("/labels");
  }

  // Se ejecuanta cuando el usuario escribe en el input
  const handleChange = (e) => {
    // Usamos destructuring para escribir el state
    setItem({ ...item, [e.target.name]:e.target.value })
  }

  return (
    <Container className={ classes.container }>

      <form onSubmit={handleSubmit}>

        <Grid container>

          {/* Search product & provider */}
          <Grid item xs={12} className={classes.formRow}>

            <Grid container justify="space-around">

              <Grid item xs={12} sm={6} className={classes.cardItem}>
                <FormControl id="fcProduct" className={classes.textField} fullWidth>
                  <SearchProduct item={item} setItem={setItem} setDisabled={setDisabled}/>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} className={classes.cardItem}>
                <FormControl id="fcProvider" className={classes.textField} disabled={disabled} fullWidth>
                  <SearchProvider item={item} setItem={setItem} disabled={disabled}/>
                </FormControl>
              </Grid>
            </Grid>

          </Grid>

          {/* Dates */}
          <Grid item xs={12} className={classes.formRow}>
            <Grid container justify="space-around" >
              <Grid item xs={12} sm={6} className={classes.cardItem}>
                <TextField
                  required
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
              </Grid>
              <Grid item xs={12} sm={6} className={classes.cardItem}>
                <TextField
                  required
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
            </Grid>
          </Grid>
          {/* Fechas */}

          {/* Otros datos */}
          <Grid item xs={12} className={classes.formRow}>
            <Grid container justify="space-around">
              <Grid item xs={12} sm={4} className={classes.cardItem}>
                <TextField
                  required
                  id="kg"
                  name="kg"
                  value={item.kg}
                  onChange={handleChange}
                  label="Kg"
                  type="number"
                  disabled={disabled}
                  className={classes.textField}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4} className={classes.cardItem}>
                <TextField
                  required
                  id="lote"
                  name="lote"
                  value={item.lote}
                  onChange={handleChange}
                  label="Lote"
                  type="text"
                  disabled={disabled}
                  className={classes.textField}
                  InputLabelProps={{ shrink: true }}
                  />
              </Grid>
              <Grid item xs={12} sm={4} className={classes.cardItem}>
                <TextField
                  required
                  id="set"
                  name="set"
                  value={item.set}
                  onChange={handleChange}
                  label="Set"
                  type="text"
                  disabled={disabled}
                  className={classes.textField}
                  InputLabelProps={{ shrink: true }}
                  />
              </Grid>
            </Grid>
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

export default LabelsCRUD
