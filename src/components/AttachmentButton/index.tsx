import React from "react"
import { GrAttachment } from "react-icons/gr"
import ReactPopup from "reactjs-popup"

import openFile from "../../utils/openFile"
import { ButtonContainer, PopupContainer } from "./styles"

interface Props {
  files: IFile[]
}

const AttachmentButton: React.FC<Props> = ({ files }) => {
  async function openAttached(file: IFile) {
    await openFile(file)
  }

  return (
    <ReactPopup
      trigger={
        <ButtonContainer type="button">
          <GrAttachment color="black" size="14" />
          Anexos
        </ButtonContainer>
      }
      position="center center"
      modal
    >
      <PopupContainer>
        {files.map((file) => (
          <button key={file.name} onClick={() => openAttached(file)}>
            Abrir arquivo {file.extension}
          </button>
        ))}
      </PopupContainer>
    </ReactPopup>
  )
}

export default AttachmentButton
