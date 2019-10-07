/**
 * O `Dispatch` do Redux utiliza uma `Action` para identificar a ação a ser tomada e
 * os dados que seram guardados
 *
 * Seguindo o padrão flux na criação das actions:
 * https://github.com/redux-utilities/flux-standard-action
 */

// requisição para editar o perfil
export function updateProfileRequest(data) {
  return {
    type: '@admin/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

// perfil editado com sucesso
export function updateProfileSuccess(profile) {
  return {
    type: '@admin/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

// falha na edição do perfil
export function updateProfileFailure() {
  return {
    type: '@admin/UPDATE_PROFILE_FAILURE',
  };
}
