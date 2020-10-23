import React from 'react'
import { HashRouter, Route, Switch } from "react-router-dom";

import CollectionBar from "../CollectionBar"
import DepositList from "./list/deposit"
import DepositCRUD from "./crud/deposit"

function Deposit({mensaje}) {
    return (
      <React.Fragment>
        <React.Fragment>
          <div className="mdl-card collections-main mdl-cell mdl-cell--12-col">

            <CollectionBar colection='deposit'/>

            <HashRouter>
              <Switch>
                <Route exact path="/deposit" component={DepositList} />
                {/*
                  TODO - Ver de mejorar la definicion de las rutas
                  actualmente es necesario definirlas en App.js y views/Default.js
                   */}
                <Route exact path="/deposit/add" component={ DepositCRUD } />
              </Switch>
            </HashRouter>

          </div>
        </React.Fragment>
      </React.Fragment>
    )
}

export default Deposit
