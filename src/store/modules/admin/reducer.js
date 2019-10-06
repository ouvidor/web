/**
 * Conceitos de um `Reducer`:
 * O reducer deve ser puro, que significa que não faz chamadas a API, não tem funções não puras,
 * que não faz mutações no estado atual, apenas cria um novo estado.
 */

const INTIAL_STATE = {
  profile: null,
};

export default function admin(state = INTIAL_STATE, action) {
  switch (action.type) {
    case '@admin/UPDATE_PROFILE_SUCCESS':
      // guarda o perfil editado
      return { profile: action.payload.profile };

    case '@auth/SIGN_IN_SUCCESS':
      // guarda o perfil recebido da API
      return { profile: action.payload.admin };

    case '@auth/SIGN_OUT':
      return { profile: null };

    default:
      return state;
  }
}
