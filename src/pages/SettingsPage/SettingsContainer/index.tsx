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
  placeholder?: string
}

export default function SettingsContainer({
  urlPath,
  email = undefined,
  title,
  placeholder = undefined,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<IGenericItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(data: SubmittedData, isSaving: boolean) {
    // excluindo item
    if (!isSaving && data.id) {
      const responseData = await Api.delete<IGenericItem>({
        pathUrl: `${urlPath}/${data.id}`,
      })
      if (responseData) {
        toast.success(`Item "${responseData.title}" excluido com sucesso`)
        setItems(items.filter((item) => item.id !== responseData.id))
      }
      return
    }

    // cria um novo item
    if (!data.id) {
      const responseData = await Api.post<IGenericItem>({
        pathUrl: `${urlPath}`,
        data,
      })
      if (responseData) {
        toast.success(`Item "${responseData.title}" criado com sucesso`)
        setItems([responseData, ...items])
      }
      return
    }

    // atualizar um item
    const responseData = await Api.put<IGenericItem>({
      pathUrl: `${urlPath}/${data.id}`,
      data,
    })
    if (responseData) {
      toast.success(`Item "${responseData.title}" atualizado com sucesso`)
      setItems(
        items.map((item) => {
          if (responseData.id === item.id) {
            return responseData
          }
          return item
        })
      )
    }
  }

  async function getItemFromAPI(url: string) {
    setLoading(true)
    setError(false)

    const data = await Api.get<IGenericItem[]>({ pathUrl: url, error: false })

    if (!data) {
      setLoading(false)
      setError(true)
      return
    }
    setItems(data)
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
                placeholder={placeholder}
                submitChange={handleSubmit}
              />
              {items &&
                items.map((item) => (
                  <SettingsItem
                    item={item}
                    key={item.id}
                    email={email}
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
