/**
 * O `Dispatch` do Redux utiliza uma `Action` para identificar a ação a ser tomada e
 * os dados que seram guardados
 *
 * Seguindo o padrão flux na criação das actions:
 * https://github.com/redux-utilities/flux-standard-action
 */

// requisição para login
export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

// sucesso no login
export function signInSuccess(token, admin) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, admin },
  };
}

// falha no login
export function signFailure() {
  return { type: '@auth/SIGN_FAILURE' };
}

// logout
export function signOut() {
  return { type: '@auth/SIGN_OUT' };
}
