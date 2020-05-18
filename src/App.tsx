/**
 * Base da aplicação
 * Composta de rotas, estilização global,
 * notificação global atráves do `react-toastify` e
 * contextApi para estado global da aplicação
 */

import React from "react"
import { Router } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import GlobalStyle from "./styles/global"
import Routes from "./routes"
import { SessionContextProvider } from "./store/session"

// react-router-dom ouvirá por mudanças que acontecerem no history
import history from "./services/history"

function App() {
  return (
    <>
      <GlobalStyle />
      <SessionContextProvider>
        <Router history={history}>
          <Routes />
          <ToastContainer autoClose={9000} hideProgressBar={false} />
        </Router>
      </SessionContextProvider>
    </>
  )
}

export default App
