/**
 * Exporta uma instancia do `Axios` configurada com a url base.
 * O Axios é uma biblioteca para fazer requisições HTTP.
 */

import axios, { AxiosInstance } from "axios"
import { toast } from "react-toastify"

type Error = {
  data: {
    error?: string
  }
}

function getErrorMessage(errorResponse: Error | undefined) {
  if (errorResponse === undefined || !errorResponse?.data?.error)
    return "Erro inesperado!"

  if (typeof errorResponse?.data?.error === "string") {
    return errorResponse.data.error
  }

  return "Erro na aplicação, por favor informe ao suporte!"
}

type PropsGET = { params?: unknown; pathUrl: string; error?: boolean }
type PropsDELETE = { pathUrl: string }
type PropsPOSTAndPUT = { data: unknown; pathUrl: string }

class Api {
  api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    })
  }

  saveToken(token?: string) {
    if (!token) {
      delete this.api.defaults.headers.Authorization
    } else {
      this.api.defaults.headers.Authorization = `Bearer ${token}`
    }
  }

  get<T>({ params, pathUrl, error = true }: PropsGET): Promise<T> {
    return this.api
      .get(pathUrl, { params })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        if (error === true) {
          toast.error(getErrorMessage(err.response))
        }
      })
  }

  post<T>({ data, pathUrl }: PropsPOSTAndPUT): Promise<T> {
    return this.api
      .post(pathUrl, data)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        toast.error(getErrorMessage(error.response))
      })
  }

  put<T>({ data, pathUrl }: PropsPOSTAndPUT): Promise<T> {
    return this.api
      .put(pathUrl, data)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        toast.error(getErrorMessage(error.response))
      })
  }

  delete<T>({ pathUrl }: PropsDELETE): Promise<T> {
    return this.api
      .delete(pathUrl)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        toast.error(getErrorMessage(error.response))
      })
  }
}

export default new Api()
