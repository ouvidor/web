import React, { useState, useEffect } from "react"

import Api from "../../services/api"
import { MembersContainer } from "./styles"

const VisualizeAdmins = () => {
  const [users, setUsers] = useState<IProfile[]>([])

  useEffect(() => {
    async function loadUsers() {
      const usersResult = await Api.get<IProfile[]>({ pathUrl: `/admins` })

      setUsers(usersResult)
    }
    loadUsers()
  }, [])

  return (
    <MembersContainer>
      <h1>Veja os outros administradores</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.first_name}</li>
        ))}
      </ul>
    </MembersContainer>
  )
}

export default VisualizeAdmins
