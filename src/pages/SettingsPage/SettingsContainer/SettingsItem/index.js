import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { string, object } from 'yup';
import { toast } from 'react-toastify';

import api from '../../../../services/api';
import { Container, StyledMdCheck, StyledMdClear } from './styles';

export default function SettingsItem({
  email,
  item,
  refreshList,
  placeholder,
  urlPath,
}) {
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

  async function handleSubmit(data, { resetForm }) {
    try {
      if (!item) {
        // criar um novo item
        if (isSaving) {
          const response = await api.post(urlPath, data);
          toast.success(`Item "${response.data.title}" criado com sucesso`);
        }
        resetForm();
        refreshList();
        return;
      }

      if (isSaving) {
        // atualizando item existente
        const response = await api.put(`${urlPath}/${item.id}`, data);
        toast.success(`Item "${response.data.title}" atualizado com sucesso`);
      } else {
        // excluindo item
        const response = await api.delete(`${urlPath}/${item.id}`);
        toast.success(`Item "${response.data.title}" excluido com sucesso`);
      }
    } catch ({ response }) {
      if (response) {
        toast.error(response.data.error);
      }
    }
    refreshList();
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
  refreshList: PropTypes.func.isRequired,
  urlPath: PropTypes.string.isRequired,
};

SettingsItem.defaultProps = { email: null, item: null, placeholder: null };
