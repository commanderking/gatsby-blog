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
    const stateData = getStateData(state.state, setStateTimeData)
    console.log("stateData", stateData)
  }, [])

  const formattedTimeData = [...stateTimeData].reverse().map((day, index) => {
    return {
      ...day,
      index,
      formattedDate: new Date(day.dateChecked).toDateString(),
    }
  })

  console.log("formattedTimeData", formattedTimeData)

  return (
    <div>
      State <StateTimelineChart data={formattedTimeData} />
    </div>
  )
}

export default State
