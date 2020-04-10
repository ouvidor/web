import React, { useEffect, useState } from "react"
import { useForm, FormContext, Controller } from "react-hook-form"
import { CircleSpinner } from "react-spinners-kit"
import { MdSearch } from "react-icons/md"
import { toast } from "react-toastify"
import nanoid from "nanoid"

import Select, { GroupedOptions, Option } from "../Form/Select"
import Field from "../Form/Field"
import { StyledForm, TextInputContainer } from "./styles"
import Api from "../../services/api"
import { searchManifestationsSchema } from "../../validations"

export type SearchManifestationFormData = {
  text?: string
  selections?: Option[] | null
}

export type SearchData = {
  text?: string
  options?: string[]
}

type Props = {
  setSearchData(data: SearchData): void
  loading?: boolean
}

export default function SearchManifestationsForm({
  setSearchData,
  loading = false,
}: Props) {
  const [options, setOptions] = useState<GroupedOptions[]>([])

  const form = useForm<SearchManifestationFormData>({
    validationSchema: searchManifestationsSchema,
  })

  // pega as categorias e tipos e coloca nas opções
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const types = await Api.get<IType[]>({ pathUrl: "type", error: false })
        const categories = await Api.get<ICategory[]>({
          pathUrl: "category",
          error: false,
        })
        // Gera IDs randomicos seguros para não conflitarem entre si
        const formattedTypeOptions = types.map((type) => ({
          label: type.title,
          value: nanoid(),
        }))
        const formattedCategoryOptions = categories.map((category) => ({
          label: category.title,
          value: nanoid(),
        }))
        const groupedOptions = [
          { label: "Tipos", options: formattedTypeOptions },
          { label: "Categorias", options: formattedCategoryOptions },
        ]
        setOptions(groupedOptions)
      } catch (error) {
        toast.error("Não pôde buscar as opções de pesquisa do servidor")
      }
    }
    loadOptions()
  }, [])

  function handleSubmitClick(data: SearchManifestationFormData) {
    const formattedData: SearchData = {}

    if (data.text) {
      formattedData.text = data.text
    }

    if (data.selections) {
      formattedData.options = data.selections.map(
        (selection) => selection.label
      )
    }
    console.log(formattedData)

    setSearchData(formattedData)
  }

  return (
    <FormContext {...form}>
      <StyledForm onSubmit={form.handleSubmit(handleSubmitClick)}>
        <TextInputContainer>
          <Field name="text" placeholder="Protocolo ou título" />

          <button type="submit">
            {loading ? (
              <CircleSpinner size={15} color="rgba(255, 255, 255, 0.6)" />
            ) : (
              <MdSearch />
            )}
          </button>
        </TextInputContainer>
        <Controller
          as={<Select isMulti options={options} />}
          control={form.control}
          name="selections"
          placeholder="Filtros"
        />
      </StyledForm>
    </FormContext>
  )
}
