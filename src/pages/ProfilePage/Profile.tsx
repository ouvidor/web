import React from "react"

type Props = {
  profile: IProfile
}

export default function Profile({ profile }: Props) {
  return (
    <section>
      <div>
        <p>
          Nome <span>{`${profile.first_name} ${profile.last_name}`}</span>
        </p>
        <p>
          Email <span>{profile.email}</span>
        </p>
        <p>
          Cargo <span>{profile.role[0]}</span>
        </p>
      </div>
    </section>
  )
}
