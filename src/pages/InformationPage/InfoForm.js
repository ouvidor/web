import React from 'react';
import { useForm, FormContext } from 'react-hook-form';
import PropTypes from 'prop-types';

import { Section } from './styles';
import Field from '../../components/Form/Field';

export default function InfoForm({ submit }) {
  const form = useForm();

  function handleSubmit(data) {
    submit(data);
  }

  return (
    <Section>
      <h1>Edite os dados da prefeitura</h1>
      <FormContext {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Field
            name="site"
            label="Site oficial"
            placeholder="www.prefeitura.com/ouvidoria"
          />
          <Field name="location" label="Local" placeholder="Centro da cidade" />
          <Field name="email" label="Email" placeholder="email" />
          <Field
            name="telephone"
            label="Telefone"
            placeholder="(**) ****-****"
          />
          <Field
            name="attendance"
            component="textarea"
            label="Atendimento"
            placeholder="De segunda a sexta: 08:00 até 17:00, Aos sabados e domingos: 12:00 até 16:00"
          />
          <button type="submit">Salvar</button>
        </form>
      </FormContext>
    </Section>
  );
}

InfoForm.propTypes = {
  submit: PropTypes.func.isRequired,
};
