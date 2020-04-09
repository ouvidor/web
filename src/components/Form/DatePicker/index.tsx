import React from "react"
import VendorDatePicker from "react-date-picker"

type Props = {
  label?: string
  name: string
}

const Datepicker = ({ label, name, ...props }: Props) => (
  <div>
    {label && <label htmlFor={name}>{name}</label>}
    <VendorDatePicker name={name} {...props} />
  </div>
)

export default Datepicker
