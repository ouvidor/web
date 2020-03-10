import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

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

  const { register, reset, handleSubmit, errors } = useForm({
    validationSchema: settingsSchema,
  });

  function onSubmit(data) {
    // botao de limpar
    if (!item && !isSaving) {
      reset();
    } else {
      submitChange(data, isSaving);
      if (!item) {
        reset();
      }
    }
  }

  return (
    <Container key={item && item.id}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="title"
          placeholder={placeholder}
          errors={errors}
          register={register}
        />
        {email && (
          <Field
            name="email"
            placeholder="Email"
            errors={errors}
            register={register}
          />
        )}

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
