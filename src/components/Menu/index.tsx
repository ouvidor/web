/**
 * Componente Menu
 * Usado para navegação, fica fixo no canto esquerdo da tela
 * Recebe o tipo do usuário e renderiza apenas as opções disponíveis a ele
 */
import React from "react"
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

import { useSession } from "../../store/session"
import { Container, Item, ActiveIndicator } from "./styles"

type Props = {
  to: string
  Icon: IconType
}

function CustomLink({ to, Icon }: Props) {
  const { pathname } = useLocation()
  const isActive = pathname.startsWith(to)
  return (
    <Item>
      <Link to={to}>
        <Icon />
      </Link>
      {isActive && <ActiveIndicator />}
    </Item>
  )
}

export default function Menu() {
  // pega o token e checa a Role
  const { profile } = useSession()

  return (
    <Container>
      <ul>
        <CustomLink to="/map" Icon={MdMap} />
        <CustomLink to="/recent" Icon={MdVisibility} />
        <CustomLink to="/create" Icon={MdCreate} />
        <CustomLink to="/statistics" Icon={MdEqualizer} />
        <CustomLink to="/send" Icon={MdSend} />
        <CustomLink to="/status" Icon={MdMore} />
        {profile.role === "master" && (
          <CustomLink to="/settings" Icon={MdSettings} />
        )}
      </ul>
      <ul>
        <CustomLink to="/public-info" Icon={MdAccountBalance} />
        <CustomLink to="/profile" Icon={MdFace} />
      </ul>
    </Container>
  )
}
