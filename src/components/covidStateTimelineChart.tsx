import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts"

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: "white " }}>
        <div>{payload[0].payload.formattedDate}</div>
        <div>{payload[0].payload.positiveIncrease}</div>
      </div>
    )
  }
  return null
}

const CovidTimelineChart = ({ data }) => {
  console.log("data", data)
  return (
    <LineChart width={500} height={300} data={data}>
      <XAxis
        dataKey="index"
        tick={false}
        label={{
          value: "Additional Cases / Day",
          offset: 0,
          position: "insideBottom",
        }}
      ></XAxis>
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Line
        type="monotone"
        dataKey="positiveIncrease"
        stroke="#8884d8"
        legendType="none"
        activeDot={{ r: 6 }}
      />
    </LineChart>
  )
}

export default CovidTimelineChart
