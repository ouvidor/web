// import { AxiosResponse } from "axios"
import { toast } from "react-toastify"

import Api from "../services/api"

const openFile = async (fileToOpen: IFile): Promise<void | string[]> => {
  const fileResponse = await Api.get<Blob>({
    pathUrl: `/files/${fileToOpen.id}`,
    config: { responseType: "blob" },
  })

  if (!fileResponse) {
    toast.error("Ocorreu um erro ao abrir um arquivo")
    return
  }

  const tempUrl = URL.createObjectURL(fileResponse.data)

  window.open(tempUrl)
}

export default openFile
