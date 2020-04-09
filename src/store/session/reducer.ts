/**
 * Conceitos de um `Reducer`:
 * O reducer deve ser puro, que significa que não faz chamadas a API, não tem funções não puras,
 * que não faz mutações no estado atual, apenas cria um novo estado.
 */
import { Action } from "./actions"

export default function auth(state: IStore, action: Action): IStore {
  switch (action.type) {
    case "SIGN_IN":
      // aplica o token recebido no login, salva o perfil e marca o admin como logado
      return {
        profile: action.payload.profile,
        token: action.payload.token,
        isSigned: true,
      }

    case "SIGN_OUT":
      // retira o token, o perfil e marca o admin como deslogado
      return { token: "", isSigned: false, profile: undefined }

    default:
      return state
  }
}
