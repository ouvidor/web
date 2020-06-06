import React, { useEffect, useState, useCallback } from "react"
import { RouteComponentProps } from "react-router-dom"
import { ImpulseSpinner } from "react-spinners-kit"
import { useForm, FormContext, Controller } from "react-hook-form"
import { toast } from "react-toastify"
import { format, parseISO } from "date-fns"
import pt from "date-fns/locale/pt"

import { Container, TagList } from "./styles"
import Api from "../../services/api"
import { Background } from "../../styles"
import Tag from "../../components/Tag"
import Select from "../../components/Form/Select"
import Field from "../../components/Form/Field"
import SearchManifestationByProtocol, {
  SearchManifestationProps,
} from "../../components/SearchManifestationByProtocol"
import { sendMailSchema } from "../../validations"

type FormattedManifestation = IManifestation & {
  formattedDate: string
}

type SendMailFormData = {
  title: string
  text: string
  secretary: ISelectOption
}

type RouteProps = {
  id: string
}

const SendPage: React.FC<RouteComponentProps<RouteProps>> = ({
  match,
  history,
}) => {
  const { id } = match.params
  const [loading, setLoading] = useState(false)
  const [manifestation, setManifestation] = useState<FormattedManifestation>()
  const [secretaryOptions, setSecretaryOptions] = useState<ISelectOption[]>([])

  const form = useForm<SendMailFormData>({
    validationSchema: sendMailSchema,
  })

  const search = useCallback(
    async (idOrProtocol: string) => {
      if (!idOrProtocol) return

      // busca pela manifestação
      const manifestationResponsePromise = Api.get<IManifestation>({
        pathUrl: `/manifestation/${idOrProtocol}`,
      })

      // busca pelas secretarias
      const secretariatsResponsePromise = await Api.get<ISecretary[]>({
        pathUrl: "/secretary",
      })

      const [manifestationResponse, secretariatsResponse] = await Promise.all([
        manifestationResponsePromise,
        secretariatsResponsePromise,
      ])

      if (!manifestationResponse || !secretariatsResponse) {
        history.push("/send")
        return
      }

      const manifestationData = manifestationResponse.data

      // formatar a data
      const date = format(
        parseISO(manifestationData.created_at),
        "dd 'de' MMMM 'de' yyyy",
        {
          locale: pt,
        }
      )
      const manifestationWithDate = {
        ...manifestationData,
        formattedDate: date,
      }
      setManifestation(manifestationWithDate)

      setSecretaryOptions(
        secretariatsResponse.data.map((secretary) => ({
          label: secretary.title,
          value: secretary.email,
        }))
      )

      if (!manifestationData.read) {
        Api.patch({
          pathUrl: `/manifestation/${manifestationData.id}/read`,
        })
      }
    },
    [history]
  )

  // busca atráves da id da manifestação
  useEffect(() => {
    search(id)
  }, [id, search])

  // pesquisa pelo protocolo inserido
  async function handleManifestationSearch(data: SearchManifestationProps) {
    search(data.protocol)
  }

  // envio do email
  async function handleSendMail(data: SendMailFormData) {
    setLoading(true)
    const formattedData = { ...data, email: data.secretary.value }
    delete formattedData.secretary

    const mailResponse = await Api.post<IMailReturn>({
      pathUrl: "/email",
      data: formattedData,
    })

    if (mailResponse) {
      toast.success(mailResponse.data.message)
    }

    setLoading(false)
  }

  // renderiza o formulario de busca por protocolo
  if (!manifestation)
    return (
      <Background>
        <SearchManifestationByProtocol
          label="Direcionar manifestação para secretária"
          handleFetch={handleManifestationSearch}
        />
      </Background>
    )

  return (
    <Background>
      <Container>
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

          <footer>
            <span>{manifestation.formattedDate}</span>
          </footer>

          <FormContext {...form}>
            <section>
              <header>
                <h2>Conteudo do email</h2>
                <Controller
                  as={<Select options={[]} />}
                  name="base"
                  placeholder="Selecione uma base"
                  alternativeStyle
                />
              </header>

              <form onSubmit={form.handleSubmit(handleSendMail)}>
                <Field
                  name="title"
                  placeholder="Título do email"
                  maxLength={145}
                />

                <Field
                  name="text"
                  component="textarea"
                  placeholder="Corpo do email"
                />
                <footer>
                  <Controller
                    as={<Select options={secretaryOptions} />}
                    name="secretary"
                    placeholder="Para qual secretaria enviar?"
                    alternativeStyle
                  />

                  <button type="submit">
                    {loading ? (
                      <ImpulseSpinner
                        frontColor="#fff"
                        size={42}
                        backColor="rgba(0,0,0,0.2)"
                      />
                    ) : (
                      <>Enviar</>
                    )}
                  </button>
                </footer>
              </form>
            </section>
          </FormContext>
        </div>
      </Container>
    </Background>
  )
}

export default SendPage
