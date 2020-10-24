import React, { useEffect, useState } from 'react'
import firebaseConfig from '../../../firebaseConfig'
import "../../../css/lists.css";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { DataGrid } from '@material-ui/data-grid';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
  container: {
    marginTop: '4rem',
    marginBottom: '2rem',
    height: 400,
    width: '100%'
  },
  talbeContainer: {
    width: '95%',
    margin: '1rem auto',
  },

  table: {
    minWidth: 650,
    },

  hideLastBorder: {
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },

  actionsCell: {
    paddingLeft: '0',
    paddingRight: '0',
  }
});


const getName = (params: ValueGetterParams) => {
  return params.getValue(params.field).name
}


const dateFormat = (params: ValueGetterParams) => {
  const date = new Date(params.getValue(params.field))
  if (!isNaN(date.getTime())) {
      // Months use 0 index.
      return `${("0"+date.getDate()).slice(-2)}/${date.getMonth()+1}/${date.getFullYear()}`
  } else {
    return '-'
  }
}
const ActionsHeader = (params: ValueGetterParams) => {
  return (<Icon className='actionsHeader'>visibility</Icon>)
}

const ActionsLinks = (params: ValueGetterParams) => {

  // <Link href={`#/labels/print/${params.getValue('id')}`} target="_blank" rel="noopener noreferrer" color="inherit">
  //   <Icon color="secondary">print</Icon>
  // </Link>

  return (
    <spam>
      <Link href={`#/labels/show/${params.getValue('id')}`} color="inherit">
        <Icon className="actionLinks">visibility</Icon>
      </Link>
    </spam>
  )
}

const columns = [
  { field: 'product', headerName: 'Producto', valueGetter: getName, width: 250, sortable: false },
  { field: 'provider', headerName: 'Proveedor', valueGetter: getName, width: 250, sortable: false  },
  { field: 'dateIn', headerName: 'Ingreso', type: 'date', valueFormatter: dateFormat },
  { field: 'dateExpiration', headerName: 'Expira', type: 'date', valueFormatter: dateFormat },
  { field: 'kg', headerName: 'Kg', width: 75, type: 'number', sortable: false },
  { field: 'lote', headerName: 'Lote', width: 75, sortable: false },
  { field: 'set', headerName: 'Set', width: 75, sortable: false },
  { field: 'actions', headerName: 'Acciones', renderHeader: ActionsHeader, renderCell: ActionsLinks, width: 75, sortable: false },
]

function LabelsList() {

  const [items, setItems] = useState([])
  // Paginado
  // const limit = 5
  const field = "dateIn";

  const db = firebaseConfig.firestore()
  const query = db.collection('store').orderBy(field)

  // Get the firsts documments in collection
  const getItems = () => {
    // https://firebase.google.com/docs/firestore/query-data/order-limit-data
    query.onSnapshot( async(querySnapshot) => {
        if (querySnapshot.size !== 0) {
          const docs = []
          querySnapshot.forEach( (doc, i) => {
            let data = doc.data()
            docs.push({
              id: doc.id,
              // productName: data.product.name,
              // providerName: data.provider.name,
              // print: `href:#/labels/print/${doc.id}`,
              ...data })
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

  const classes = useStyles();

  return (
    <Container className='container'>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid rows={ items } columns={columns} pageSize={5} />
        </div>
      </div>
    </Container>
  )
}

export default LabelsList
