import React from 'react'

const Pagination = ({prevPage=null, nextPage=null}) => {

    return (
        <div className="container mdl-grid">
          <div className="mdl-layout-spacer"></div>
          <div className="mdl-cell mdl-cell-pagination mdl-cell--4-col">

            <div className="mdl-pagination">
              <div className="mdl-pagination__container">
                <div className="mdl-pagination__pages">

                  { ( prevPage === null ) ? '' :
                    <button className="mdl-button mdl-js-button mdl-button--accent mdl-button--icon" onClick={() => { prevPage() }} >
                      <i className="material-icons">keyboard_arrow_left</i>
                    </button>
                  }

                  { ( nextPage === null ) ? '' :
                    <button className="mdl-button mdl-js-button mdl-button--accent mdl-button--icon" onClick={ () => { nextPage() } }>
                      <i className="material-icons">keyboard_arrow_right</i>
                    </button>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>

    )
  }

export default Pagination
