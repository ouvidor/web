import React from 'react';

import FilterSearch from '../../components/FilterSearch';
import Pagination from '../../components/Pagination';
import Tag from '../../components/Tag';
import { Background, Container } from '../../styles';
import { ManifestationList } from './styles';

export default function RecentsPage() {
  return (
    <Background>
      <Container>
        <header>
          <h1>Novas manifestações</h1>
          <FilterSearch />
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
