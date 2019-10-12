import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';
import { Wrapper, Container } from './styles';

export default function Login() {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um email válido.')
      .required('O email é necessário'),
    password: Yup.string().required('A senha é necessária.'),
  });

  function handleSubmit(data) {
    dispatch(signInRequest(data.email, data.password));
  }

  return (
    <Wrapper>
      <Container>
        <Form onSubmit={handleSubmit} schema={validationSchema}>
          <Input name="email" type="email" placeholder="Seu email" />
          <Input name="password" type="password" placeholder="Sua senha" />

          <button type="submit">Login</button>
        </Form>
      </Container>
    </Wrapper>
  );
}
