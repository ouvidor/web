import React, { useState, useEffect, useCallback } from "react"
import { useForm, FormContext } from "react-hook-form"
import { toast } from "react-toastify"

import Api from "../../services/api"
import Field from "../../components/Form/Field"
import { MembersContainer, UsersContainer } from "./styles"

interface SearchUserFormData {
  email: string
}

const VisualizeAdmins = () => {
  const [user, setUser] = useState<IProfile>()
  const [admins, setAdmins] = useState<IProfile[]>([])

  const form = useForm<SearchUserFormData>()

  useEffect(() => {
    async function loadUsers() {
      const usersResponse = await Api.get<IProfile[]>({ pathUrl: `/admins` })

      if (!usersResponse) {
        return
      }

      setAdmins(usersResponse.data)
    }
    loadUsers()
  }, [])

  const handleAdminRole = useCallback(
    async (userId: number, turnIntoAdmin: boolean) => {
      await Api.patch({
        pathUrl: `admins/${userId}`,
        params: { admin: turnIntoAdmin },
      })
    },
    []
  )

  const fetchUserByEmail = useCallback(async (data: SearchUserFormData) => {
    const userResponse = await Api.get<IProfile>({
      pathUrl: "/user/search",
      params: { email: data.email },
    })

    if (!userResponse) {
      return
    }

    toast.success("Usuário encontrado")
    setUser(userResponse.data)
  }, [])

  return (
    <>
      <MembersContainer>
        <h1>Veja os outros administradores</h1>
        <ul>
          {admins.map((user) => (
            <li key={user.id}>
              <div>
                <span>{user.first_name}</span>
                <span>{user.email}</span>
                <span>{user.role}</span>
              </div>
              <div>
                Admin:
                <input
                  type="checkbox"
                  disabled={user.role === "master"}
                  checked={user.role === "master" || user.role === "admin"}
                  onClick={() =>
                    handleAdminRole(
                      user.id,
                      user.role === "citizen" ? true : false
                    )
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      </MembersContainer>
      <UsersContainer>
        <h2>Pesquisar por cidadão</h2>
        <FormContext {...form}>
          <form onSubmit={form.handleSubmit(fetchUserByEmail)}>
            <Field name="email" label="Email" />

            <button type="submit">Pesquisar</button>
          </form>
        </FormContext>
        {user && (
          <div>
            <p>{user.email}</p>
            <p>
              {user.first_name} {user.last_name}
            </p>
            <span>{user.role}</span>

            <p>
              {user.role === "citizen"
                ? "Tornar um administrador?"
                : "Tornar um cidadão?"}
            </p>

            <input
              type="checkbox"
              disabled={user.role === "master"}
              checked={user.role === "master" || user.role === "admin"}
              onClick={() => {
                handleAdminRole(user.id, user.role === "citizen" ? true : false)
                setUser({
                  ...user,
                  role: user.role === "citizen" ? "admin" : "citizen",
                })
              }}
            />
          </div>
        )}
      </UsersContainer>
    </>
  )
}

export default VisualizeAdmins
