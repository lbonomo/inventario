import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";

import firebaseConfig from '../../../firebaseConfig'
import { dateFormat } from '../../../libs/date'

// Material UI
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles( () => ({
  toPrint: {
    display: 'flex',
    justifyContent: 'center',
  },

  label100x150: {
    flexDirection: 'column',
    display: 'flex',
    // justifyContent: 'center',
    margin: '1.5mm 3mm',
    borderRadius: '1mm',
    width: '100mm',
    height: '150mm',
    border: '1px gray dotted',
  },


  label100x100: {
    flexDirection: 'column',
    display: 'flex',
    // justifyContent: 'center',
    margin: '1.5mm 3mm',
    borderRadius: '1mm',
    width: '100mm',
    height: '100mm',
    border: '1px gray dotted',
  },

  qr80: {
    width: '80mm',
    margin: '10mm auto 0mm',
    border: 'solid 1px gray',
  },

  qr50: {
    width: '50mm',
    margin: '5mm auto 0mm',
    border: 'solid 1px gray',
  },

  id: {
    fontSize: '14px',
    width: '100%',
    textAlign: 'center',
  },

  labelData: {
    // margin: '1.5mm 3mm',
    margin: '0 auto',
    fontFamily: 'Arial',
    fontSize: '18px',
    listStyleType: 'none',
    padding: 0,
    width: '80mm',
  },

  product: {
    fontSize: '22px',
    textAlign: 'center',
    margin: '5mm auto 1mm',
    fontWeight: 700,
    // fontSize: '20px',
  },

  provider: {
    borderBottom: '1px solid grey',
    paddingBottom: '2mm',
    fontSize: '18px',
    textAlign: 'center',
    marginBottom: '3mm',
    fontWeight: 700,
  },

  row: {
    display: "flex",
    margin: '2mm auto',
  },

  cell: {
    width: '100%',
  },

  date: {
    fontWeight: 700,
  }

}))

// TODO - Ver como pasar los datos para no tener que volver a consultar el producto


function LablePrint({mensaje}) {

  const db = firebaseConfig.firestore()
  const { id } = useParams()
  const classes = useStyles()
  const [label, setLabel] = useState({})

  const getLabel = async() => {
    const query = await db.collection('labels').doc(id)
    query.onSnapshot( async(querySnapshot) => {
      let data = querySnapshot.data()
      setLabel( data )
      await window.print()
      window.close()
    })
  }

  useEffect( () => {
    getLabel() // eslint-disable-next-line
  },[])


  const url = `https://chart.googleapis.com/chart?chs=450x450&cht=qr&chl=${id}`

  return (
      <div className={ classes.toPrint }>
        <div className={ classes.label100x100 }>
          <img alt="QR Code" className={ classes.qr50 } src={url} />
            {
              ( Object.keys(label).length !== 0)
                ?
                <React.Fragment>
                  <div className={ classes.id }>{id}</div>
                  <div className={ classes.labelData }>
                    <div className={ classes.product }>{label.product.name}</div>
                    <div className={ classes.provider }>{label.provider.name}</div>
                    <div className={ classes.row }>
                      <div className={ classes.cell }>
                        In: <span className={ classes.date }>{dateFormat(label.in.date)}</span>
                      </div>
                      <div className={ classes.cell }>
                        Exp: <span className={ classes.date }>{dateFormat(label.expiry)}</span>
                      </div>
                    </div>
                    <div className={ classes.row }>
                      <div className={ classes.cell }>Kg: {label.kg}</div>
                      <div className={ classes.cell }>Lote: {label.lote}</div>
                      <div className={ classes.cell }>Set: {label.set}</div>
                    </div>
                  </div>
                </React.Fragment>
                :
                <div>loading</div>
            }
        </div>
      </div>
  )
}

export default LablePrint
