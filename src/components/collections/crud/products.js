import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import firebaseConfig from '../../../firebaseConfig'

// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Icon from '@material-ui/core/Icon';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import useStyles from './style'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const formProduct = (classes, handleSubmit, handleChange, name) => {

  return(
    <Container className={ classes.container }>

      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} className={classes.formRow}>
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


export const ProductAdd = () => {
  const classes = useStyles()
  const history = useHistory()
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

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent Default actin

    setProduct({ name:'' })
    // Paso los datos al componente padre para guardarlos
    addProduct(product)

    // Go tabla
    history.push("/products");
  }

  // Se ejecuanta cuando el usuario escribe en el input
  const handleChange = (e) => {
    // Usamos destructuring para escribir el state
    setProduct({ ...product, [e.target.name]:e.target.value })
  }
  const { name } = product

  return ( formProduct(classes, handleSubmit, handleChange, name) )
}

export const ProductDelete = () => {
  const classes = useStyles()
  const history = useHistory();
  const { id } = useParams()

  const [product, setProduct] = useState({})
  const db = firebaseConfig.firestore()

  const getProduct = async() => {
    const query = await db.collection('products').doc(id)
    query.onSnapshot( (querySnapshot) => {
      let data = querySnapshot.data()
      setProduct( data )
    })
  }

  const handleClick = (e) => {
    e.preventDefault()
    db.collection('products').doc(id).delete()
    history.push("/products");
  }

  useEffect( () => {
    getProduct() // eslint-disable-next-line
  },[])

  return (
    <Container className={classes.container}>
        { ( Object.keys(product).length !== 0)
          ?
            <Card className={classes.card} >
              <CardContent>
                <Typography className={classes.cardTitle}>{product.name}</Typography>
                <Typography className={classes.cardSubtitle}>¿Esta seguro que decea eliminar este producto?</Typography>
              </CardContent>

              <CardActions className={classes.cardActions}>
                <Link href="" color="inherit" onClick={handleClick}>
                  <Icon fontSize="large">delete</Icon>
                </Link>
              </CardActions>
            </Card>
          :
            <Grid container className={classes.progressContainer}>
              <CircularProgress color="secondary" className={classes.progress}/>
            </Grid>
        }
    </Container>
  )

}


export const ProductEdit = () => {
  const classes = useStyles()
  const history = useHistory()
  const { id } = useParams()

  // if (show) { var dialog = document.querySelector('dialog'); // dialog.showModal(); }

  const db = firebaseConfig.firestore()

  // Creo el state del proveedor
  const [product, setProduct] = useState({
    name: '',
  })

  const updateProduct = async (dataProduct) => {
    await db.collection('products').doc(id).update(dataProduct)
    console.log('Listo!');
  }

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent Default actin

    setProduct({ name:'' })
    // Paso los datos al componente padre para guardarlos
    updateProduct(product)

    // Go tabla
    history.push("/products");
  }

  // Se ejecuanta cuando el usuario escribe en el input
  const handleChange = (e) => {
    // Usamos destructuring para escribir el state
    setProduct({ ...product, [e.target.name]:e.target.value })
  }
  const { name } = product

  const getProduct = async() => {
    const query = await db.collection('products').doc(id)
    query.onSnapshot( (querySnapshot) => {
      let data = querySnapshot.data()
      setProduct( data )
    })
  }

  useEffect( () => {
    getProduct() // eslint-disable-next-line
  },[])

  return ( formProduct(classes, handleSubmit, handleChange, name) )
}
