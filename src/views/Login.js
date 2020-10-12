import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

import '../css/login.css';
import firebaseConfig from "../firebaseConfig";
import { Auth } from "../context/AuthContext";
// import Errors from '../components/Errors'

const Login = ({history}) => {

  // const [signup, setSignup] = useState(false)
  const { user } = useContext(Auth)
  const [error, setError] = useState('')

    useEffect(() => {
        if (user) {
            history.push("/");
        }
    }, [history, user]);


  const EmailAndPassword = async e => {
    e.preventDefault();
    const { username, password } = e.target.elements;

    await firebaseConfig
        .auth()
        .signInWithEmailAndPassword(username.value, password.value)
        .then(result => {
            console.log(result);
            history.push("/");
        })
        .catch(error => {
            setError(error.message)
        });

    };


   return (
     <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
       <div className="mdl-layout__content">
         <div style={{ height:'15%' }}></div>
         <div className="mdl-grid">
           <div className="mdl-layout-spacer"></div>
           <div className="mdl-cell mdl-cell--4-col">
             {/* Login Card */}
             <form onSubmit={EmailAndPassword}>
               <div className="mdl-card mdl-shadow--6dp">
                 <div className="mdl-card__title ">
    		             <h2 className="mdl-card__title-text">Inventario</h2>
    	            </div>
                  <div className="mdl-card__supporting-text ">
                      <div> { error } </div>
                      <div className="mdl-textfield">
                        <input
                          className="mdl-textfield__input"
                          type="text"
                          id="username"
                          name="username"
                          placeholder="Username"/>
                        {/* <label className="mdl-textfield__label" htmlFor="username">Username</label> */}
                      </div>
                      <div className="mdl-textfield">
                        <input
                          className="mdl-textfield__input"
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Password"/>
                        {/* <label className="mdl-textfield__label" htmlFor="password">Password</label> */}
                      </div>

                  </div>
                  <div className="mdl-card__actions">
                    <div className="mdl-grid">
                      <button type="submit" className="mdl-cell mdl-cell--12-col mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Ingresar</button>
                    </div>
                    <div className="mdl-grid loggin-actions">
                      <div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
                        <NavLink exact to="/signup/" className="small-link disabled">Solicitar cuenta</NavLink>
                      </div>
                      <div className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
                        <NavLink exact to="/lost-password/" className="small-link disabled">Recuperar contraseña</NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              {/* Login Card */}
           </div>
           <div className="mdl-layout-spacer"></div>
         </div>
       </div>
     </div>
   );
}

// export default withRouter(Login);
export default Login;
