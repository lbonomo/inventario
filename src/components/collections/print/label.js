import React from 'react'
import { useParams } from "react-router";

import '../../../css/print.css';

function LablePrint({mensaje}) {

  const { id } = useParams()

  const url = `https://chart.googleapis.com/chart?chs=450x450&cht=qr&chl=${id}`

  const handleOnLoad = async (e) => {
    e.preventDefault()
    await window.print()
    window.close()
  }

  return (
      <div className="to-print">
        <div className="label-100x150">
          <img id="qr" src={url} onLoad={handleOnLoad} />
        </div>
      </div>
  )
}

export default LablePrint
