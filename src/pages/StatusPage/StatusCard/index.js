import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Title, Date } from './styles';

export default function StatusCard({ manifestationStatus, onClick }) {
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
    <Container onClick={onClick}>
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
  onClick: PropTypes.func.isRequired,
};
