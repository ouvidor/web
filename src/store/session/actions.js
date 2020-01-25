/**
 * O `Dispatch` utiliza uma `Action` para identificar a ação a ser tomada e
 * os dados que seram guardados
 */

// login
export function signIn({ token, profile }) {
  return {
    type: 'SIGN_IN',
    payload: { token, profile },
  };
}

// logout
export function signOut() {
  return { type: 'SIGN_OUT' };
}
