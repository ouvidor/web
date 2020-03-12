import React, { useContext, useState } from 'react';

import EditProfileForm from './EditProfileForm';
import SearchForm from './SearchForm';
import { SessionContext } from '../../store/session';
import { Background } from '../../styles';
import {
  BoxesContainer,
  UserContainer,
  ProfileContainer,
  EditProfileContainer,
  MembersContainer,
  SearchContainer,
  Scroll,
} from './styles';

export default function ProfilePage() {
  const [isEditOpen, setEditOpen] = useState(false);
  const [members, setMembers] = useState([
    { id: 1, first_name: 'Agostinho' },
    { id: 2, first_name: 'Agostinho' },
    { id: 3, first_name: 'Agostinho' },
    { id: 4, first_name: 'Agostinho' },
    { id: 5, first_name: 'Agostinho' },
    { id: 6, first_name: 'Agostinho' },
    { id: 7, first_name: 'Agostinho' },
    { id: 8, first_name: 'Agostinho' },
    { id: 9, first_name: 'Agostinho' },
    { id: 10, first_name: 'Agostinho' },
    { id: 11, first_name: 'Agostinho' },
    { id: 12, first_name: 'Agostinho' },
    { id: 13, first_name: 'Agostinho' },
    { id: 14, first_name: 'Agostinho' },
  ]);

  const { session } = useContext(SessionContext);
  const { profile } = session;

  return (
    <Background>
      <h1>Perfil</h1>

      <BoxesContainer>
        <UserContainer>
          <ProfileContainer>
            <p>
              {profile.first_name} {profile.last_name}
            </p>
            <span>{profile.email}</span>
            <span>{profile.role.map(role => role.title)}</span>
            <button type="button" onClick={() => setEditOpen(!isEditOpen)}>
              Editar perfil
            </button>
          </ProfileContainer>
          {isEditOpen && (
            <EditProfileContainer>
              <EditProfileForm profile={profile} />
            </EditProfileContainer>
          )}
        </UserContainer>

        <MembersContainer>
          <Scroll>
            <ul>
              {members.map(member => (
                <li key={member.id}>{member.first_name}</li>
              ))}
            </ul>
          </Scroll>
        </MembersContainer>

        <SearchContainer>
          <SearchForm />
        </SearchContainer>
      </BoxesContainer>
    </Background>
  );
}
