import React, { useContext, useEffect } from "react";
// import { withRouter } from "react-router";

import '../css/login.css';
import firebaseConfig from "../firebaseConfig";
import { Auth } from "../context/AuthContext";
// import Errors from '../components/Errors'

const Logout = ({history}) => {

  const { user } = useContext(Auth);
  console.log(user)

  useEffect( () => {
      if (user) {
        firebaseConfig
            .auth()
            .signOut()
            .then(result => {
                console.log(result);
                history.push("/login");
            })
            .catch(error => {
                // setError(error.message)
            });
      }
    }, [history, user]);

   return (
     <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
       <div className="mdl-layout__content">
         <div style={{ height:'15%' }}></div>
         <div className="mdl-grid">
           <div className="mdl-layout-spacer"></div>
           <div className="mdl-cell mdl-cell--4-col">
             {/* Login Card */}

               <div className="mdl-card mdl-shadow--6dp">
                 <div className="mdl-card__title ">
    		             <h2 className="mdl-card__title-text">Inventario</h2>
    	            </div>
                  <div className="mdl-card__supporting-text">


                  </div>
                  <div className="mdl-card__actions">
                    <div className="mdl-grid">
                      <button type="submit" className="mdl-cell mdl-cell--12-col mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Ingresar</button>
                    </div>
                    <div className="mdl-grid loggin-actions">
                      <div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
                        <a href="/signup/" className="small-link disabled">Solicitar cuenta</a>
                      </div>
                      <div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
                        <a href="/lost-password/" className="small-link disabled">Recuperar contraseña</a>
                      </div>
                    </div>
                  </div>
                </div>

              {/* Login Card */}
           </div>
           <div className="mdl-layout-spacer"></div>
         </div>
       </div>
     </div>
   );
}

// export default withRouter(Login);
export default Logout;
