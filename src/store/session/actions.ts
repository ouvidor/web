/**
 * O `Dispatch` utiliza uma `Action` para identificar a ação a ser tomada e
 * os dados que seram guardados
 */

type SignInProps = {
  token: string
  profile: IProfile
}

export type Action =
  | { type: "SIGN_IN"; payload: SignInProps }
  | { type: "SIGN_OUT" }

// login
export function signIn({ token, profile }: SignInProps): Action {
  return {
    type: "SIGN_IN",
    payload: { token, profile },
  }
}

// logout
export function signOut() {
  return { type: "SIGN_OUT" }
}
