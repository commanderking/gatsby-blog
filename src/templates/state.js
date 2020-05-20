import React, { useEffect, useState } from "react"
import axios from "axios"
import StateTimelineChart from "../components/covidStateTimelineChart"
const getStateData = async (state, setStateTimeData) => {
  try {
    const results = await axios.get(
      `https://covidtracking.com/api/v1/states/${state}/daily.json`
    )
    setStateTimeData(results.data)
    return results.data
  } catch {
    setStateTimeData([])
    console.log("error")
  }
}

const State = ({ pageContext: { state } }) => {
  const [stateTimeData, setStateTimeData] = useState([])
  useEffect(() => {
    getStateData(state.state, setStateTimeData)
  }, [])

  const formattedTimeData = [...stateTimeData].reverse().map((day, index) => {
    return {
      ...day,
      index,
      formattedDate: new Date(day.dateChecked).toDateString(),
    }
  })

  return (
    <div style={{ padding: "20px" }}>
      <h4>
        {state.state} COVID-19 New Positive Cases Per Day (as of{" "}
        {state.checkTimeEt} EST))
      </h4>
      <StateTimelineChart data={formattedTimeData} />
      <div>Total Positive Cases: {state.positive}</div>
      <div>Deaths: {state.death}</div>
    </div>
  )
}

export default State
