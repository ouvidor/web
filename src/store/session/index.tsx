import React, { createContext, useReducer, useEffect } from "react"
import sessionReducer from "./reducer"
import { Action } from "./actions"

import Api from "../../services/api"

export type Provided = {
  session: IStore
  dispatch: React.Dispatch<Action>
}

const initialState: IStore = {
  token: "",
  isSigned: false,
  profile: undefined,
}

// contêm o provider e o consumer, essencial para o uso do estado global
export const SessionContext = createContext<Provided>({
  session: initialState,
  dispatch: () => null,
})

const SessionContextProvider: React.FC = ({ children }) => {
  const [session, dispatch] = useReducer(sessionReducer, initialState, () => {
    const localData = localStorage.getItem("session")

    // usa os dados guardados no localStorage
    if (localData) {
      const parsedLocalData = JSON.parse(localData)
      const { token } = parsedLocalData
      Api.saveToken(token) // coloca o token salvo no axios
      return parsedLocalData
    }

    // caso não tenha nada no localStorage
    return initialState
  })

  useEffect(() => {
    localStorage.setItem("session", JSON.stringify(session))
    // sempre que o token mudar ele é salvo na config do axios
    Api.saveToken(session.token)
  }, [session])

  return (
    <SessionContext.Provider value={{ session, dispatch }}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionContextProvider
