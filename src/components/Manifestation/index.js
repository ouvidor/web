import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  MdAttachFile,
  MdDateRange,
  MdLocationOn,
  MdMoreVert,
} from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Draggable from 'react-draggable';

import Tag from '../Tag';
import { Container, Header, DetailsContainer, Footer, TagList } from './styles';

export default function Manifestation({ manifestation }) {
  const history = useHistory();

  const {
    id,
    title,
    categories,
    type,
    description,
    date,
    location,
    protocol,
  } = manifestation;

  const tags = [...categories, type];

  const formattedDate =
    date &&
    format(parseISO(date), "dd 'de' MMMM 'de' yyyy", {
      locale: pt,
    });

  function openAttached() {
    console.log('pagina de anexo');
  }

  function handleSend() {
    history.push(`/send/${id}`);
  }

  return (
    <Draggable handle=".handler">
      <Container>
        <Header>
          <div>
            <h1>{title}</h1>
            <MdMoreVert cursor="pointer" className="handler" />
          </div>

          <span>protocolo: {protocol}</span>

          <section>
            <TagList>
              {tags && tags.map(tag => <Tag key={tag.title} tag={tag} />)}
            </TagList>

            <button type="button" onClick={openAttached}>
              <MdAttachFile color="black" size="14" />
              Anexos
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
    </Draggable>
  );
}

Manifestation.propTypes = {
  manifestation: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      })
    ),
    type: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
    date: PropTypes.string,
    location: PropTypes.string,
    protocol: PropTypes.string,
  }).isRequired,
};
