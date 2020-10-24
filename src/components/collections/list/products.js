import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import firebaseConfig from '../../../firebaseConfig'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { DataGrid } from '@material-ui/data-grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

const columns = [
  { field: 'name', headerName: 'Nombre' },
]

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '3rem',
    marginBottom: '2rem',
    height: 400,
    width: '100%'
  }
}));

function ProductList() {

  const classes = useStyles()

  const [products, setProducts] = useState([])
  const field = "name";
  const db = firebaseConfig.firestore()
  const query = db.collection('products').orderBy(field)

  // Get the firsts documments in collection
  const getProducts = () => {
    // https://firebase.google.com/docs/firestore/query-data/order-limit-data
    query.onSnapshot(
      (querySnapshot) => {
        if (querySnapshot.size !== 0) {
          const docs = []
          querySnapshot.forEach((doc, i) => {
            docs.push({id:doc.id, ...doc.data()})
          });
          setProducts(docs)
        }
      }
    )
  }

  // Ejecute when the document is ready
  // https://es.reactjs.org/docs/hooks-effect.html
  useEffect( () => {
    getProducts(); // eslint-disable-next-line
  },[])


  return (
    <Container className={classes.container}>
      <DataGrid rows={ products } columns={columns} pageSize={5} />
    </Container>
  )
}

export default ProductList
