/**
 * Exporta uma instancia do `Axios` configurada com a url base.
 * O Axios é uma biblioteca para fazer requisições HTTP.
 */

import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios"
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

interface Request {
  config?: AxiosRequestConfig
  pathUrl: string
  error?: boolean
}

interface RequestWithData extends Request {
  data?: object
}

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
    config,
    pathUrl,
    error = true,
  }: Request): Promise<void | AxiosResponse<T>> {
    try {
      return await this.api.get(pathUrl, config)
    } catch (responseError) {
      if (error === true) {
        toast.error(getErrorMessage(responseError.response))
      }
    }
  }

  async post<T>({
    data,
    pathUrl,
    config,
    error = true,
  }: RequestWithData): Promise<void | AxiosResponse<T>> {
    try {
      return await this.api.post(pathUrl, data, config)
    } catch (responseError) {
      if (error === true) {
        toast.error(getErrorMessage(responseError.response))
      }
    }
  }

  async put<T>({
    data,
    pathUrl,
    config,
    error = true,
  }: RequestWithData): Promise<void | AxiosResponse<T>> {
    try {
      return await this.api.put(pathUrl, data, config)
    } catch (responseError) {
      if (error === true) {
        toast.error(getErrorMessage(responseError.response))
      }
    }
  }

  async patch<T>({
    data,
    pathUrl,
    config,
    error = true,
  }: RequestWithData): Promise<void | AxiosResponse<T>> {
    try {
      return await this.api.patch(pathUrl, data, config)
    } catch (responseError) {
      if (error === true) {
        toast.error(getErrorMessage(responseError.response))
      }
    }
  }

  async delete<T>({
    pathUrl,
    config,
    error = true,
  }: Request): Promise<void | AxiosResponse<T>> {
    try {
      return await this.api.delete(pathUrl, config)
    } catch (responseError) {
      if (error === true) {
        toast.error(getErrorMessage(responseError.response))
      }
    }
  }
}

export default new Api()
