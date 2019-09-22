import React from 'react';
import PropTypes from 'prop-types';
import {
  MdThumbUp,
  MdAttachment,
  MdDateRange,
  MdLocationOn,
  MdChromeReaderMode,
} from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Tag from '../Tag';
import { Container } from './styles';

export default function Manifestation({ manifestation }) {
  const { title, tags, upvotes, description, date, location } = manifestation;
  const formattedDate =
    date &&
    format(parseISO(date), "dd 'de' MMMM 'de' yyyy", {
      locale: pt,
    });

  function changeStatus() {
    console.log('outra pagina');
  }

  function getAttatch() {
    console.log('pagina de anexo');
  }

  return (
    <Container>
      <header>
        <h1>{title}</h1>
        <section>
          <div>{tags && tags.map(tag => <Tag key={tag} tag={tag} />)}</div>
          <div>
            <MdThumbUp />
            &nbsp; {upvotes}
          </div>
        </section>
      </header>

      <article>
        <p>{description}</p>
        <button type="button" onClick={getAttatch}>
          <MdAttachment color="white" size="16" />
        </button>
      </article>

      <footer>
        <button type="button" onClick={changeStatus}>
          <MdChromeReaderMode size="16px" />
          <span>&nbsp;Status</span>
        </button>
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
  },
};
