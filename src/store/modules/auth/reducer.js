/**
 * Conceitos de um `Reducer`:
 * O reducer deve ser puro, que significa que não faz chamadas a API, não tem funções não puras,
 * que não faz mutações no estado atual, apenas cria um novo estado.
 */

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_REQUEST':
      return { ...state, loading: true };

    case '@auth/SIGN_IN_SUCCESS':
      // aplica o token recebido no login e marca o admin como logado
      return { token: action.payload.token, signed: true, loading: false };

    case '@auth/SIGN_FAILURE':
      return { ...state, loading: false };

    case '@auth/SIGN_OUT':
      // retira o token e marca o admin como deslogado
      return { token: null, signed: false, loading: false };

    default:
      return state;
  }
}
