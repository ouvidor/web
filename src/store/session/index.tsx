import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react"

import Api from "../../services/api"
import { toast } from "react-toastify"

interface SessionState {
  token: string
  city: string
  profile: IProfile
}

interface SignInRequest {
  email: string
  password: string
  city: string
}

interface SignInResult {
  user: IProfile
  city: string
  token: string
}

interface UpdateProfileRequest {
  id: number
  first_name?: string
  last_name?: string
  email?: string
  oldPassword?: string
  password?: string
}

interface UpdateProfileResult {
  id: number
  first_name: string
  last_name: string
  email: string
  role: "master" | "admin" | "citizen"
  created_at: string
  updated_at: string
}

interface SessionContextData {
  profile: IProfile
  city: string
  signIn(credentials: SignInRequest): Promise<void>
  signOut(): void
  updateProfile(data: UpdateProfileRequest): Promise<void>
}

// contêm o provider e o consumer, essencial para o uso do estado global
const SessionContext = createContext<SessionContextData>(
  {} as SessionContextData
)

const SessionContextProvider: React.FC = ({ children }) => {
  const [session, setSession] = useState<SessionState>(() => {
    const token = localStorage.getItem("@Ouvidor:token")
    const city = localStorage.getItem("@Ouvidor:city")
    const profile = localStorage.getItem("@Ouvidor:profile")

    if (!profile) {
      return {} as SessionState
    }

    const parsedProfile: IProfile = JSON.parse(profile)

    if (parsedProfile.role === "citizen") {
      return {} as SessionState
    }

    if (token && city) {
      Api.saveToken(token)
      return { token, profile: parsedProfile, city }
    }

    return {} as SessionState
  })

  useEffect(() => {
    Api.saveToken(session.token)
  }, [session])

  const signIn = useCallback(
    async ({ email, password, city }: SignInRequest) => {
      const signInResponse = await Api.post<SignInResult>({
        pathUrl: "auth",
        data: {
          email,
          password,
          city,
        },
      })

      if (signInResponse && signInResponse.data.user.role === "citizen") {
        toast.error("Cidadão não pode ter acesso")
      }

      if (!signInResponse || signInResponse.data.user.role === "citizen") {
        localStorage.removeItem("@Ouvidor:city")
        localStorage.removeItem("@Ouvidor:token")
        localStorage.removeItem("@Ouvidor:profile")
        setSession({} as SessionState)
        return
      }

      localStorage.setItem("@Ouvidor:city", signInResponse.data.city)
      localStorage.setItem("@Ouvidor:token", signInResponse.data.token)
      localStorage.setItem(
        "@Ouvidor:profile",
        JSON.stringify(signInResponse.data.user)
      )
      toast.success("Login foi feito com sucesso!")
      setSession({
        token: signInResponse.data.token,
        profile: signInResponse.data.user,
        city: signInResponse.data.city,
      })
    },
    []
  )

  const signOut = useCallback(() => {
    localStorage.removeItem("@Ouvidor:city")
    localStorage.removeItem("@Ouvidor:token")
    localStorage.removeItem("@Ouvidor:profile")

    toast.info("Você fez logout")

    setSession({} as SessionState)
  }, [])

  const updateProfile = useCallback(async (data: UpdateProfileRequest) => {
    const updateProfileResponse = await Api.put<UpdateProfileResult>({
      pathUrl: `user/${data.id}`,
      data,
    })

    if (!updateProfileResponse) {
      return
    }

    const updateProfileData = updateProfileResponse.data

    delete updateProfileData.created_at
    delete updateProfileData.updated_at

    localStorage.setItem("@Ouvidor:profile", JSON.stringify(updateProfileData))
    toast.success("Perfil atualizado com sucesso!")
    setSession((oldSession: SessionState) => ({
      ...oldSession,
      profile: updateProfileData,
    }))
  }, [])

  return (
    <SessionContext.Provider
      value={{
        profile: session.profile,
        city: session.city,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

function useSession(): SessionContextData {
  const session = useContext(SessionContext)

  if (!session) {
    throw new Error(
      "useSession deveria estar dentro de um componente SessionContextProvider"
    )
  }

  return session
}

export { SessionContextProvider, useSession }
