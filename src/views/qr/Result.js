import React, { useState, useEffect } from "react";
import firebaseConfig from '../../firebaseConfig'

import Loading from '../../components/Loading'
import '../../css/scanner.css'
import Footer from './Footer'
import { dateFormat } from '../../libs/date'

// Material UI
import Grid from '@material-ui/core/Grid';

const Result = ( {id, reset} ) => {

  const getLabel = async() => {
    const db = firebaseConfig.firestore()
    const query = await db.collection('store').doc(id)
    query.onSnapshot( (querySnapshot) => {
      // console.log( querySnapshot.data() )
      let data = querySnapshot.data()
      setLabel( data )
      // setLable( { 'kg': data.kg} )
    })
  }

  const [label, setLabel] = useState({})

  useEffect(() => {
    getLabel(id) // eslint-disable-next-line
  }, [])

  return (
    <div>
      { ( Object.keys(label).length !== 0 )
        ?
          <React.Fragment>
              <h2 className="product">{label.product.name}</h2>
              <h3 className='provider'>{label.provider.name}</h3>

              <Grid container>
                <Grid item xs={12} className='cardRow'>
                  <Grid container alignItems="center">
                    <Grid item xs={6} sm={6} className='cardItem'>
                      <label className='cardLabel' htmlFor='dateIn'>Ingreso</label>
                      <div className='cardData' id='dateIn'>{ dateFormat(label.dateIn) }</div>
                    </Grid>
                    <Grid item xs={6} sm={6} className='cardItem'>
                      <label className='cardLabel' htmlFor='dateExpiration'>Expira</label>
                      <div className='cardData' id='dateExpiration'>{ dateFormat(label.dateExpiration) }</div>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} className='cardRow'>
                  <Grid container alignItems="center">
                    <Grid item xs={4} sm={4} className='cardItem'>
                      <label className='cardLabel' htmlFor='kg'>Kg</label>
                      <div className='cardDataSmall' id='kg'>{ label.kg }</div>
                    </Grid>
                    <Grid item xs={4} sm={4} className='cardItem'>
                      <label className='cardLabel' htmlFor='lote'>Lote</label>
                      <div className='cardDataSmall' id='lote'>{ label.lote }</div>
                    </Grid>
                    <Grid item xs={4} sm={4} className='cardItem'>
                      <label className='cardLabel' htmlFor='set'>Set</label>
                      <div className='cardDataSmall' id='set'>{ label.set }</div>
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>

            <Footer reset={reset} />
          </React.Fragment>
        :
          <Loading />
      }
    </div>
  )
}

export default Result
