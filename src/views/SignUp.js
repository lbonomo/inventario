import React from "react";
import { withRouter } from "react-router";

import '../css/login.css';


function SingUp({history}) {

   return (
     <div className="mdl-layout mdl-js-layout">
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
                  <form action="#">
                    <div className="mdl-textfield">
                      <input className="mdl-textfield__input" type="text" id="username" placeholder="Email" disabled/>
                    </div>
                  </form>
                </div>
                <div className="mdl-card__actions">
                  <div className="mdl-grid">
                    <div className="mdl-layout-spacer"></div>
                    <button className="mdl-cell mdl-cell--12-col mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Solicitar usuario</button>
                  </div>
                </div>
              </div>
           </div>
           {/* Login Card */}
           <div className="mdl-layout-spacer"></div>
         </div>
       </div>
     </div>
   );
}

export default withRouter(SingUp);
