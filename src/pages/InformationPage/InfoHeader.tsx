import React from "react"

import { Header } from "./styles"

type Props = {
  title: string
  data?: IOmbudsman | IPrefecture
}

export default function InfoHeader({ title, data }: Props) {
  return (
    <Header>
      <h1>{title}</h1>
      <section>
        <h2>Dados</h2>
        <p>Local da ouvidoria:</p> <span>{data?.location}</span>
        <div>
          <h3>Contato</h3>
          <p>Telefone:</p> <span>{data?.telephone}</span>
          <br />
          <p>Email:</p> <span>{data?.email}</span>
          <br />
          <p>Site:</p> <span>{data?.site}</span>
          <br />
          <p>Horario de atendimento:</p> <span>{data?.attendance}</span>
        </div>
      </section>
    </Header>
  )
}
