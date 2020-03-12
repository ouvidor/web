import React from 'react';
import { useForm, FormContext } from 'react-hook-form';
import * as Yup from 'yup';
import { MdSearch } from 'react-icons/md';

import Api from '../../../services/api';
import Field from '../../../components/Form/Field';
import { Form } from './styles';

export default function SearchForm() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é necessário'),
  });

  const form = useForm({ validationSchema });

  async function onSubmit(data) {
    await Api.get({ pathUrl: `user`, params: data });
  }

  return (
    <FormContext {...form}>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Field name="name" label="Nome" placeholder="O primeiro nome" />

        <button type="submit">
          <MdSearch />
        </button>
      </Form>
    </FormContext>
  );
}
