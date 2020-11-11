import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import firebaseConfig from '../../../firebaseConfig'
import { dateFormat } from '../../../libs/date'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import PrintIcon from '@material-ui/icons/Print';
import Link from '@material-ui/core/Link';

// Estilos
const useStyles = makeStyles(() => ({
  card: {
    marginTop: '3rem',
    marginBottom: '2rem'
  },

  cardTitle: {
    fontSize: '1.6rem',
    textAlign: 'center',
  },

  cardSubtitle: {
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: '300',
    marginBottom: '2rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid grey',
  },

  cardRow: {
    marginBottom: '2rem',
    textAlign: 'center',
  },

  cardLabel: {
    fontWeight: '300',
    fontSize: '1rem'
  },

  cardData: {
    marginTop: '0.2rem',
  },

  cardActions: {
    margin: '1rem',
    flexDirection: 'row-reverse',
  },

  progressContainer: {
    marginTop: '3rem'
  },

  progress: {
    margin: 'auto'
  },

  container: {
    marginTop:'2rem',
  },
}));

function LabelShow() {
  const { id } = useParams()
  const classes = useStyles()
  const [label, setLabel] = useState({})
  const db = firebaseConfig.firestore()

  const getLabel = async() => {
    const query = await db.collection('labels').doc(id)
    query.onSnapshot( (querySnapshot) => {
      console.log( querySnapshot.data() )
      let data = querySnapshot.data()
      setLabel( data )
    })
  }

  useEffect( () => {
    getLabel() // eslint-disable-next-line
  },[])

  return (
    <Container className={classes.container}>
    {
      ( Object.keys(label).length !== 0)
        ?
        <Card className={classes.card} >
          <CardContent>
            <Typography className={classes.cardTitle}>{label.product.name}</Typography>
            <Typography className={classes.cardSubtitle}>{label.provider.name}</Typography>

            <Grid container>
              <Grid item xs={12} className={classes.cardRow}>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={4} className={classes.cardItem}>
                    <label className={classes.cardLabel} htmlFor='dateIn'>Ingreso</label>
                    <div className={classes.cardData} id='dateIn'>{ dateFormat(label.in.date) }</div>
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.cardItem}>
                    <label className={classes.cardLabel} htmlFor='OutDate'>Egreso</label>
                    <div className={classes.cardData} id='OutDate'>{ dateFormat(label.out.date) }</div>
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.cardItem}>
                    <label className={classes.cardLabel} htmlFor='dateExpiration'>Expira</label>
                    <div className={classes.cardData} id='dateExpiration'>{ dateFormat(label.expiry) }</div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} className={classes.cardRow}>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={4} className={classes.cardItem}>
                    <label className={classes.cardLabel} htmlFor='kg'>Kg</label>
                    <div className={classes.cardData} id='kg'>{ label.kg }</div>
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.cardItem}>
                    <label className={classes.cardLabel} htmlFor='lote'>Lote</label>
                    <div className={classes.cardData} id='lote'>{ label.lote }</div>
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.cardItem}>
                    <label className={classes.cardLabel} htmlFor='set'>Set</label>
                    <div className={classes.cardData} id='set'>{ label.set }</div>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>

          </CardContent>

          <CardActions className={classes.cardActions}>
            <Link href={`#/labels/print/${id}`} color="inherit" target="_blank" rel="noopener noreferrer">
              <PrintIcon fontSize="large"/>
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

export default LabelShow
