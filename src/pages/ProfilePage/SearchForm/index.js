import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { MdSearch } from 'react-icons/md';

import Api from '../../../services/api';
import Field from '../../../components/Form/Field';
import { Form } from './styles';

export default function SearchForm() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é necessário'),
  });

  const { register, handleSubmit, errors } = useForm({ validationSchema });

  async function onSubmit(data) {
    await Api.get({ pathUrl: `user`, params: data });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field
        label="Nome"
        name="name"
        placeholder="O primeiro nome"
        register={register}
        errors={errors}
      />
      <button type="submit">
        <MdSearch />
      </button>
    </Form>
  );
}
