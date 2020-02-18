import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';

import Field from '../../../../components/Field';
import { Container, StyledMdCheck, StyledMdClear } from './styles';
import { settingsSchema } from '../../../../validations';

export default function SettingsItem({
  email,
  item,
  placeholder,
  handleSubmit,
}) {
  // quando for 'false' é para excluir, quando for 'true' é pra salvar
  const [isSaving, setIsSaving] = useState(false);

  function onSubmit(data, { resetForm }) {
    // botao de limpar
    if (!item && !isSaving) {
      resetForm();
    } else {
      handleSubmit(data, isSaving);
      if (!item) {
        resetForm();
      }
    }
  }

  function getInitialValues() {
    if (!item) {
      if (email) return { title: '', email: '' };
      return { title: '' };
    }
    return item;
  }

  return (
    <Container key={item && item.id}>
      <Formik
        initialValues={getInitialValues()}
        onSubmit={onSubmit}
        validationSchema={settingsSchema}
      >
        {() => (
          <Form>
            <Field name="title" placeholder={placeholder} />
            {email && <Field name="email" placeholder="Email" />}
            <aside>
              <button
                type="submit"
                onClick={() => setIsSaving(true)}
                label="Enviar"
              >
                <StyledMdCheck />
              </button>
              <button
                type="submit"
                onClick={() => setIsSaving(false)}
                label="Enviar"
              >
                <StyledMdClear />
              </button>
            </aside>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

SettingsItem.propTypes = {
  email: PropTypes.bool,
  item: PropTypes.shape({ id: PropTypes.number, title: PropTypes.string }),
  placeholder: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
};

SettingsItem.defaultProps = { email: null, item: null, placeholder: null };
