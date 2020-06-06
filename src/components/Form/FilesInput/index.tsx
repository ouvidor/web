import React, { useState } from "react"
import { useFormContext } from "react-hook-form"

import FileList from "../../FileList"
import { Container, InputLabel } from "./styles"

// interface HTMLInputEvent extends Event {
//   target: HTMLInputElement & EventTarget
// }

type Props = {
  name: string
  label?: string
}

export interface FileWithPreview extends File {
  lastModifiedDate: Date
  preview: string
  webkitRelativePath: string
}

function FilesInput({ name, label = undefined }: Props) {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const { register } = useFormContext()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const arrayOfFiles: FileWithPreview[] = []
    arrayOfFiles.forEach.call(event.target.files, (file) => {
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
      arrayOfFiles.push(file)
    })

    setFiles(arrayOfFiles)
  }

  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <InputLabel htmlFor="file">
        <div>
          <input
            ref={register}
            name={name}
            id="file"
            type="file"
            accept="*"
            multiple
            onChange={handleChange}
          />
          {files.length ? (
            <FileList files={files} />
          ) : (
            <p>
              Arraste arquivos ou clique aqui para fazer o upload de arquivos
            </p>
          )}
        </div>
      </InputLabel>
    </Container>
  )
}

export default FilesInput
