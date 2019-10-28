import React from 'react';

import SearchManifestationsForm from '../../components/SearchManifestationsForm';
import Pagination from '../../components/Pagination';
import Tag from '../../components/Tag';
import { Background } from '../../styles';
import { Container, ManifestationList } from './styles';

export default function RecentsPage() {
  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Background>
      <Container>
        <header>
          <h1>Novas manifestações</h1>
          <SearchManifestationsForm onSubmit={handleSubmit} />
        </header>

        <section>
          <Pagination />
          <ManifestationList>
            <li>
              <span>Buraco na rua</span>
              <aside>
                <div />
                <ul>
                  <Tag key={1} tag={{ name: 'Rua' }} />
                  <Tag key={2} tag={{ name: 'Reclamação' }} />
                </ul>
              </aside>
            </li>
          </ManifestationList>
        </section>
      </Container>
    </Background>
  );
}
