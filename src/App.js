import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";


// Views
import Default from "./views/Default";
import Login from "./views/Login";
import Logout from "./views/Logout";
import SignUp from "./views/SignUp";
import LostPassword from "./views/LostPassword";
import Error from "./views/Error";

// Context
import AuthContext  from "./context/AuthContext";


function App() {


  return (
    <AuthContext>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Default} />
          <Route exact path="/deposit" component={Default} />
          <Route exact path="/products" component={Default} />
          <Route exact path="/providers" component={Default} />
          <Route exact path="/providers/add" component={Default} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/lost-password" component={LostPassword} />
          <Route component={Error} />
        </Switch>
      </HashRouter>
    </AuthContext>
  );
}

export default App;
