import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Title, Date } from './styles';

export default function StatusCard({ manifestationStatus, handleSelect }) {
  const formattedDate = useMemo(() => {
    const date = format(
      parseISO(manifestationStatus.created_at),
      "dd 'de' MMMM 'de' yyyy",
      {
        locale: pt,
      }
    );
    return date;
  }, [manifestationStatus.created_at]);

  return (
    <Container onClick={handleSelect}>
      <Title>{manifestationStatus.status.title}</Title>
      <Date>{formattedDate}</Date>
    </Container>
  );
}

StatusCard.propTypes = {
  manifestationStatus: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string,
    status: PropTypes.shape({
      title: PropTypes.string,
    }),
  }).isRequired,
  handleSelect: PropTypes.func.isRequired,
};
