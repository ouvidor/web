/**
 * Conceitos de um `Reducer`:
 * O reducer deve ser puro, que significa que não faz chamadas a API, não tem funções não puras,
 * que não faz mutações no estado atual, apenas cria um novo estado.
 */

export default function auth(state, action) {
  switch (action.type) {
    case 'SIGN_IN':
      // aplica o token recebido no login, salva o perfil e marca o admin como logado
      return {
        profile: action.payload.profile,
        token: action.payload.token,
        isSigned: true,
      };

    case 'SIGN_OUT':
      // retira o token, o perfil e marca o admin como deslogado
      return { token: null, isSigned: false, profile: null };

    default:
      return state;
  }
}
