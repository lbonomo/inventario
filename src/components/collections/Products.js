import React from 'react'
import { HashRouter, Route, Switch } from "react-router-dom";

import "../../css/style.css"
import CollectionBar from "../CollectionBar"
import ProductList from "./list/products"
import ProductCRUD from "./crud/products"

function Products({mensaje}) {
    return (
      <React.Fragment>
        <div className="mdl-card collections-main mdl-cell mdl-cell--12-col">

          <CollectionBar colection='products'/>

          <HashRouter>
            <Switch>
              <Route exact path="/products" component={ProductList} />
              {/*
                TODO - Ver de mejorar la definicion de las rutas
                actualmente es necesario definirlas en App.js y views/Default.js
                 */}
              <Route exact path="/products/add" component={ ProductCRUD } />
            </Switch>
          </HashRouter>

        </div>
      </React.Fragment>
    )
}

export default Products
