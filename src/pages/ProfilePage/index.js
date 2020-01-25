import React, { useContext } from 'react';

import { SessionContext } from '../../store/session';
import { Background } from '../../styles';
import { ProfileContainer } from './styles';

export default function ProfilePage() {
  const { session } = useContext(SessionContext);
  const { profile } = session;

  return (
    <Background>
      <>
        <h1>Seu perfil</h1>
        <ProfileContainer>
          <p>
            Nome completo:
            <span>Pedro Henrique Pinho Vieira</span>
          </p>
          <p>
            Email:
            <span>rihor1000@gmail.com</span>
          </p>
          <button type="button">Editar</button>
        </ProfileContainer>

        <hr />
        <h2>Outros administradores</h2>
        <ProfileContainer>
          <ul>
            <li>
              <span>Nome do administrador</span>
              <aside>
                <span>Administrador</span>
                <section>
                  <button type="button">Tornar líder</button>
                  <button type="button">Excluir</button>
                </section>
              </aside>
            </li>
          </ul>
        </ProfileContainer>
      </>
    </Background>
  );
}
