import React, { useEffect, useState } from 'react'
import firebaseConfig from '../../../firebaseConfig'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PrintIcon from '@material-ui/icons/Print';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({

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

  const classes = useStyles();

  return (
    <React.Fragment>

      <div className="mdl-layout__header-row">
        {/* <span className="mdl-layout-title">Lista de productos</span> */}
      </div>

      <div className="container mdl-grid">

        <TableContainer component={Paper} className={classes.talbeContainer}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Producto</TableCell>
                    <TableCell align="center">Proveedor</TableCell>
                    <TableCell align="center">Ingreso</TableCell>
                    <TableCell align="center">Expira</TableCell>
                    <TableCell align="center">Kg</TableCell>
                    <TableCell align="center">Lote</TableCell>
                    <TableCell align="center">Set</TableCell>
                    <TableCell align="center" className={classes.actions}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map(item => (
                    <TableRow key={item.id} className={classes.hideLastBorder}>
                      <TableCell align="center">
                        <Link href={`#/labels/show/${item.id}`} color="inherit">{item.product.name}</Link>
                      </TableCell>
                      <TableCell align="center">{item.provider.name}</TableCell>
                      <TableCell align="center">{item.dateIn}</TableCell>
                      <TableCell align="center">{item.dateExpiration}</TableCell>
                      <TableCell align="center">{item.kg}</TableCell>
                      <TableCell align="center">{item.lote}</TableCell>
                      <TableCell align="center">{item.set}</TableCell>
                      <TableCell align="center" className={classes.actionsCell}>
                        <Link href={`#/labels/print/${item.id}`} target="_blank" rel="noopener noreferrer" color="inherit">
                          <PrintIcon />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

      </div>

    </React.Fragment>
  )
}

export default LabelsList
