import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Title, Date } from './styles';

export default function StatusCard({ status }) {
  const formattedDate = useMemo(() => {
    const date = format(parseISO(status.created_at), "dd 'de' MMMM 'de' yyyy", {
      locale: pt,
    });
    return date;
  }, [status.created_at]);

  return (
    <Container>
      <Title>{status.title}</Title>
      <Date>{formattedDate}</Date>
    </Container>
  );
}

StatusCard.propTypes = {
  status: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
};
