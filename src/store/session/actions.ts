/**
 * O `Dispatch` utiliza uma `Action` para identificar a ação a ser tomada e
 * os dados que seram guardados
 */

type SignInProps = {
  token: string
  profile: IProfile
}

type UpdateProfileProps = {
  profile: IProfile
}

export type Action =
  | { type: "SIGN_IN"; payload: SignInProps }
  | { type: "SIGN_OUT" }
  | { type: "UPDATE_PROFILE"; payload: UpdateProfileProps }

// login
export function signIn({ token, profile }: SignInProps): Action {
  return {
    type: "SIGN_IN",
    payload: { token, profile },
  }
}

// logout
export function signOut(): Action {
  return { type: "SIGN_OUT" }
}

// update profile
export function updateProfile({ profile }: UpdateProfileProps): Action {
  return { type: "UPDATE_PROFILE", payload: { profile } }
}
