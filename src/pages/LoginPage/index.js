import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Field from '../../components/Field';
import Api from '../../services/api';
import { SessionContext } from '../../store/session';
import { signIn } from '../../store/session/actions';
import { Wrapper, Container } from './styles';

export default function Login() {
  const { dispatch } = useContext(SessionContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um email válido.')
      .required('O email é necessário'),
    password: Yup.string().required('A senha é necessária'),
  });

  async function handleSubmit({ email, password }) {
    const { token, user } = await Api.post({
      pathUrl: 'auth',
      data: { email, password },
    });
    dispatch(signIn({ token, profile: user }));
  }

  return (
    <Wrapper>
      <Container>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Field name="email" type="email" placeholder="Seu email" />

              <Field name="password" type="password" placeholder="Sua senha" />

              <button type="submit">Login</button>
            </Form>
          )}
        </Formik>
      </Container>
    </Wrapper>
  );
}
