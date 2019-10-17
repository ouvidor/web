import React from 'react';
import PropTypes from 'prop-types';
import {
  MdAttachFile,
  MdDateRange,
  MdLocationOn,
  MdMoreVert
} from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Tag from '../Tag';
import { Container } from './styles';

export default function Manifestation({ manifestation }) {
  const { title, tags, upvotes, description, date, location, protocol } = manifestation;
  const formattedDate =
    date &&
    format(parseISO(date), "dd 'de' MMMM 'de' yyyy", {
      locale: pt,
    });

  function openDots() {
    console.log('abrindo configs');
  }

  function getAttatch() {
    console.log('pagina de anexo');
  }

  function replyTo() {
    console.log('pagina para direcionar secretaría');
  }

  return (
    <Container>
      <header>
        
        <div>
          <h1>{title}</h1>
          <MdMoreVert color="black" size="18" onClick={openDots} cursor="pointer"/>
        </div>

        <span><small>protocolo: {protocol}</small></span>

        <section>
          <div>{tags && tags.map(tag => <Tag key={tag} tag={tag} />)}</div>
          <button type="button" onClick={getAttatch}>
            <MdAttachFile color="black" size="14" />
            &nbsp;Anexos
          </button>
        </section>

      </header>

      <article>
        
        <p>{description}</p>
        <br />

        {formattedDate && (
          <p>
            <MdDateRange size="14px" />
            &nbsp;Data: {formattedDate}
          </p>
        )}

        <p>
          <MdLocationOn size="14px" />
          &nbsp;Local: {location}
        </p>

      </article>

      <footer>
        

        <button type="button" onClick={replyTo}>
          Direcionar para secretária
        </button>
      </footer>
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
