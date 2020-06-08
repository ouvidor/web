import React, { useState, useEffect, useCallback } from "react"
import { useForm, FormContext } from "react-hook-form"

import Api from "../../services/api"
import Field from "../../components/Form/Field"
import {
  MembersContainer,
  UserContainer,
  AdminList,
  TransformIntoAdminCheckContainer,
} from "./styles"

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

  const handleAdminStatus = useCallback(
    (admin) => {
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
    },
    [handleChangeAdminRole]
  )

  const handleTransformUserIntoAdmin = useCallback(
    (user) => {
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
    },
    [handleChangeAdminRole]
  )

  return (
    <>
      <UserContainer>
        <h1>Pesquisar por cidadão</h1>
        <FormContext {...form}>
          <form onSubmit={form.handleSubmit(fetchUserByEmail)}>
            <Field name="email" label="Email" />

            <button type="submit">Pesquisar</button>
          </form>
        </FormContext>
        {user && (
          <div>
            <div>
              <p>
                <span>Nome:</span>
                {`${user.first_name} ${user.last_name}`}
              </p>
              <p>
                <span>Email:</span>
                {user.email}
              </p>
              <p>
                <span>Cargo:</span>
                {user.role}
              </p>
            </div>
            <TransformIntoAdminCheckContainer>
              <span>É um administrador: </span>

              <input
                type="checkbox"
                disabled={user.role === "master"}
                checked={user.role === "master" || user.role === "admin"}
                onClick={() => handleTransformUserIntoAdmin(user)}
              />
            </TransformIntoAdminCheckContainer>
          </div>
        )}
      </UserContainer>
      <MembersContainer>
        <h1>Veja os outros administradores</h1>
        <AdminList>
          {admins.map((admin) => (
            <li key={admin.id}>
              <section>
                <p>
                  <span>nome:</span>
                  {admin.first_name} {admin.last_name}
                </p>
                <p>
                  <span>email:</span> {admin.email}
                </p>
                <p>
                  <span>cargo:</span>
                  {admin.role}
                </p>
              </section>
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
        </AdminList>
      </MembersContainer>
    </>
  )
}

export default VisualizeAdmins
