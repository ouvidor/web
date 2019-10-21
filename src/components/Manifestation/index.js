import React from 'react';
import PropTypes from 'prop-types';
import {
  MdAttachFile,
  MdDateRange,
  MdLocationOn,
  MdMoreVert,
} from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Tag from '../Tag';
import { Container, Header, DetailsContainer, Footer } from './styles';

export default function Manifestation({ manifestation }) {
  const { title, tags, description, date, location, protocol } = manifestation;
  const formattedDate =
    date &&
    format(parseISO(date), "dd 'de' MMMM 'de' yyyy", {
      locale: pt,
    });

  function openConfig() {
    console.log('abrindo configs');
  }

  function openAttached() {
    console.log('pagina de anexo');
  }

  function handleSend() {
    console.log('pagina para direcionar secretaría');
  }

  return (
    <Container>
      <Header>
        <div>
          <h1>{title}</h1>
          <MdMoreVert
            color="black"
            size="18"
            onClick={openConfig}
            cursor="pointer"
          />
        </div>

        <span>protocolo: {protocol}</span>

        <section>
          <div>{tags && tags.map(tag => <Tag key={tag} tag={tag} />)}</div>
          <button type="button" onClick={openAttached}>
            <MdAttachFile color="black" size="14" />
            &nbsp;Anexos
          </button>
        </section>
      </Header>

      <DetailsContainer>
        <p>{description}</p>
        <br />

        {formattedDate && (
          <div>
            <MdDateRange size="14px" />
            Data: {formattedDate}
          </div>
        )}
        {location && (
          <div>
            <MdLocationOn size="14px" />
            Local: {location}
          </div>
        )}
      </DetailsContainer>

      <Footer>
        <button type="button" onClick={handleSend}>
          Direcionar para secretária
        </button>
      </Footer>
    </Container>
  );
}

Manifestation.propTypes = {
  manifestation: PropTypes.shape({
    title: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      })
    ),
    upvotes: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
    protocol: PropTypes.string,
  }),
};

Manifestation.defaultProps = {
  manifestation: {
    title: 'Título',
    tags: [],
    upvotes: 0,
    description: '',
    date: '',
    location: '',
    protocol: '0',
  },
};
