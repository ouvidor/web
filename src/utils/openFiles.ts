import { AxiosResponse } from "axios"
import { toast } from "react-toastify"

import Api from "../services/api"

const openFiles = async (
  filesToOpen: Array<IFile>,
  shouldOpenWindow = true
): Promise<void | string[]> => {
  const filesResponsePromises: Promise<void | AxiosResponse<Blob>>[] = []

  /**
   * Forma otimizada de fazer requisições
   * Dessa forma as requisições são feitas sem esperar a conclusão
   */
  filesToOpen.forEach((file) => {
    filesResponsePromises.push(
      Api.get<Blob>({
        pathUrl: `/files/${file.id}`,
        config: { responseType: "blob" },
      })
    )
  })

  const filesResponse = await Promise.all(filesResponsePromises)

  const filesData: Blob[] = []

  for (const fileResponse of filesResponse) {
    if (fileResponse) {
      filesData.push(fileResponse.data)
    } else {
      toast.error("Ocorreu um erro ao abrir um arquivo")
    }
  }

  const urlsOfFiles = filesData.map((resolvedFileData) => {
    return URL.createObjectURL(resolvedFileData)
  })

  if (shouldOpenWindow) {
    for (const url of urlsOfFiles) {
      window.open(url)
    }
  } else {
    return urlsOfFiles
  }
}

export default openFiles
