import React, { useEffect, useState, useCallback } from "react"
import { RouteComponentProps } from "react-router-dom"
import { useForm, FormContext, Controller } from "react-hook-form"
import { toast } from "react-toastify"
import { format, parseISO } from "date-fns"
import pt from "date-fns/locale/pt"

import Api from "../../services/api"
import Tag from "../../components/Tag"
// import Datepicker from '../../components/Form/Datepicker';
import Select from "../../components/Form/Select"
import Field from "../../components/Form/Field"
import SearchManifestationByProtocol, {
  SearchManifestationProps,
} from "../../components/SearchManifestationByProtocol"
import StatusHistoryList from "./StatusHistoryList"
import { Background } from "../../styles"
import {
  GridContainer,
  TagList,
  ManifestationContainer,
  StatusContainer,
} from "./styles"

type RouteProps = {
  id: string
}

type CreateManifestationStatusFormProps = {
  status: ISelectOption
  description: string
}

type FormattedManifestation = IManifestation & {
  formattedDate: string
}

const StatusPage: React.FC<RouteComponentProps<RouteProps>> = ({
  match,
  history,
}) => {
  const { id } = match.params
  const [manifestation, setManifestation] = useState<FormattedManifestation>()
  const [manifestationStatus, setManifestationStatus] = useState<
    IManifestationStatus[]
  >([])
  const [statusOptions, setStatusOptions] = useState<ISelectOption[]>([])
  const [selectedId, setSelectedId] = useState<number>()
  const [isEditing, setEditing] = useState(false)

  const form = useForm<CreateManifestationStatusFormProps>()

  const search = useCallback(
    async (idOrProtocol: string) => {
      if (!idOrProtocol) return

      // buscar dados da manifestação
      const manifestationDataPromise = Api.get<IManifestation>({
        pathUrl: `manifestation/${idOrProtocol}`,
      })

      // buscar historico de status da manifestação
      const manifestationStatusDataPromise = Api.get<IManifestationStatus[]>({
        pathUrl: `manifestation/${idOrProtocol}/status`,
      })

      // buscar lista de status possíveis
      const statusDataPromise = Api.get<IStatus[]>({ pathUrl: "/status" })

      const [
        manifestationData,
        manifestationStatusData,
        statusData,
      ] = await Promise.all([
        manifestationDataPromise,
        manifestationStatusDataPromise,
        statusDataPromise,
      ])

      if (!manifestationData) {
        history.push("/status")
        return
      }

      // formatar a data
      const date = format(
        parseISO(manifestationData.created_at),
        "dd 'de' MMMM 'de' yyyy",
        {
          locale: pt,
        }
      )

      const formattedData = {
        ...manifestationData,
        formattedDate: date,
      }
      setManifestation(formattedData)

      if (!manifestationStatusData) {
        history.push("/status")
        return
      }
      setManifestationStatus(manifestationStatusData)

      setStatusOptions(
        statusData.map((status) => ({ label: status.title, value: status.id }))
      )
      if (!manifestationData.read) {
        Api.patch({ pathUrl: `/manifestation/${manifestationData.id}/read` })
      }
    },
    [history]
  )

  // busca atráves da id da manifestação
  useEffect(() => {
    search(id)
  }, [id, search])

  // pesquisa pelo protocolo inserido
  async function handleFetch(data: SearchManifestationProps) {
    search(data.protocol)
  }

  function handleStatusCreate() {
    form.reset()
    setEditing(false)
    setSelectedId(undefined)
  }

  async function onSubmit(data: CreateManifestationStatusFormProps) {
    const formattedData = {
      description: data.description,
      status_id: data.status.value,
    }

    if (isEditing) {
      const resultData = await Api.put<IManifestationStatus>({
        pathUrl: `manifestation/status/${selectedId}`,
        data: formattedData,
      })
      if (resultData && manifestation) {
        toast.success(
          `Status da manifestação "${manifestation.title}" editado com sucesso`
        )
        search(id)
      }
    } else {
      const resultData = await Api.post<IManifestationStatus>({
        pathUrl: `/manifestation/${id}/status`,
        data: formattedData,
      })
      if (resultData && manifestation) {
        toast.success(
          `Novo status criado para a manifestação "${manifestation.title}"`
        )
        search(id)
      }
    }
  }

  // renderiza o formulario de busca por protocolo
  if (!manifestation)
    return (
      <Background>
        <SearchManifestationByProtocol
          label="Histórico de status"
          handleFetch={handleFetch}
        />
      </Background>
    )

  return (
    <Background>
      <GridContainer>
        <ManifestationContainer>
          <header>
            <span>protocolo: {manifestation.protocol}</span>
          </header>

          <div>
            <h1>{manifestation.title}</h1>

            <TagList>
              {manifestation.categories &&
                [...manifestation.categories, manifestation.type].map((tag) => (
                  <Tag key={tag.title} tag={tag} />
                ))}
            </TagList>

            <p>{manifestation.description}</p>
          </div>

          <footer>{manifestation.formattedDate}</footer>
        </ManifestationContainer>
        <FormContext {...form}>
          <StatusContainer>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Controller
                as={<Select options={statusOptions} />}
                name="status"
                placeholder="Escolha um status"
                alternativeStyle
              />

              <Field
                name="description"
                placeholder="Corpo do texto da mudança de status da manifestação"
                component="textarea"
                maxLength={610}
              />

              <footer>
                {/* <Controller
                as={<Datepicker />}
                control={control}
                name="created_at"
              /> */}
                <button type="submit">Salvar</button>
              </footer>
            </form>
          </StatusContainer>
          <StatusHistoryList
            onNewStatusClick={handleStatusCreate}
            statusHistory={manifestationStatus}
            setEditing={setEditing}
            setSelectedId={setSelectedId}
          />
        </FormContext>
      </GridContainer>
    </Background>
  )
}

export default StatusPage
