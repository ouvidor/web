import React from "react"
import { useHistory } from "react-router-dom"
import { MdAttachFile, MdDateRange, MdLocationOn } from "react-icons/md"
import { GrDrag } from "react-icons/gr"
import { MdClose } from "react-icons/md"

import { format, parseISO } from "date-fns"
import pt from "date-fns/locale/pt"
import Draggable from "react-draggable"

import Tag from "../Tag"
import { Container, Header, DetailsContainer, Footer, TagList } from "./styles"

type Props = {
  manifestation: IManifestation
  closeManifestation?(manifestationId: number): void
  draggable?: boolean
  pos?: number
}

export default function Manifestation({
  manifestation,
  draggable = false,
  pos = 0,
  closeManifestation = () => {
    console.info("closeManifestation não foi implementado")
  },
}: Props) {
  const history = useHistory()
  const {
    id,
    title,
    categories,
    type,
    description,
    created_at,
    location,
    protocol,
    files,
  } = manifestation

  const tags = [...categories, type]

  const formattedDate = format(parseISO(created_at), "dd 'de' MMMM 'de' yyyy", {
    locale: pt,
  })

  function openAttached() {
    files.forEach((file) => {
      window.open(`${process.env.REACT_APP_API_URL}/files/${file.id}`)
    })
  }

  function handleSend() {
    history.push(`/send/${id}`)
  }

  function handleStatus() {
    history.push(`/status/${id}`)
  }

  return (
    <Draggable defaultPosition={{ x: pos * 20, y: pos * 20 }} handle=".handler">
      <Container>
        <Header>
          <div>
            <div>
              {draggable && <GrDrag className="handler" />}
              <h1>{title}</h1>
            </div>
            {draggable && <MdClose onClick={() => closeManifestation(id)} />}
          </div>

          <span>protocolo: {protocol}</span>

          <section>
            <TagList>
              {tags && tags.map((tag) => <Tag key={tag.title} tag={tag} />)}
            </TagList>

            <button type="button" onClick={openAttached}>
              <MdAttachFile color="black" size="14" />
              Anexos
            </button>
          </section>
        </Header>

        <DetailsContainer>
          <p>{description}</p>
          <br />

          {formattedDate && (
            <div>
              <MdDateRange size="14px" />
              Data: {formattedDate}
            </div>
          )}
          {location && (
            <div>
              <MdLocationOn size="14px" />
              Local: {location}
            </div>
          )}
        </DetailsContainer>

        <Footer>
          <button type="button" onClick={handleStatus}>
            Gerenciar Status
          </button>
          <button type="button" onClick={handleSend}>
            Direcionar para secretária
          </button>
        </Footer>
      </Container>
    </Draggable>
  )
}
