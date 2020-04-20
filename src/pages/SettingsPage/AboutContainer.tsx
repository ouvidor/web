import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

import Api from "../../services/api"
import { AboutList } from "./styles"

const AboutContainer = () => {
  const [status, setStatus] = useState<IStatus[]>([])
  const [types, setTypes] = useState<IType[]>([])

  useEffect(() => {
    async function loadData() {
      try {
        const statusResult = await Api.get<IStatus[]>({ pathUrl: "status" })
        const typesResult = await Api.get<IType[]>({ pathUrl: "type" })

        setStatus(statusResult)
        setTypes(typesResult)
      } catch (error) {
        toast.error("Não foi possível carregar as informações do sistema")
      }
    }

    loadData()
  }, [])

  return (
    <article>
      <h2>Informações sobre o sistema</h2>

      <section>
        <h3>Tipos</h3>
        <AboutList>
          {types.map((type) => (
            <li key={type.id}>{type.title}</li>
          ))}
        </AboutList>
      </section>
      <section>
        <h3>Status</h3>
        <AboutList>
          {status.map((s) => (
            <li key={s.id}>{s.title}</li>
          ))}
        </AboutList>
      </section>
    </article>
  )
}

export default AboutContainer
