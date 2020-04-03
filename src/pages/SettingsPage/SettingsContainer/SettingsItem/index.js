import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormContext } from 'react-hook-form';

import Field from '../../../../components/Form/Field';
import { Container, StyledMdCheck, StyledMdClear } from './styles';
import { settingsSchema } from '../../../../validations';

export default function SettingsItem({
  email,
  item,
  placeholder,
  submitChange,
}) {
  // quando for 'false' é para excluir, quando for 'true' é pra salvar
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm({
    validationSchema: settingsSchema,
    defaultValues: item || undefined,
  });

  function onClickSubmit(data) {
    // botao de limpar
    if (!item && !isSaving) {
      form.reset();
    } else {
      submitChange({ ...data, id: item.id }, isSaving);
      if (!item) {
        form.reset();
      }
    }
  }

  return (
    <Container key={item && item.id}>
      <FormContext {...form}>
        <form onSubmit={form.handleSubmit(onClickSubmit)}>
          <Field name="title" placeholder={placeholder} />
          {email && <Field name="email" placeholder="um@email.com" />}

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
        </form>
      </FormContext>
    </Container>
  );
}

SettingsItem.propTypes = {
  email: PropTypes.bool,
  item: PropTypes.shape({ id: PropTypes.number, title: PropTypes.string }),
  placeholder: PropTypes.string,
  submitChange: PropTypes.func.isRequired,
};

SettingsItem.defaultProps = { email: null, item: null, placeholder: null };
