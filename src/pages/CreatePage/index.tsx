import React, { useState, useEffect } from "react"
import { useForm, FormContext, Controller } from "react-hook-form"
import { toast } from "react-toastify"

import { Background } from "../../styles"
import { Container } from "./styles"
import Select from "../../components/Form/Select"
import Field from "../../components/Form/Field"
import FilesInput from "../../components/Form/FilesInput"
import Api from "../../services/api"
import { createManifestationSchema } from "../../validations"

type SelectItem = {
  value: string | number
  label: string
}

type CreateManifestationFormData = {
  title: string
  description: string
  type: SelectItem
  categories: SelectItem[]
  location: string
  files?: FileList
}

const CreatePage: React.FC = () => {
  const [typeOptions, setTypeOptions] = useState<SelectItem[]>([])
  const [categoryOptions, setCategoryOptions] = useState<SelectItem[]>([])

  const form = useForm<CreateManifestationFormData>({
    validationSchema: createManifestationSchema,
  })

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const typesResult = await Api.get<IType[]>({
          pathUrl: "type",
          error: false,
        })
        const categoriesResult = await Api.get<ICategory[]>({
          pathUrl: "category",
          error: false,
        })

        if (!typesResult || !categoriesResult) {
          throw Error
        }

        setTypeOptions(
          typesResult.map((type) => ({ value: type.id, label: type.title }))
        )
        setCategoryOptions(
          categoriesResult.map((category) => ({
            value: category.id,
            label: category.title,
          }))
        )
      } catch (err) {
        toast.error(
          "Não pôde pegar as opções de categorias e tipos de manifestações"
        )
      }
    }
    loadOptions()
  }, [])

  async function onSubmitClick(data: CreateManifestationFormData) {
    /**
     * UPLOAD DE MANIFESTAÇÃO
     */
    const formattedData = {
      ...data,
      type_id: data.type.value,
      categories_id: data.categories.map(
        (category: SelectItem) => category.value
      ),
    }

    const manifestation = await Api.post<IManifestation>({
      pathUrl: "/manifestation",
      data: formattedData,
    })

    if (manifestation) {
      toast.success(`Manifestação "${manifestation.title}" criada com sucesso!`)
    }
    /**
     * UPLOAD DE ARQUIVOS
     * O UPLOAD DEVERA SER POR ULTIMO
     */
    if (data.files && data.files.length > 0) {
      const formData = new FormData()

      formData.append("manifestation_id", manifestation.id.toString())
      Array.from(data.files).forEach((file) => {
        formData.append("file", file)
      })

      const files = await Api.post<IFile[]>({
        pathUrl: "/files",
        data: formData,
      })
      if (!files || files.length === 0) {
        toast.error("Envio de arquivo falhou inesperadamente")
      }
    }
  }

  return (
    <Background>
      <Container>
        <h1>Criar manifestação</h1>

        <FormContext {...form}>
          <form onSubmit={form.handleSubmit(onSubmitClick)}>
            <Field
              label="Título"
              name="title"
              placeholder="Um título que sumarize a manifestação"
            />
            <Field
              label="Descrição"
              component="textarea"
              name="description"
              placeholder="Descreva a manifestação"
              maxLength={900}
            />

            <Controller
              as={<Select isMulti options={categoryOptions} />}
              control={form.control}
              name="categories"
              label="Categories"
              placeholder="Categorias das manifestações"
            />

            <Controller
              as={<Select options={typeOptions} />}
              control={form.control}
              name="type"
              label="Tipos"
              placeholder="Tipos de manifestação"
            />

            <FilesInput name="files" label="Arquivos" />

            <Field label="Local" name="location" placeholder="O local" />

            <button type="submit">Criar manifestação</button>
          </form>
        </FormContext>
      </Container>
    </Background>
  )
}

export default CreatePage
