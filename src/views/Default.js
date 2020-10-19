import React, { useEffect, useContext ,useState} from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

// import { withRouter } from "react-router";

import { Auth } from "../context/AuthContext";
// Context
import AuthContext  from "../context/AuthContext";

import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

import Dashboard from "../components/Dashboard"
import Scanner from "../components/Scanner"

// Collections
import Deposit from "../components/collections/Deposit"
import Products from "../components/collections/Products"
import Providers from "../components/collections/Providers"


function Default({history}) {

  const { user } = useContext(Auth);
  const [name, setName] = useState(null)


  useEffect(() => {
      if (user===null) {
          history.push("/login");
      }
      user?user.displayName?setName(user.displayName):setName(user.email):setName(null)

  }, [history, user]);

  // https://getmdl.io/templates/dashboard/index.html
  return (
      <AuthContext>
        <Header name = {name} />
        <Sidebar />
        <main className="mdl-layout__content mdl-color--grey-100">
          <div className="mdl-grid demo-content">
            <HashRouter>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/deposit" component={Deposit} />
                <Route exact path="/deposit/add" component={Deposit} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/products/add" component={Products} />
                <Route exact path="/providers" component={Providers} />
                <Route exact path="/providers/add" component={Providers} />
                <Route exact path="/scanner" component={Scanner} />
              </Switch>
            </HashRouter>
          </div>
        </main>
    </AuthContext>
  );
}

// export default withRouter(Default);
export default Default;