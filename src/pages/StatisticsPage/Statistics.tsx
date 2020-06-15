import React, { useState } from "react"
import { ResponsiveBar } from "@nivo/bar"
import { FormContext, useForm } from "react-hook-form"

import Api from "../../services/api"
import { StatisticsContainer, GraphContainer, StatisticForm } from "./styles"

interface StatisticFormData {
  init: string
  end: string
}

interface StatisticResponse {
  mesAno: string
  sugestão: string
  elogio: string
  solicitacao: string
  reclamacao: string
  denuncia: string
}

interface StatisticData {
  date: string
  sugestão: number
  elogio: number
  solicitacao: number
  reclamacao: number
  denuncia: number
}

const Statistics: React.FC = () => {
  const [statistics, setStatistics] = useState<StatisticData[]>([])
  const [keys, setKeys] = useState<string[]>([])
  const form = useForm<StatisticFormData>()

  async function handleFetchStatistic(data: StatisticFormData) {
    const keysToSave: string[] = []
    const response = await Api.get<StatisticResponse[]>({
      pathUrl: "/statistics/types",
      config: {
        params: {
          init: data.init,
          end: data.end,
          city: process.env.REACT_APP_CITY,
        },
      },
    })

    if (!response) {
      return
    }

    const formattedData = response.data.map((item) => ({
      date: item.mesAno.replace("#", "/"),
      sugestão: Number(item.sugestão),
      elogio: Number(item.elogio),
      solicitacao: Number(item.solicitacao),
      reclamacao: Number(item.reclamacao),
      denuncia: Number(item.denuncia),
    }))

    setStatistics(formattedData)

    for (const key in formattedData[0]) {
      if (key === "date") {
        continue
      } else {
        keysToSave.push(key)
      }
    }

    setKeys(keysToSave)
  }

  return (
    <StatisticsContainer>
      <section>
        <h1>Estatística</h1>
        <FormContext {...form}>
          <StatisticForm onSubmit={form.handleSubmit(handleFetchStatistic)}>
            <div>
              <div>
                <label htmlFor="init">Data de inicio</label>
                <input name="init" type="date" ref={form.register} />
              </div>
              <div>
                <label htmlFor="init">Data de fim</label>
                <input name="end" type="date" ref={form.register} />
              </div>
            </div>
            <button type="submit">Gerar estatística</button>
          </StatisticForm>
        </FormContext>
      </section>
      <GraphContainer>
        <ResponsiveBar
          data={statistics}
          keys={keys}
          indexBy="date"
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
