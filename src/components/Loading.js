import React from 'react';
import "../css/style.css";

function Loading() {
   return (
     <div className="mdl-layout">
       <div className="mdl-layout__content">
         <div style={{ height:'30%' }}></div>
         <div className="mdl-grid">
           <div className="mdl-layout-spacer"></div>
           <div className="mdl-cell mdl-cell--4-col">
             <p className="text-centre">Loading</p>
           </div>
           <div className="mdl-layout-spacer"></div>
         </div>

         <div className="mdl-grid">
           <div className="mdl-layout-spacer"></div>
           <div className="mdl-cell mdl-cell--4-col text-centre">
             <div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
           </div>
           <div className="mdl-layout-spacer"></div>
         </div>

      </div>

    </div>
   );
}

export default Loading;
