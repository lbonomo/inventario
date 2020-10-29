import React from "react";

import useStyles from './style'
import DataFooter from './DataFooter'
import { dateFormat } from '../../libs/date'

import GreenCheck from '../../assets/green-check.svg';
import RedCross from '../../assets/red-cross.svg';

// Material UI
import Grid from '@material-ui/core/Grid';

const Data = ({reset, label, data, last}) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <h2 className={classes.product}>{data.product.name}</h2>
      <h3 className={classes.provider}>{data.provider.name}</h3>

      <Grid container>
        <Grid item xs={12} className={classes.cardRow}>
          <Grid container alignItems="center">
            <Grid item xs={6} sm={6} className={classes.cardItem}>
              <label className={classes.cardLabel} htmlFor='dateIn'>Ingreso</label>
              <div className={classes.cardData} id='dateIn'>{ dateFormat(data.in.date) }</div>
            </Grid>
            <Grid item xs={6} sm={6} className={classes.cardItem}>
              <label className={classes.cardLabel} htmlFor='dateExpiration'>Expira</label>
              <div className={classes.cardData} id='dateExpiration'>{ dateFormat(data.expiry) }</div>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.cardRow}>
          <Grid container alignItems="center">
            <Grid item xs={4} sm={4} className={classes.cardItem}>
              <label className={classes.cardLabel} htmlFor='kg'>Kg</label>
              <div className={classes.cardDataSmall} id='kg'>{ data.kg }</div>
            </Grid>
            <Grid item xs={4} sm={4} className={classes.cardItem}>
              <label className={classes.cardLabel} htmlFor='lote'>Lote</label>
              <div className={classes.cardDataSmall} id='lote'>{ data.lote }</div>
            </Grid>
            <Grid item xs={4} sm={4} className={classes.cardItem}>
              <label className={classes.cardLabel} htmlFor='set'>Set</label>
              <div className={classes.cardDataSmall} id='set'>{ data.set }</div>
            </Grid>
          </Grid>
        </Grid>

      </Grid>

      <Grid item xs={12} className={classes.cardRow}>
          <Grid container alignItems="center">
            {
              ( data.in.date <= last && data.out.date === "" )
                ?
                  <img className={classes.feedback} src={GreenCheck} alt="Green check" />
                :
                  <img className={classes.feedback} src={RedCross} alt="Red Cross" />
            }
          </Grid>
      </Grid>

    <DataFooter reset={reset} label={label} data={data}/>
  </React.Fragment>
  )
}

export default Data
