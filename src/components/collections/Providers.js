import React from 'react'
import { HashRouter, Route, Switch } from "react-router-dom";
// import { FirebaseDatabaseProvider } from "@react-firebase/database";


import "../../css/style.css"
import CollectionBar from "../CollectionBar"
import ProviderList from "./list/provider"
import { ProviderAdd, ProviderEdit, ProviderDelete} from "./crud/provider"

function Providers({mensaje}) {

  return (
    <React.Fragment>
      <div className="mdl-card collections-main mdl-cell mdl-cell--12-col">
        <CollectionBar colection='providers'/>

        <HashRouter>
          <Switch>
            <Route exact path="/providers" component={ProviderList} />
            <Route exact path="/providers/add" component={ ProviderAdd } />
            <Route exact path="/providers/edit/:id" component={ ProviderEdit } />
            <Route exact path="/providers/delete/:id" component={ ProviderDelete } />
          </Switch>
        </HashRouter>

      </div>
    </React.Fragment>
  )
}

export default Providers
