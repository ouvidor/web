import React, { useMemo } from "react"
import { GrAttachment } from "react-icons/gr"
import { format, parseISO } from "date-fns"
import pt from "date-fns/locale/pt"

import { Container, Title, Date } from "./styles"

type Props = {
  manifestationStatus: IManifestationStatus
  selectItem(status: IManifestationStatus): void
}

export default function StatusCard({ manifestationStatus, selectItem }: Props) {
  const formattedDate = useMemo(() => {
    const date = format(
      parseISO(manifestationStatus.created_at),
      "dd 'de' MMMM 'de' yyyy",
      {
        locale: pt,
      }
    )
    return date
  }, [manifestationStatus.created_at])

  function handleClickStatus() {
    selectItem(manifestationStatus)
  }

  return (
    <Container onClick={handleClickStatus}>
      <Title>{manifestationStatus.status.title}</Title>
      <Date>{formattedDate}</Date>
      {manifestationStatus.files[0] && <GrAttachment />}
    </Container>
  )
}
