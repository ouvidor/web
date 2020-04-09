import React from "react"
import { MdInsertDriveFile } from "react-icons/md"

import { ListContainer, ListItem } from "./styles"

type FileProps = {
  file: IFile
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

type Props = {
  files: IFile[]
}

const FileList = ({ files }: Props) => (
  <ListContainer>
    <ul>
      {files.length && files.map((file) => <File file={file} key={file.id} />)}
    </ul>
  </ListContainer>
)

export default FileList
