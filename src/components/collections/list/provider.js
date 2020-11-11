import React, { useEffect, useState } from 'react'
import firebaseConfig from '../../../firebaseConfig'

// Material UI
import { DataGrid } from '@material-ui/data-grid';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';

const ActionsHeader = (params: ValueGetterParams) => {
  return (
    <span className='actionsHeader'>
      <Icon>edit</Icon>
      <Icon>delete</Icon>
    </span>
  )
}

const ActionsLinks = (params: ValueGetterParams) => {

  return (
    <span className="actionLinks">
      <Link href={`#/providers/edit/${params.getValue('id')}`} color="inherit">
        <Icon>edit</Icon>
      </Link>
      <Link href={`#/providers/delete/${params.getValue('id')}`} color="inherit">
        <Icon>delete</Icon>
      </Link>
    </span>
  )
}

const columns = [
  { field: 'actions', headerName: 'Acciones', renderHeader: ActionsHeader, renderCell: ActionsLinks, width: 75, sortable: false },
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
