import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { string, object } from 'yup';

import { Container, StyledMdCheck, StyledMdClear } from './styles';

export default function SettingsItem({ email, item, placeholder }) {
  // quando for 'false' é para excluir, quando for 'true' é pra salvar
  const [isSaving, setIsSaving] = useState(false);

  const validation = object().shape({
    title: string().required('O titulo é necessário'),
    email: string()
      .email('Insira um email válido')
      .when('$email', (checkIfEmail, passSchema) =>
        checkIfEmail ? passSchema.required('O email é necessário') : passSchema
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
    <Container key={item && item.id}>
      <Form
        initialData={item}
        onSubmit={handleSubmit}
        schema={isSaving && validation}
        context={{ email }}
      >
        <div>
          <Input name="title" placeholder={placeholder} />
        </div>
        {email && (
          <div>
            <Input name="email" placeholder="Email" />
          </div>
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
      </Form>
    </Container>
  );
}

SettingsItem.propTypes = {
  email: PropTypes.bool,
  item: PropTypes.shape({ id: PropTypes.number, title: PropTypes.string }),
  placeholder: PropTypes.string,
};

SettingsItem.defaultProps = { email: null, item: null, placeholder: null };
