import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Container } from './styles';

export default function Login() {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um email válido.')
      .required('O email é necessário'),
    password: Yup.string().required('A senha é necessária.'),
  });

  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Container>
      <div>
        <Form onSubmit={handleSubmit} schema={validationSchema}>
          <Input name="email" type="email" />
          <Input name="password" type="password" />

          <button type="submit">Entrar</button>
        </Form>
      </div>
    </Container>
  );
}
