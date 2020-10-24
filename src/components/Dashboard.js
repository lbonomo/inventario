import React from 'react'
import { useHistory } from "react-router-dom";

function Dashboard({mensaje}) {
  const history = useHistory();

  history.push("/labels");

  return (
    <React.Fragment>
      <p>Dashboard</p>
    </React.Fragment>
  )
}

export default Dashboard
