import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';
import { Wrapper, Container } from './styles';

export default function Login() {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um email válido.')
      .required('O email é necessário'),
    password: Yup.string().required('A senha é necessária'),
  });

  function handleSubmit(data) {
    dispatch(signInRequest(data.email, data.password));
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
