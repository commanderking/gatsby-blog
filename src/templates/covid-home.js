import React, { useEffect, useState } from "react"
import StateTimelineChart from "../components/covidStateTimelineChart"
import { Link } from "gatsby"

const State = ({ pageContext: { data } }) => {
  console.log("data", data)
  return (
    <div style={{ padding: "40px" }}>
      <h1>States</h1>
      <ul>
        {data.map(stateData => {
          return (
            <Link
              key={stateData.state}
              to={`/covid/${stateData.state.toLowerCase()}/`}
            >
              <li key={stateData.state}>{stateData.state}</li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default State
