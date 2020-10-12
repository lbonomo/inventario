import React from 'react'
import { HashRouter, Route, Switch } from "react-router-dom";
// import { FirebaseDatabaseProvider } from "@react-firebase/database";


import "../../css/style.css"
import SubHeader from "../SubHeader"
import ProviderList from "../list/provider"
import ProviderCRUD from "../crud/provider"

function Providers({mensaje}) {

  return (
    <React.Fragment>
      <div className="mdl-card collections-main mdl-cell mdl-cell--12-col">

        <SubHeader />

        <HashRouter>
          <Switch>
            <Route exact path="/providers" component={ProviderList} />
            <Route exact path="/providers/add" component={ ProviderCRUD } />
          </Switch>
        </HashRouter>

      </div>
    </React.Fragment>
  )
}

export default Providers
