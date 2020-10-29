import React, { useState, useEffect } from "react";
import firebaseConfig from '../../firebaseConfig'

import Loading from '../../components/Loading'
import Data from './Data'
import NoData from './NoData'


const Result = ( {id, reset} ) => {
  const [data, setData] = useState({})
  const [last, setLast] = useState(null)
  const [read, setRead] = useState(false)
  const db = firebaseConfig.firestore()

  const getData = async() => {
    const query = await db.collection('labels').doc(id)
    query.onSnapshot( (querySnapshot) => {
      // console.log( querySnapshot.data() )
      let result = querySnapshot.data()
      console.log(result)
      if (!result) {
        setRead(true)
      } else {
        setRead(true)
        setData( result )
      }
    })
  }

  const getLast = async() => {
    // obtengo la fecha del primer producto cargado
    console.log(data.in.date)
    const query = await db.collection('labels')
      .where('product.id', '==', data.product.id)
      .where('out.date', '==', "")
      .where('in.date', '<=', data.in.date)
      .limit(1)
    query.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        setLast(doc.data().in.date)
      });
    }).catch(
      setLast(data.in.date)
    );
  }

  useEffect(() => {
    if ( Object.keys(data).length >= 1 ) {
      getLast() // eslint-disable-next-line
    }
  }, [data])

  useEffect(() => {
    getData() // eslint-disable-next-line
  }, [])

  return (
    <div>
      { ( Object.keys(data).length !== 0 )
        ?
          <Data reset={reset} label={id} data={data} last={last} />
        :
        ( read )
          ?
            <NoData reset={reset} />
          :
            <Loading />
      }
    </div>
  )
}

export default Result
