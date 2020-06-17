import React, { useEffect, useState, useCallback } from "react"
import { RouteComponentProps } from "react-router-dom"
import { useForm, FormContext, Controller } from "react-hook-form"
import { GrAttachment } from "react-icons/gr"
import { toast } from "react-toastify"
import { format, parseISO } from "date-fns"
import pt from "date-fns/locale/pt"

import Api from "../../services/api"
import openFiles from "../../utils/openFiles"
import Tag from "../../components/Tag"
import FilesInput from "../../components/Form/FilesInput"
import Select from "../../components/Form/Select"
import Field from "../../components/Form/Field"
import SearchManifestationByProtocol, {
  SearchManifestationProps,
} from "../../components/SearchManifestationByProtocol"
import AttachmentButton from "../../components/AttachmentButton"
import StatusHistoryList from "./StatusHistoryList"
import { Background } from "../../styles"
import {
  GridContainer,
  TagList,
  ManifestationContainer,
  StatusContainer,
} from "./styles"

type RouteProps = {
  id?: string
}

type CreateManifestationStatusFormProps = {
  status: ISelectOption
  description: string
  files: FileList
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
    async (idOrProtocol: string | number) => {
      if (!idOrProtocol) return

      // buscar dados da manifestação
      const manifestationResponsePromise = Api.get<IManifestation>({
        pathUrl: `manifestation/${idOrProtocol}`,
      })

      // buscar historico de status da manifestação
      const manifestationStatusResponsePromise = Api.get<
        IManifestationStatus[]
      >({
        pathUrl: `manifestation/${idOrProtocol}/status`,
      })

      // buscar lista de status possíveis
      const statusResponsePromise = Api.get<IStatus[]>({ pathUrl: "/status" })

      const [
        manifestationResponse,
        manifestationStatusResponse,
        statusResponse,
      ] = await Promise.all([
        manifestationResponsePromise,
        manifestationStatusResponsePromise,
        statusResponsePromise,
      ])

      if (
        !manifestationResponse ||
        !manifestationStatusResponse ||
        !statusResponse
      ) {
        history.push("/status")
        return
      }

      // formatar a data
      const date = format(
        parseISO(manifestationResponse.data.created_at),
        "dd 'de' MMMM 'de' yyyy",
        {
          locale: pt,
        }
      )

      const formattedData = {
        ...manifestationResponse.data,
        formattedDate: date,
      }
      setManifestation(formattedData)

      setManifestationStatus(manifestationStatusResponse.data)

      setStatusOptions(
        statusResponse.data.map((status) => ({
          label: status.title,
          value: status.id,
        }))
      )
      if (!manifestationResponse.data.read) {
        Api.patch({
          pathUrl: `/manifestation/${manifestationResponse.data.id}/read`,
        })
      }
    },
    [history]
  )

  // busca atráves da id da manifestação
  useEffect(() => {
    if (id) {
      search(id)
    }
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

  async function submitManifestationStatus(
    data: CreateManifestationStatusFormProps
  ) {
    if (!manifestation) {
      toast.error("Erro inesperado, tente recarregar a página")
      return
    }

    const formattedData = {
      description: data.description,
      status_id: data.status.value,
    }

    let manifestationStatusData

    if (isEditing) {
      const manifestationStatusEditResponse = await Api.put<
        IManifestationStatus
      >({
        pathUrl: `manifestation/status/${selectedId}`,
        data: formattedData,
      })
      if (manifestationStatusEditResponse && manifestation) {
        toast.success(
          `Status da manifestação "${manifestation.title}" editado com sucesso`
        )
        search(manifestation.id)
        manifestationStatusData = manifestationStatusEditResponse.data
      }
    } else {
      const manifestationStatusCreateResponse = await Api.post<
        IManifestationStatus
      >({
        pathUrl: `/manifestation/${manifestation.id}/status`,
        data: formattedData,
      })
      if (manifestationStatusCreateResponse && manifestation) {
        toast.success(
          `Novo status criado para a manifestação "${manifestation.title}"`
        )
        search(manifestation.id)
        manifestationStatusData = manifestationStatusCreateResponse.data
      }
    }

    if (!manifestationStatusData) {
      return
    }

    /**
     * UPLOAD DE ARQUIVOS
     * O UPLOAD DEVERA SER POR ULTIMO
     */
    if (!data.files[0]) {
      form.reset()
      return
    }

    const formData = new FormData()

    Array.from(data.files).forEach((file) => {
      formData.append("file", file)
    })

    const filesResponse = await Api.post<IFile[]>({
      pathUrl: `/files/status/${manifestationStatusData.id}`,
      data: formData,
    })

    if (!filesResponse || filesResponse.data.length === 0) {
      toast.error("Envio de arquivo falhou inesperadamente")
    }
    form.reset()
  }

  async function openAttached() {
    // get files
    const selectedManifestationStatus = manifestationStatus.find(
      (mS) => mS.id === selectedId
    )
    const files = selectedManifestationStatus?.files

    if (files && files[0]) {
      await openFiles(files)
    } else {
      toast.info("Não há anexos nesse status de manifestação")
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

          <footer>
            <AttachmentButton files={manifestation.files} />
            {manifestation.formattedDate}
          </footer>
        </ManifestationContainer>
        <FormContext {...form}>
          <StatusContainer>
            {selectedId && (
              <button type="button" onClick={openAttached}>
                <GrAttachment color="black" size="14" />
                Anexos
              </button>
            )}
            <form onSubmit={form.handleSubmit(submitManifestationStatus)}>
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

              <FilesInput name="files" />

              <button type="submit">Salvar</button>
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
