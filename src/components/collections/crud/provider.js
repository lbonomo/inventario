import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import firebaseConfig from '../../../firebaseConfig'

// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import useStyles from './style'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const formProvider = (classes, handleSubmit, handleChange, name) => {

  return(
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

export const ProviderAdd = () => {
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



  return ( formProvider(classes, handleSubmit, handleChange, name) )
}

export const ProviderDelete = () => {
  const classes = useStyles()
  const history = useHistory();
  const { id } = useParams()

  const [provider, setProvider] = useState({})
  const db = firebaseConfig.firestore()

  const getProvider = async() => {
    const query = await db.collection('providers').doc(id)
    query.onSnapshot( (querySnapshot) => {
      let data = querySnapshot.data()
      setProvider( data )
    })
  }

  const handleClick = (e) => {
    e.preventDefault()
    db.collection('providers').doc(id).delete()
    history.push("/providers");
  }

  useEffect( () => {
    getProvider() // eslint-disable-next-line
  },[])

  return (
    <Container className={classes.container}>
        { ( Object.keys(provider).length !== 0)
          ?
            <Card className={classes.card} >
              <CardContent>
                <Typography className={classes.cardTitle}>{provider.name}</Typography>
                <Typography className={classes.cardSubtitle}>¿Esta seguro que deceas eliminar este proveedor?</Typography>
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


export const ProviderEdit = () => {
  const classes = useStyles()
  const history = useHistory()
  const { id } = useParams()

  // if (show) { var dialog = document.querySelector('dialog'); // dialog.showModal(); }

  const db = firebaseConfig.firestore()

  // Creo el state del proveedor
  const [provider, setProvider] = useState({
    name: '',
  })

  const updateProvider = async (dataProvider) => {
    await db.collection('providers').doc(id).update(dataProvider)
    console.log('Listo!');
  }

  const handleSubmit = (e) => {
    e.preventDefault() // Prevent Default actin

    setProvider({ name:'' })
    // Paso los datos al componente padre para guardarlos
    updateProvider(provider)

    // Go tabla
    history.push("/providers");
  }

  // Se ejecuanta cuando el usuario escribe en el input
  const handleChange = (e) => {
    // Usamos destructuring para escribir el state
    setProvider({ ...provider, [e.target.name]:e.target.value })
  }
  const { name } = provider

  const getProvider = async() => {
    const query = await db.collection('providers').doc(id)
    query.onSnapshot( (querySnapshot) => {
      let data = querySnapshot.data()
      setProvider( data )
    })
  }

  useEffect( () => {
    getProvider() // eslint-disable-next-line
  },[])

  return ( formProvider(classes, handleSubmit, handleChange, name) )
}
