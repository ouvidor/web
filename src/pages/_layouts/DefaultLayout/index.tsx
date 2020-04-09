/**
 * Componente Wrapper para colocar um Menu no canto
 */
import React from "react"

import Menu from "../../../components/Menu"
import { Wrapper } from "./styles"

const DefaultLayout: React.FC = ({ children }) => (
  <>
    <Menu />
    <Wrapper>{children}</Wrapper>
  </>
)

export default DefaultLayout
