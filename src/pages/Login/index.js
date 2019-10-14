import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Wrapper, Container } from './styles';

export default function Login() {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um email válido.')
      .required('O email é necessário'),
    password: Yup.string().required('A senha é necessária'),
  });

  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Wrapper>
      <Container>
        <Form onSubmit={handleSubmit} schema={validationSchema}>
          
          <div>
            <Input name="email" type="email" placeholder="Seu email" />
          </div>
          
          <div>
            <Input name="password" type="password" placeholder="Sua senha" />
          </div>

          <button type="submit">Login</button>
        </Form>
      </Container>
    </Wrapper>
  );
}
