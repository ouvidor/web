/**
 * Exporta uma instancia do `Axios` configurada com a url base.
 * O Axios é uma biblioteca para fazer requisições HTTP.
 */

import axios, { AxiosInstance, AxiosResponse } from "axios"
import { toast } from "react-toastify"

type Error = {
  data: {
    error?: string
    message?: string
    messages?: string[]
  }
}

function getErrorMessage(errorResponse?: Error) {
  if (errorResponse === undefined) return "Erro inesperado!"

  if (Array.isArray(errorResponse?.data?.messages)) {
    return errorResponse.data.messages.join("; ")
  }

  if (typeof errorResponse?.data?.message === "string") {
    return errorResponse.data.message
  }

  if (typeof errorResponse?.data?.error === "string") {
    return errorResponse.data.error
  }

  return "Erro na aplicação, por favor informe ao suporte!"
}

type PropsGET = { params?: unknown; pathUrl: string; error?: boolean }
type PropsDELETE = { pathUrl: string }
type PropsPATCH = { pathUrl: string; data?: object; params?: object }
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

  async get<T>({
    params,
    pathUrl,
    error = true,
  }: PropsGET): Promise<void | AxiosResponse<T>> {
    try {
      return await this.api.get(pathUrl, { params })
    } catch (err) {
      if (error === true) {
        toast.error(getErrorMessage(err.response))
      }
    }
  }

  async post<T>({
    data,
    pathUrl,
  }: PropsPOSTAndPUT): Promise<void | AxiosResponse<T>> {
    try {
      return await this.api.post(pathUrl, data)
    } catch (error) {
      toast.error(getErrorMessage(error.response))
    }
  }

  async put<T>({
    data,
    pathUrl,
  }: PropsPOSTAndPUT): Promise<void | AxiosResponse<T>> {
    try {
      return await this.api.put(pathUrl, data)
    } catch (error) {
      toast.error(getErrorMessage(error.response))
    }
  }

  async patch<T>({
    data,
    pathUrl,
    params,
  }: PropsPATCH): Promise<void | AxiosResponse<T>> {
    try {
      return await this.api.patch(pathUrl, data, { params })
    } catch (error) {
      toast.error(getErrorMessage(error.response))
    }
  }

  async delete<T>({ pathUrl }: PropsDELETE): Promise<void | AxiosResponse<T>> {
    try {
      return await this.api.delete(pathUrl)
    } catch (error) {
      toast.error(getErrorMessage(error.response))
    }
  }
}

export default new Api()
