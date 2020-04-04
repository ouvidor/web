import React from 'react';
import PropTypes from 'prop-types';

import { OmbudsmanContainer } from './styles';
import Api from '../../services/api';
import InfoForm from './InfoForm';
import InfoHeader from './InfoHeader';

export default function Omdusman({ ombudsman }) {
  async function submitSavedChanges(data) {
    await Api.post({ pathUrl: '/ombudsman', data });
  }

  return (
    <OmbudsmanContainer>
      <InfoHeader
        title="Ouvidoria"
        location={ombudsman.location || ''}
        telephone={ombudsman.telephone || ''}
        email={ombudsman.email || ''}
        attendance={ombudsman.attendance || ''}
      />

      <InfoForm submit={submitSavedChanges} />
    </OmbudsmanContainer>
  );
}

Omdusman.propTypes = {
  ombudsman: PropTypes.shape({
    location: PropTypes.string,
    telephone: PropTypes.string,
    email: PropTypes.string,
    attendance: PropTypes.string,
  }).isRequired,
};
