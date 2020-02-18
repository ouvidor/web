import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MdSearch } from 'react-icons/md';

import Api from '../../../services/api';
import Field from '../../../components/Field';
import { Form } from './styles';

export default function SearchForm() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é necessário'),
  });

  async function handleSubmit(data) {
    await Api.get({ pathUrl: `user`, params: data });
  }

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      initialValues={{ name: '' }}
    >
      {() => (
        <Form>
          <Field name="name" placeholder="O primeiro nome" />
          <button type="submit">
            <MdSearch />
          </button>
        </Form>
      )}
    </Formik>
  );
}
