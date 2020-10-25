import React, { useEffect, useState } from 'react'
import firebaseConfig from '../../../firebaseConfig'
import "../../../css/lists.css";

// Material UI
import { DataGrid } from '@material-ui/data-grid';
import Container from '@material-ui/core/Container';

const columns = [
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
