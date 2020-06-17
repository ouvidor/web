import React from "react"
import { GrAttachment } from "react-icons/gr"

import openFiles from "../../utils/openFiles"
import { ButtonContainer } from "./styles"

interface Props {
  files: IFile[]
}

const AttachmentButton: React.FC<Props> = ({ files }) => {
  async function openAttached() {
    await openFiles(files)
  }

  return (
    <ButtonContainer type="button" onClick={openAttached}>
      <GrAttachment color="black" size="14" />
      Anexos
    </ButtonContainer>
  )
}

export default AttachmentButton
