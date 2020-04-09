import React from "react"

import { Container } from "./styles"

type Props = {
  tag: {
    id: number
    title: string
  }
}

export default function Tag({ tag }: Props) {
  const { id, title } = tag
  return (
    <Container key={id}>
      <span>{title}</span>
    </Container>
  )
}
