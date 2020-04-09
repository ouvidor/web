import React from "react"
import ReactSelect, { Props as SelectProps, OptionTypeBase } from "react-select"
import { ErrorMessage, useFormContext } from "react-hook-form"

import { FieldError } from "../../../styles"
import { basic, alternative, Container } from "./styles"

type Props = SelectProps<OptionTypeBase> & {
  label?: string
  name?: string
  alternativeStyle?: boolean
}

export default function Select({
  label = undefined,
  name,
  alternativeStyle = false,
  options = [],
  multiple = false,
  ...props
}: Props) {
  const { errors } = useFormContext()

  // const formatGroupLabel = ({ options, label }: GroupType<Option>) => (
  //   <GroupLabelContainer>
  //     <span>{label}</span>
  //     <span>{options.length}</span>
  //   </GroupLabelContainer>
  // )

  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <ReactSelect
        name={name}
        styles={alternativeStyle ? alternative : basic}
        options={options}
        isMulti={multiple}
        // formatGroupLabel={formatGroupLabel}
        {...props}
      />
      {/* <ReactSelect
        styles={alternativeStyle ? alternative : basic}
        getOptionValue={(option: Option) => option.id}
        getOptionLabel={(option) => option.title}
        name={name}
        isMulti={multiple}
        options={options}
        formatGroupLabel={formatGroupLabel}
        {...props}
      /> */}
      {name && (
        <ErrorMessage name={name} errors={errors}>
          {({ message }) => <FieldError>{message}</FieldError>}
        </ErrorMessage>
      )}
    </Container>
  )
}
