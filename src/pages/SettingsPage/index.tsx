/**
 * Nessa página o Admin Master configura os dados que podem mudar com o tempo.
 */
import React from "react"

import SettingsContainer from "./SettingsContainer"
import AboutContainer from "./AboutContainer"
import { Background, Container } from "./styles"

const SettingsPage: React.FC = () => {
  return (
    <Background>
      <Container>
        <header>
          <h1>Configurações</h1>
        </header>

        <SettingsContainer
          title="Categorias de manifestações"
          placeholder="Nova categoria"
          urlPath="category"
        />

        <SettingsContainer
          email
          accountable
          title="Secretarias municipais"
          placeholder="Nova secretaria"
          urlPath="secretary"
        />

        <AboutContainer />
      </Container>
    </Background>
  )
}

export default SettingsPage
