import React, { useState } from 'react';
import { MdCheck, MdClear } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { string, object } from 'yup';

// import { Container } from './styles';

export default function SettingsItem({ email, item }) {
  // quando for 'false' é para excluir, quando for 'true' é pra salvar
  const [isSaving, setIsSaving] = useState(false);

  const validation = object().shape({
    title: string().required(),
    email: string()
      .email()
      .when('$email', (checkIfEmail, passSchema) =>
        checkIfEmail ? passSchema.required() : passSchema
      ),
  });

  function handleSubmit(data, { resetForm }) {
    if (!item) {
      // criar um novo item
      if (isSaving) {
        console.log('irá criar um novo item');
      } else {
        // limpar formulário
        resetForm();
        console.log('formulário limpado');
      }
    }
    // atualizando item existente
    else if (isSaving) {
      console.log('está editando');
      console.log(data);
    } else {
      console.log('excluindo item!');
    }
  }

  return (
    <li key={item && item.id}>
      <Form
        initialData={item}
        onSubmit={handleSubmit}
        schema={validation}
        context={{ email }}
      >
        <Input name="title" />
        {email && <Input name="email" />}
        <button type="submit" onClick={() => setIsSaving(true)} label="Enviar">
          <MdCheck />
        </button>
        <button type="submit" onClick={() => setIsSaving(false)} label="Enviar">
          <MdClear />
        </button>
      </Form>
    </li>
  );
}

SettingsItem.propTypes = {
  email: PropTypes.bool,
  item: PropTypes.shape({ id: PropTypes.number, title: PropTypes.string }),
};

SettingsItem.defaultProps = { email: null, item: null };
