import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import firebaseConfig from '../../../firebaseConfig'

// Material UI
import Grid from '@material-ui/core/Grid';
import { DataGrid } from '@material-ui/data-grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

const columns = [
  { field: 'name', headerName: 'Nombre', width: 300 },
]


function ProviderList() {

  const [providers, setProviders] = useState([])
  const field = "name";

  const db = firebaseConfig.firestore()
  const query = db.collection('providers').orderBy(field)

  // Get the firsts documments in collection
  const getProviders = () => {
    // https://firebase.google.com/docs/firestore/query-data/order-limit-data
    query.onSnapshot(
      (querySnapshot) => {
        if (querySnapshot.size !== 0) {
          const docs = []
          querySnapshot.forEach((doc, i) => {
            docs.push({id:doc.id, ...doc.data()})
          });
          setProviders(docs)
        }
      }
    )
  }

  // Ejecute when the document is ready
  // https://es.reactjs.org/docs/hooks-effect.html
  useEffect( () => {
    getProviders(); // eslint-disable-next-line
  },[])

  return (
    <Container className='container'>
      <DataGrid rows={ providers } columns={columns} pageSize={5} />
    </Container>
  )
}

export default ProviderList
