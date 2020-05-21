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

const CovidTimelineChart = ({
  data,
  yDataKey,
  strokeColor = "#8884d8",
  xLabel,
}) => {
  return (
    <LineChart width={800} height={300} data={data}>
      <XAxis
        dataKey="index"
        tick={false}
        label={{
          value: xLabel,
          offset: 0,
          position: "insideBottom",
        }}
      ></XAxis>
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Line
        type="monotone"
        dataKey={yDataKey}
        stroke={strokeColor}
        legendType="none"
        activeDot={{ r: 6 }}
      />
    </LineChart>
  )
}

export default CovidTimelineChart
