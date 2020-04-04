import React from 'react';
import PropTypes from 'prop-types';

import { PrefectureContainer } from './styles';
import Api from '../../services/api';
import InfoHeader from './InfoHeader';
import InfoForm from './InfoForm';

export default function Prefecture({ prefecture }) {
  async function submitSavedChanges(data) {
    await Api.post({ pathUrl: '/prefecture', data });
  }

  return (
    <PrefectureContainer>
      <InfoHeader
        title="Prefeitura"
        location={prefecture.location || ''}
        telephone={prefecture.telephone || ''}
        email={prefecture.email || ''}
        attendance={prefecture.attendance || ''}
      />

      <InfoForm submit={submitSavedChanges} />
    </PrefectureContainer>
  );
}

Prefecture.propTypes = {
  prefecture: PropTypes.shape({
    location: PropTypes.string,
    telephone: PropTypes.string,
    email: PropTypes.string,
    attendance: PropTypes.string,
  }).isRequired,
};
