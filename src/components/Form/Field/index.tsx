import React, { useState, useRef, useEffect } from "react"
import { ErrorMessage, useFormContext } from "react-hook-form"

import { FieldError } from "../../../styles"
import { Container } from "./styles"

type Props = {
  label?: string
  name: string
  component?: "text" | "textarea"
  placeholder?: string
  maxLength?: number
  type?: "email" | "password"
}

function Field({
  label = undefined,
  name,
  component = "text",
  placeholder = "",
  maxLength = 100,
  ...props
}: Props) {
  const [height, setHeight] = useState(0)
  const { register, errors } = useFormContext()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current !== null) {
      setHeight(containerRef.current.clientHeight)
    }
  }, [])

  return (
    <Container ref={containerRef}>
      {label && <label htmlFor={name}>{label}</label>}

      {component === "textarea" ? (
        <textarea
          ref={register}
          placeholder={placeholder}
          name={name}
          maxLength={maxLength}
          {...props}
        />
      ) : (
        <input
          ref={register}
          placeholder={placeholder}
          name={name}
          maxLength={maxLength}
          {...props}
        />
      )}

      <ErrorMessage errors={errors} name={name}>
        {({ message }) => <FieldError height={height}>{message}</FieldError>}
      </ErrorMessage>
    </Container>
  )
}

export default Field
