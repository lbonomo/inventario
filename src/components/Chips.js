import React, { useEffect, useState } from 'react'

const Chips = ({references}) => {
  // Get list of references (array of objects)
  const [chips, setChips] = useState()

  const getChips = () => {
    const docs = []
    references.forEach((doc, i) => {
      docs.push({ id:doc.id })
    });

    setChips(docs)
  }

  useEffect( () => {
    getChips(); // eslint-disable-next-line
  },[])

  return (
    <div className="chips">
      {/* chips.map( chip => ( <span className="mdl-chip" key={chip.id}><span className="mdl-chip__text">Chip</span></span>  )) */}
    </div>
  )

}

export default Chips
