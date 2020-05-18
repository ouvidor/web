import React from "react"

import { ProfileContainer } from "./styles"

type Props = {
  profile: IProfile
}

export default function Profile({ profile }: Props) {
  return (
    <ProfileContainer>
      <div>
        <p>
          Nome: <span>{`${profile.first_name} ${profile.last_name}`}</span>
        </p>
        <p>
          Email: <span>{profile.email}</span>
        </p>
        <p>
          Cargo: <span>{profile.role}</span>
        </p>
      </div>
    </ProfileContainer>
  )
}
