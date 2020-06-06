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

  const handleChangeAdminRole = useCallback(
    async (userId: number, turnIntoAdmin: boolean) => {
      await Api.patch({
        pathUrl: `admins/${userId}`,
        data: { admin: turnIntoAdmin },
      })
    },
    []
  )

  const fetchUserByEmail = useCallback(async (data: SearchUserFormData) => {
    const userResponse = await Api.get<IProfile>({
      pathUrl: "/user/search",
      config: { params: { email: data.email } },
    })

    if (!userResponse) {
      return
    }

    setUser(userResponse.data)
  }, [])

  const handleAdminStatus = useCallback((admin) => {
    handleChangeAdminRole(admin.id, admin.role === "citizen")

    setAdmins((oldAdmins) =>
      oldAdmins.map((oldAdm) => {
        if (oldAdm.id === admin.id) {
          return {
            ...oldAdm,
            role: admin.role === "citizen" ? "admin" : "citizen",
          }
        }
        return oldAdm
      })
    )
  }, [])

  const handleTransformUserIntoAdmin = useCallback((user) => {
    handleChangeAdminRole(user.id, user.role === "citizen")
    setUser({
      ...user,
      role: user.role === "citizen" ? "admin" : "citizen",
    })
    if (user.role === "citizen") {
      setAdmins((oldAdmins) => [
        ...oldAdmins,
        {
          ...user,
          role: user.role === "citizen" ? "admin" : "citizen",
        },
      ])
    } else {
      setAdmins((oldAdmins) =>
        oldAdmins.filter((oldAdmin) => {
          if (oldAdmin.id === user.id) return false
          return true
        })
      )
    }
  }, [])

  return (
    <>
      <MembersContainer>
        <h1>Veja os outros administradores</h1>
        <ul>
          {admins.map((admin) => (
            <li key={admin.id}>
              <div>
                <span>{admin.first_name}</span>
                <span>{admin.email}</span>
                <span>{admin.role}</span>
              </div>
              <div>
                Admin:
                <input
                  type="checkbox"
                  disabled={admin.role === "master"}
                  checked={admin.role === "master" || admin.role === "admin"}
                  onClick={() => handleAdminStatus(admin)}
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

            <p>É um administrador? :</p>

            <input
              type="checkbox"
              disabled={user.role === "master"}
              checked={user.role === "master" || user.role === "admin"}
              onClick={() => handleTransformUserIntoAdmin(user)}
            />
          </div>
        )}
      </UsersContainer>
    </>
  )
}

export default VisualizeAdmins
