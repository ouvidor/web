import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { MdChevronLeft } from 'react-icons/md';

import { StyledForm, Container, TagList } from './styles';
// import api from '../../services/api';
import { Background } from '../../styles';
import Tag from '../../components/Tag';
import Select from '../../components/Select';

export default function SendPage({ match, manifestationState }) {
  const { id } = match.params;
  const [manifestation, setManifestation] = useState(manifestationState);

  // busca pela manifestação
  useEffect(() => {
    async function fetchManifestation() {
      if (!id) return;
      // const result = await api.get(`/manifestation/${id}`);
      // if (!result && !result.data) return;

      // setManifestation(result.data);
      setManifestation({
        id: 1,
        title: 'Problemas na rua da restinga',
        description:
          'Há um buraco na rua da restinga vai fazer 3 anos já. BlablablaBlablablaBlablabla BlablablaBlablabla Há um buraco na rua da restinga vai fazer 3 anos já. BlablablaBlablablaBlablabla BlablablaBlablablaHá um buraco na rua da restinga vai fazer 3 anos já. BlablablaBlablablaBlablabla BlablablaBlablablaHá um buraco na rua da restinga vai fazer 3 anos já. BlablablaBlablablaBlablabla BlablablaBlablablaHá um buraco na rua da restinga vai fazer 3 anos já. BlablablaBlablablaBlablabla BlablablaBlablabla',
        type: {
          id: 1,
          title: 'Reclamação',
        },
        categories: [{ id: 1, title: 'Saúde' }],
        protocol: '2016028589725',
      });
    }
    fetchManifestation();
  }, [id]);

  function handleFetch() {}

  function handleSend() {}

  // renderiza o formulario de busca por protocolo
  if (!manifestation)
    return (
      <Background>
        <h1>Direcionar manifestação para secretária</h1>
        <StyledForm onSubmit={handleFetch}>
          <Input
            placeholder="Exemplo: 20190330111"
            name="protocol"
            label="Número de protocolo"
          />
          <button type="submit">Buscar</button>
        </StyledForm>
      </Background>
    );

  return (
    <Background>
      <Container>
        <header>
          <button type="button">
            <MdChevronLeft />
            voltar
          </button>
          <span>protocolo: {manifestation.protocol}</span>
        </header>
        <div>
          <h1>{manifestation.title}</h1>

          <TagList>
            {manifestation.categories &&
              [...manifestation.categories, manifestation.type].map(tag => (
                <Tag key={tag.title} tag={tag} />
              ))}
          </TagList>
          <p>{manifestation.description}</p>

          <section>
            <header>
              <h2>Conteudo do email</h2>
              <Select
                name="base"
                placeholder="Selecione uma base"
                options={[]}
                alternativeStyle
              />
            </header>
            <Form onSubmit={handleSend}>
              <Textarea
                name="mailBody"
                placeholder="Corpo do email"
                maxLength={1200}
              />
              <footer>
                <Select
                  name="secretary"
                  placeholder="Para qual secretaria enviar?"
                  options={[{ id: 1, title: 'Secretaria de Saúde' }]}
                  alternativeStyle
                />
                <button type="submit">Enviar</button>
              </footer>
            </Form>
          </section>
        </div>
      </Container>
    </Background>
  );
}

SendPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  manifestationState: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.number,
    category: PropTypes.number,
  }),
};

SendPage.defaultProps = {
  manifestationState: null,
};
