import React, { useState } from "react"
import { FormContext, useForm } from "react-hook-form"
import { HeatmapLayer } from "@react-google-maps/api"

import MapView from "../../components/MapView"
import Api from "../../services/api"
import { HeatmapContainer, MapContainer, HeatmapForm } from "./styles"

interface HeatmapData {
  lat: number
  lng: number
}

interface HeatmapFormData {
  init: string
  end: string
}

const Heatmap: React.FC = () => {
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([])
  const form = useForm<HeatmapFormData>()

  async function fetchHeatmapData(data: HeatmapFormData) {
    console.log(data)

    const heatmapResponse = await Api.get<HeatmapData[]>({
      pathUrl: `statistics/heatmap`,
      config: {
        params: {
          init: data.init,
          end: data.end,
        },
      },
    })

    if (!heatmapResponse) {
      return
    }

    setHeatmapData(heatmapResponse.data)
  }

  return (
    <HeatmapContainer>
      <section>
        <h1>Heatmap</h1>
        <FormContext {...form}>
          <HeatmapForm onSubmit={form.handleSubmit(fetchHeatmapData)}>
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
            <button type="submit">Gerar heatmap</button>
          </HeatmapForm>
        </FormContext>
      </section>

      {heatmapData.length > 0 && (
        <MapContainer>
          <MapView>
            <HeatmapLayer data={heatmapData} />
          </MapView>
        </MapContainer>
      )}
    </HeatmapContainer>
  )
}

export default Heatmap