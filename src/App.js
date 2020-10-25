import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";

// Views
import Default from "./views/Default";
import Login from "./views/Login";
import Logout from "./views/Logout";
import SignUp from "./views/SignUp";
import LostPassword from "./views/LostPassword";
import Error from "./views/Error";
import Scanner from './views/qr/Scanner'

// Label
import LablePrint from './components/collections/print/label'

// Context
import AuthContext  from "./context/AuthContext";


function App() {

  return (
    <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
      <AuthContext>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Default} />
            <Route exact path="/labels" component={Default} />
            <Route exact path="/labels/add" component={Default} />
            <Route exact path="/labels/show/:id" component={Default} />
            <Route exact path="/labels/print/:id" component={LablePrint} />
            <Route exact path="/products" component={Default} />
            <Route exact path="/products/add" component={Default} />
            <Route exact path="/providers" component={Default} />
            <Route exact path="/providers/add" component={Default} />
            <Route exact path="/scanner" component={Scanner} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/lost-password" component={LostPassword} />
            <Route component={Error} />
          </Switch>
        </HashRouter>
      </AuthContext>
  </div>
  );
}

export default App;
