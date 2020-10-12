import React from "react";
import { withRouter } from "react-router";

import '../css/error.css';

const Error = ({ history }) => {
    const volver=()=>{
        history.push("/");
    }
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <div className="mdl-layout__content">
          <div style={{ height:'15%' }}></div>
            <div className="mdl-grid">

              <div className="mdl-layout-spacer"></div>
              <div className="mdl-cell mdl-cell--4-col">

                <div className="error-card mdl-card mdl-shadow--2dp">
                  <div className="mdl-card__title mdl-card--expand"></div>
                  <div className="mdl-card__supporting-text">
                    <h5 className="">Página no encontrada</h5>
                  </div>
                  <div className="mdl-card__actions">
                    <button className="mdl-cell mdl-cell--12-col mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={()=>volver()} type="primary">Volver</button>
                  </div>
                </div>
              </div>
              <div className="mdl-layout-spacer"></div>
            </div>
          </div>
        </div>
    );
};
export default withRouter(Error);
