import React from 'react';
import PropTypes from 'prop-types';

import { Header } from './styles';

export default function InfoHeader({
  title,
  location,
  telephone,
  email,
  attendance,
}) {
  return (
    <Header>
      <h1>{title}</h1>
      <section>
        <h2>Dados</h2>
        <p>Local da ouvidoria:</p> <span>{location}</span>
        <div>
          <h3>Contato</h3>
          <p>Telefone:</p> <span>{telephone}</span>
          <br />
          <p>Email:</p> <span>{email}</span>
          <br />
          <p>Horario de atendimento:</p> <span>{attendance}</span>
        </div>
      </section>
    </Header>
  );
}

InfoHeader.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  telephone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  attendance: PropTypes.string.isRequired,
};
