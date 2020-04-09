import React, { useEffect } from "react"
import { useForm, FormContext } from "react-hook-form"
import { CircleSpinner } from "react-spinners-kit"
import { MdSearch } from "react-icons/md"
// import { toast } from "react-toastify"
// import nanoid from "nanoid"
// import { GroupedOptionsType } from "react-select"

// import Select from "../Form/Select"
import Field from "../Form/Field"
import { StyledForm, TextInputContainer } from "./styles"
// import Api from "../../services/api"
import { searchManifestationsSchema } from "../../validations"

export type SearchManifestationFormData = {
  text?: string
  selections?: GroupedOptions
}

type GroupedOptions = {
  label: string
  options: {
    id: string
    title: string
  }[]
}

type Props = {
  setSearchData(data: SearchManifestationFormData): void
  loading?: boolean
}

export default function SearchManifestationsForm({
  setSearchData,
  loading = false,
}: Props) {
  // const [options, setOptions] = useState([])

  const form = useForm<SearchManifestationFormData>({
    validationSchema: searchManifestationsSchema,
  })

  // pega as categorias e tipos e coloca nas opções
  useEffect(() => {
    // const loadOptions = async () => {
    //   try {
    //     const types = await Api.get<IType[]>({ pathUrl: "type", error: false })
    //     const categories = await Api.get<ICategory[]>({
    //       pathUrl: "category",
    //       error: false,
    //     })
    //     // Gera IDs randomicos seguros para não conflitarem entre si
    //     const typesWithRandomId = types.map((type) => ({
    //       title: type.title,
    //       id: nanoid(),
    //     }))
    //     const categoriesWithRandomId = categories.map((category) => ({
    //       title: category.title,
    //       id: nanoid(),
    //     }))
    //     const groupedOptions = [
    //       { label: "Tipos", options: typesWithRandomId },
    //       { label: "Categorias", options: categoriesWithRandomId },
    //     ]
    //     setOptions(groupedOptions)
    //   } catch (error) {
    //     toast.error("Não pôde buscar as opções de pesquisa do servidor")
    //   }
    // }
    // loadOptions()
  }, [])

  function handleSubmitClick(data: SearchManifestationFormData) {
    // filtrar opções
    let formattedArrayOfSelections = []
    if (Array.isArray(data.selections)) {
      formattedArrayOfSelections = data.selections.map(
        (selection) => selection.title
      )
    }
    const formattedOptions = {
      text: data.text,
      options: formattedArrayOfSelections,
    }
    setSearchData(formattedOptions)
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
        {/* <Controller
          as={<Select multiple options={options} />}
          control={form.control}
          name="selections"
          placeholder="Filtros"
        /> */}
      </StyledForm>
    </FormContext>
  )
}
