import React from "react"
import { MdInsertDriveFile } from "react-icons/md"

import { ListContainer, ListItem } from "./styles"
import { FileWithPreview } from "../Form/FilesInput"

interface FileProps {
  file: FileWithPreview
}

interface FileListProps {
  files: FileWithPreview[]
}

function File({ file }: FileProps) {
  // checa a extensão do arquivo é png, gif, jpg ou jpeg
  if (file.name.match(/(png|gif|jpe?g)$/)) {
    return (
      <ListItem>
        <img src={file.preview} alt={file.name} />
      </ListItem>
    )
  }
  // documento comum
  return (
    <ListItem>
      <div>
        <MdInsertDriveFile />
        <p>{file.name}</p>
      </div>
    </ListItem>
  )
}

const FileList = ({ files }: FileListProps) => (
  <ListContainer>
    <ul>
      {files.length &&
        files.map((file) => <File file={file} key={file.name} />)}
    </ul>
  </ListContainer>
)

export default FileList
