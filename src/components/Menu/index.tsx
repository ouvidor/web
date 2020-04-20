/**
 * Componente Menu
 * Usado para navegação, fica fixo no canto esquerdo da tela
 * Recebe o tipo do usuário e renderiza apenas as opções disponíveis a ele
 */
import React, { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  MdMap,
  MdVisibility,
  MdCreate,
  MdEqualizer,
  MdSend,
  MdMore,
  MdSettings,
  MdFace,
  MdAccountBalance,
} from "react-icons/md"
import { IconType } from "react-icons"
import decodeJWT from "jwt-decode"

import { SessionContext } from "../../store/session"
import { Container, Item, ActiveIndicator } from "./styles"

type Props = {
  to: string
  Icon: IconType
}

function CustomLink({ to, Icon }: Props) {
  const { pathname } = useLocation()
  return (
    <Item>
      <Link to={to}>
        <Icon />
      </Link>
      {to === pathname && <ActiveIndicator />}
    </Item>
  )
}

export default function Menu() {
  // pega o token e checa a Role
  let isAdminMaster = false
  const { session } = useContext(SessionContext)
  const { token } = session
  const tokenPayload = token && decodeJWT<IToken>(token)

  if (tokenPayload) {
    const role = tokenPayload.role
    isAdminMaster = role.title === "master"
  }

  return (
    <Container>
      <ul>
        <CustomLink to="/map" Icon={MdMap} />
        <CustomLink to="/recent" Icon={MdVisibility} />
        <CustomLink to="/create" Icon={MdCreate} />
        <CustomLink to="/statistics" Icon={MdEqualizer} />
        <CustomLink to="/send" Icon={MdSend} />
        <CustomLink to="/status" Icon={MdMore} />
        {isAdminMaster && <CustomLink to="/settings" Icon={MdSettings} />}
      </ul>
      <ul>
        <CustomLink to="/public-info" Icon={MdAccountBalance} />
        <CustomLink to="/profile" Icon={MdFace} />
      </ul>
    </Container>
  )
}
