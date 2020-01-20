import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '../../services/api';
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
    await api
      .post('auth', { email, password })
      .then(({ data }) => {
        const { token, user } = data;

        dispatch(signIn({ token, profile: user }));
        toast.success(`Admin logado com sucesso!`);
      })
      .catch(error => {
        toast.error(error.response.data.error);
      });
  }

  return (
    <Wrapper>
      <Container>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form>
              <div>
                <Field name="email" type="email" placeholder="Seu email" />
                {touched.email && errors.email && <span>{errors.email}</span>}
              </div>

              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Sua senha"
                />
                {touched.password && errors.password && (
                  <span>{errors.password}</span>
                )}
              </div>

              <button type="submit">Login</button>
            </Form>
          )}
        </Formik>
      </Container>
    </Wrapper>
  );
}
