import React from "react"
import { useFormContext } from "react-hook-form"

import StatusCard from "../StatusCard"
import { Container, Scroll } from "./styles"

type Props = {
  onNewStatusClick(): void
  statusHistory: IManifestationStatus[]
  setEditing(isEditing: boolean): void
  setSelected(manifestationStatus?: IManifestationStatus): void
}

export default function StatusHistoryList({
  onNewStatusClick,
  statusHistory,
  setEditing,
  setSelected,
}: Props) {
  const { setValue } = useFormContext()

  function handleClickStatusCard(manifestationStatus: IManifestationStatus) {
    setEditing(true)
    setSelected(manifestationStatus)
    setValue([
      {
        status: {
          value: manifestationStatus.status.id,
          label: manifestationStatus.status.title,
        },
      },
      { description: manifestationStatus.description },
    ])
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
