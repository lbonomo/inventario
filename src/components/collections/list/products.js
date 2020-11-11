import React, { useEffect, useState } from 'react'
import firebaseConfig from '../../../firebaseConfig'
import "../../../css/lists.css";

// Material UI
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import { DataGrid } from '@material-ui/data-grid';
import Container from '@material-ui/core/Container';


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
      <Link href={`#/products/edit/${params.getValue('id')}`} color="inherit">
        <Icon>edit</Icon>
      </Link>
      <Link href={`#/products/delete/${params.getValue('id')}`} color="inherit">
        <Icon>delete</Icon>
      </Link>
    </span>
  )
}

const columns = [
  { field: 'actions', headerName: 'Acciones', renderHeader: ActionsHeader, renderCell: ActionsLinks, width: 75, sortable: false },
  { field: 'name', headerName: 'Nombre', width: 300},
]

function ProductList() {
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
    <Container className='container'>
      <DataGrid rows={ products } columns={columns} pageSize={5} />
    </Container>
  )
}

export default ProductList
