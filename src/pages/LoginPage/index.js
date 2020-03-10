import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import Field from '../../components/Form/Field';
import Api from '../../services/api';
import { SessionContext } from '../../store/session';
import { signIn } from '../../store/session/actions';
import { Wrapper, Container } from './styles';
import { loginSchema } from '../../validations';

export default function Login() {
  const { dispatch } = useContext(SessionContext);

  const { register, handleSubmit, errors } = useForm({
    validationSchema: loginSchema,
  });

  async function onLogin({ email, password }) {
    const { token, user } = await Api.post({
      pathUrl: 'auth',
      data: { email, password },
    });
    dispatch(signIn({ token, profile: user }));
  }

  return (
    <Wrapper>
      <Container>
        <form onSubmit={handleSubmit(onLogin)}>
          <Field
            name="email"
            label="Seu email"
            type="email"
            placeholder="nome@email.com"
            register={register}
            errors={errors}
          />

          <Field
            label="Sua senha"
            name="password"
            type="password"
            placeholder="Sua senha"
            register={register}
            errors={errors}
          />

          <button type="submit">Login</button>
        </form>
      </Container>
    </Wrapper>
  );
}
