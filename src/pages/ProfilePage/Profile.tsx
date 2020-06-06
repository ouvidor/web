import React from "react"

import { useSession } from "../../store/session"
import { ProfileContainer } from "./styles"

type Props = {
  profile: IProfile
}

export default function Profile({ profile }: Props) {
  const { signOut } = useSession()

  return (
    <ProfileContainer>
      <h1>Meu Perfil</h1>
      <div>
        <p>
          <span>Nome:</span>
          {`${profile.first_name} ${profile.last_name}`}
        </p>
        <p>
          <span>Email:</span>
          {profile.email}
        </p>
        <p>
          <span>Cargo:</span>
          {profile.role}
        </p>
      </div>
      <button onClick={signOut}>Sair do sessão</button>
    </ProfileContainer>
  )
}
