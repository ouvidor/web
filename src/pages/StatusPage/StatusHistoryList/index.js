import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';

import StatusCard from '../StatusCard';
import { Container, Scroll } from './styles';

export default function StatusHistoryList({
  onNewStatusClick,
  statusHistory,
  setEditing,
  setSelectedId,
}) {
  const { setValue } = useFormContext();

  return (
    <Container>
      <button type="button" onClick={onNewStatusClick}>
        Adicionar novo status à manifestação
      </button>
      <Scroll>
        <ul>
          {statusHistory &&
            statusHistory.map(status => (
              <StatusCard
                key={status.id}
                manifestationStatus={status}
                onClick={() => {
                  setEditing(true);
                  setSelectedId(status.id);
                  setValue([
                    { status: status.status },
                    { description: status.description },
                  ]);
                }}
              />
            ))}
        </ul>
      </Scroll>
    </Container>
  );
}

StatusHistoryList.propTypes = {
  onNewStatusClick: PropTypes.func.isRequired,
  statusHistory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      status: PropTypes.shape({
        title: PropTypes.string,
      }),
    })
  ).isRequired,
  setEditing: PropTypes.func.isRequired,
  setSelectedId: PropTypes.func.isRequired,
};
