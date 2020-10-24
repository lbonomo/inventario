import React from 'react';
import "../css/style.css";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

// Estilos
const useStyles = makeStyles(() => ({
  progressContainer: {
    marginTop: '20%'
  },
  progress: {
    margin: 'auto'
  },
  container: {
    marginTop:'2rem',
  },
}));

function Loading() {
  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <Grid container className={classes.progressContainer}>
        <CircularProgress color="secondary" className={classes.progress}/>
      </Grid>
    </Container>
  )
}

export default Loading;
