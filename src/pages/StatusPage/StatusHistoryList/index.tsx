import React from "react"
import { useFormContext } from "react-hook-form"

import StatusCard from "../StatusCard"
import { Container, Scroll } from "./styles"

type Props = {
  onNewStatusClick(): void
  statusHistory: IManifestationStatus[]
  setEditing(isEditing: boolean): void
  setSelectedId(id?: number): void
}

export default function StatusHistoryList({
  onNewStatusClick,
  statusHistory,
  setEditing,
  setSelectedId,
}: Props) {
  const { setValue } = useFormContext()

  function handleClickStatusCard(status: IManifestationStatus) {
    setEditing(true)
    setSelectedId(status.id)
    setValue([{ status: status.status }, { description: status.description }])
  }

  return (
    <Container>
      <button type="button" onClick={onNewStatusClick}>
        Adicionar novo status à manifestação
      </button>
      <Scroll>
        <ul>
          {statusHistory &&
            statusHistory.map((status) => (
              <StatusCard
                key={status.id}
                manifestationStatus={status}
                selectItem={handleClickStatusCard}
              />
            ))}
        </ul>
      </Scroll>
    </Container>
  )
}
