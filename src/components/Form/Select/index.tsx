import React from "react"
import ReactSelect, { Props as SelectProps, OptionTypeBase } from "react-select"
import { ErrorMessage, useFormContext } from "react-hook-form"

import { FieldError } from "../../../styles"
import { basic, alternative, Container, GroupLabelContainer } from "./styles"

export type Option = {
  value: string | number
  label: string
}

export type GroupedOptions = {
  label: string
  options: Option[]
}

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
  ...props
}: Props) {
  const { errors } = useFormContext()

  const formatGroupLabel = (props: any) => (
    <GroupLabelContainer>
      <span>{props.label}</span>
      <span>{props.options.length}</span>
    </GroupLabelContainer>
  )

  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <ReactSelect
        name={name}
        styles={alternativeStyle ? alternative : basic}
        options={options}
        formatGroupLabel={formatGroupLabel}
        {...props}
      />
      {name && (
        <ErrorMessage name={name} errors={errors}>
          {({ message }) => <FieldError>{message}</FieldError>}
        </ErrorMessage>
      )}
    </Container>
  )
}
