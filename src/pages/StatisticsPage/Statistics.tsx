import React from "react"
import { ResponsiveBar } from "@nivo/bar"

import { StatisticsContainer, GraphContainer } from "./styles"

const data = [
  {
    month: "janeiro",
    denuncia: 190,
    denunciaColor: "hsl(148, 70%, 50%)",
    sandwich: 186,
    sandwichColor: "hsl(52, 70%, 50%)",
    kebab: 70,
    kebabColor: "hsl(57, 70%, 50%)",
    fries: 93,
    friesColor: "hsl(339, 70%, 50%)",
    donut: 27,
    donutColor: "hsl(148, 70%, 50%)",
  },
]

const Statistics: React.FC = () => {
  return (
    <StatisticsContainer>
      <h1>Estatísticas</h1>
      <GraphContainer>
        <ResponsiveBar
          data={data}
          keys={["reclamação", "denúncia"]}
          indexBy="month"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          colors={{ scheme: "nivo" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "mêses",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "manifestações",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </GraphContainer>
    </StatisticsContainer>
  )
}

export default Statistics
