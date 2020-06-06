/**
 * Container retratil para editar os items do sistema
 */
import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"

import { CircleSpinner } from "react-spinners-kit"
import { MdClear } from "react-icons/md"
import { GoChevronDown, GoChevronUp } from "react-icons/go"
import { Container, ErrorContainer, LoadingContainer } from "./styles"
import SettingsItem, { SubmittedData } from "./SettingsItem"
import Api from "../../../services/api"

type Props = {
  title: string
  urlPath: string
  email?: boolean
  accountable?: boolean
  placeholder?: string
}

export default function SettingsContainer({
  urlPath,
  email,
  accountable,
  title,
  placeholder,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<IGenericItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(data: SubmittedData, isSaving: boolean) {
    if (accountable) {
      data = { ...data, city: process.env.REACT_APP_CITY }
    }

    // excluindo item
    if (!isSaving && data.id) {
      const response = await Api.delete<IGenericItem>({
        pathUrl: `${urlPath}/${data.id}`,
      })
      if (response) {
        toast.info(`Item "${response.data.title}" excluido com sucesso`)
        setItems(items.filter((item) => item.id !== response.data.id))
      }
      return
    }

    // cria um novo item
    if (!data.id) {
      const response = await Api.post<IGenericItem>({
        pathUrl: `${urlPath}`,
        data,
      })
      if (response) {
        toast.success(`Item "${response.data.title}" criado com sucesso`)
        setItems([response.data, ...items])
      }
      return
    }

    // atualizar um item
    const response = await Api.put<IGenericItem>({
      pathUrl: `${urlPath}/${data.id}`,
      data,
    })
    if (response) {
      toast.success(`Item "${response.data.title}" atualizado com sucesso`)
      setItems(
        items.map((item) => {
          if (response.data.id === item.id) {
            return response.data
          }
          return item
        })
      )
    }
  }

  async function getItemFromAPI(url: string) {
    setLoading(true)
    setError(false)

    const response = await Api.get<IGenericItem[]>({
      pathUrl: url,
      error: false,
    })

    if (!response) {
      setLoading(false)
      setError(true)
      return
    }
    setItems(response.data)
    setLoading(false)
    setError(false)
  }

  useEffect(() => {
    getItemFromAPI(urlPath)
  }, [urlPath])

  return (
    <Container>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        <div>
          {title}
          {isOpen ? <GoChevronUp /> : <GoChevronDown />}
        </div>
      </button>
      {isOpen && (
        <div>
          {error && (
            <ErrorContainer>
              <MdClear />
              <span>Não pôde se conectar</span>
            </ErrorContainer>
          )}
          {loading && (
            <LoadingContainer>
              <CircleSpinner color="#000" />
            </LoadingContainer>
          )}
          {!loading && !error && (
            <ul>
              <SettingsItem
                email={email}
                accountable={accountable}
                placeholder={placeholder}
                submitChange={handleSubmit}
              />
              {items &&
                items.map((item) => (
                  <SettingsItem
                    item={item}
                    key={item.id}
                    email={email}
                    accountable={accountable}
                    submitChange={handleSubmit}
                  />
                ))}
            </ul>
          )}
        </div>
      )}
    </Container>
  )
}
