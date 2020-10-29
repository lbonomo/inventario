import React, { useEffect, useState } from 'react'
import firebaseConfig from '../../../firebaseConfig'
import "../../../css/lists.css";

// Material UI
import Link from '@material-ui/core/Link';
import { DataGrid } from '@material-ui/data-grid';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import { dateFormat } from '../../../libs/date'

const getName = (params: ValueGetterParams) => {
  return params.getValue(params.field).name
}

const getDate = (params: ValueGetterParams) => {
  return dateFormat(params.getValue(params.field).date)
}

const eFormat = (params: ValueGetterParams) => {
  return dateFormat(params.getValue(params.field))
}

const ActionsHeader = (params: ValueGetterParams) => {
  return (<Icon className='actionsHeader'>visibility</Icon>)
}

const ActionsLinks = (params: ValueGetterParams) => {

  // <Link href={`#/labels/print/${params.getValue('id')}`} target="_blank" rel="noopener noreferrer" color="inherit">
  //   <Icon color="secondary">print</Icon>
  // </Link>

  return (
    <span>
      <Link href={`#/labels/show/${params.getValue('id')}`} color="inherit">
        <Icon className="actionLinks">visibility</Icon>
      </Link>
    </span>
  )
}

const columns = [
  { field: 'product', headerName: 'Producto', valueGetter: getName, width: 200, sortable: false },
  { field: 'provider', headerName: 'Proveedor', valueGetter: getName, width: 200, sortable: false  },
  { field: 'in', headerName: 'Ingreso', type: 'date', valueGetter: getDate },
  { field: 'out', headerName: 'Egreso', type: 'date', valueGetter: getDate },
  { field: 'expiry', headerName: 'Expira', type: 'date', valueFormatter: eFormat },
  { field: 'kg', headerName: 'Kg', width: 75, type: 'number', sortable: false },
  { field: 'lote', headerName: 'Lote', width: 75, sortable: false },
  { field: 'set', headerName: 'Set', width: 75, sortable: false },
  { field: 'actions', headerName: 'Acciones', renderHeader: ActionsHeader, renderCell: ActionsLinks, width: 75, sortable: false },
]

function LabelsList() {

  const [items, setItems] = useState([])
  // Paginado
  // const limit = 5
  const field = "in";

  const db = firebaseConfig.firestore()
  const query = db.collection('labels').orderBy(field)

  // Get the firsts documments in collection
  const getItems = () => {
    // https://firebase.google.com/docs/firestore/query-data/order-limit-data
    query.onSnapshot( async(querySnapshot) => {
        if (querySnapshot.size !== 0) {
          const docs = []
          querySnapshot.forEach( (doc, i) => {
            let data = doc.data()
            docs.push({ id: doc.id, ...data })
          });
          setItems(docs)
        }
      }
    )
  }

  // Ejecute when the document is ready
  // https://es.reactjs.org/docs/hooks-effect.html
  useEffect( () => {
    getItems(); // eslint-disable-next-line
  },[])

  return (
    <Container className='container'>
      <DataGrid rows={ items } columns={columns} pageSize={5} />
    </Container>
  )
}

export default LabelsList
