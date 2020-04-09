import React from "react"

import Tag from "../Tag"
import { Container, TagList } from "./styles"

type Props = {
  manifestation: IManifestation
  handleSelect(manifestation: IManifestation): void
}

export default function ManifestationCard({
  manifestation,
  handleSelect,
}: Props) {
  const { title, categories, type } = manifestation

  const tags = [...categories, type]

  function handleClick() {
    handleSelect(manifestation)
  }

  return (
    <Container onClick={handleClick}>
      <span>{title}</span>

      <section>
        <div />
        <TagList>
          {tags && tags.map((tag) => <Tag key={tag.title} tag={tag} />)}
        </TagList>
      </section>
    </Container>
  )
}
