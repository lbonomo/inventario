import React from 'react'
import { HashRouter, Route, Switch } from "react-router-dom";

import CollectionBar from "../CollectionBar"
import LabelsList from "./list/labels"
import LabelsCRUD from "./crud/labels"
import LabelShow from "./show/label"

function Labels({mensaje}) {
    return (
      <React.Fragment>
        <React.Fragment>
          <div className="mdl-card collections-main mdl-cell mdl-cell--12-col">

            <CollectionBar colection='labels'/>

            <HashRouter>
              <Switch>
                <Route exact path="/labels" component={ LabelsList } />
                {/*
                  TODO - Ver de mejorar la definicion de las rutas
                  actualmente es necesario definirlas en App.js y views/Default.js
                   */}
                <Route exact path="/labels/add" component={ LabelsCRUD } />

                <Route exact path="/labels/show/:id" component={ LabelShow } />
              </Switch>
            </HashRouter>

          </div>
        </React.Fragment>
      </React.Fragment>
    )
}

export default Labels
