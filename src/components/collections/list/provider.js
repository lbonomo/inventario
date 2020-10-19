import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import Pagination from '../../Pagination'
import firebaseConfig from '../../../firebaseConfig'

function ProviderList() {

  const [providers, setProviders] = useState([])
  // Paginado
  const [lastVisible, setLastVisible] = useState([])
  const [firstVisible, setFirstVisible] = useState([])
  const [first, setFirst] = useState([])
  const [last, setLast] = useState([])
  const limit = 5
  const field = "name";

  const db = firebaseConfig.firestore()
  const query = db.collection('providers').orderBy(field)

  // Set values of first and last document (for pagination)
  const Visibles = (docs) => {
    setFirstVisible(docs[0])
    setLastVisible(docs[docs.length-1])
    isLast(docs[(docs.length - 1)])
  }

  // Set the last object in the collection (for pagination)
  const isLast = (doc) => {
    query.startAfter(doc[field]).limit(1).get().then(
      r => { if ( r.size === 0 ) { setLast(doc)  } } )
  }

  // Execute when the user click ">" (for pagination)
  const nextPage = () => {
    query.startAfter(lastVisible[field]).limit(limit).onSnapshot(
      (querySnapshot) => {
        const docs = []
        querySnapshot.forEach((doc, i) => {
          docs.push({id:doc.id, ...doc.data()})
        });
        Visibles(docs)
        setProviders(docs)
      }
    )
  }

  // Execute when the user click "<" (for pagination)
  const prevPage = () => {
    query.endBefore(firstVisible[field]).limitToLast(limit).onSnapshot(
      (querySnapshot) => {
        const docs = []
        querySnapshot.forEach((doc, i) => {
          docs.push({id:doc.id, ...doc.data()})
        });
        Visibles(docs)
        setProviders(docs)
      }
    )
  }

  // Get the firsts documments in collection
  const getProviders = () => {
    // https://firebase.google.com/docs/firestore/query-data/order-limit-data
    query.limit(limit).onSnapshot(
      (querySnapshot) => {
        if (querySnapshot.size !== 0) {
          const docs = []
          querySnapshot.forEach((doc, i) => {
            docs.push({id:doc.id, ...doc.data()})
          });
          Visibles(docs)
          setFirst(docs[0])
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
    <React.Fragment>

      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">Lista de proveedores</span>
      </div>

      <div className="container mdl-grid">

        <ul className="mdl-list full-width">
          { providers.map(provider => (
            <li className="mdl-list__item" key={provider.id}>
                <span className="mdl-list__item-primary-content">
                  <i className="material-icons mdl-list__item-icon">store</i>
                  {provider.name}
                </span>
                <NavLink exact to={`/providers/edit/${provider.id}`} className="mdl-list__item-secondary-action">
                  <i className="material-icons">edit</i>
                </NavLink>
            </li>
          ))}
        </ul>

      </div>

      <Pagination
        prevPage = { ( first.id === firstVisible.id )  ?  null :  prevPage }
        nextPage = { ( last.id === lastVisible.id ) ? null : nextPage }
        />

    </React.Fragment>
  )
}

export default ProviderList