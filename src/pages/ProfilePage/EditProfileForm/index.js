import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// import Api from '../../../services/api';
import Field from '../../../components/Form/Field';

export default function EditProfileForm({ profile }) {
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('Primeiro nome é necessário'),
    last_name: Yup.string().required('Sobrenome é necessário'),
    email: Yup.string()
      .email('Insira um email válido')
      .required('Email é necessário'),
    password: Yup.string(),
    new_password: Yup.string().when('password', (password, field) => {
      return password
        ? field
            .min(6, 'A nova senha deve conter no minimo 6 caracteres')
            .required('A nova senha é necessária')
        : field;
    }),
    confirm_password: Yup.string().when('password', (password, field) => {
      return password
        ? field
            .oneOf([Yup.ref('new_password')], 'A senha não é a mesma')
            .required('Confirme a senha')
        : field;
    }),
  });

  const { register, handleSubmit, errors } = useForm({ validationSchema });

  async function onSubmit(data) {
    // await Api.get({ pathUrl: `user`, params: data });
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        label="Primeiro nome"
        name="first_name"
        register={register}
        errors={errors}
      />
      <Field
        label="Sobrenome"
        name="last_name"
        register={register}
        errors={errors}
      />
      <Field
        label="Email"
        name="email"
        type="email"
        register={register}
        errors={errors}
      />
      <Field
        label="Senha"
        name="password"
        type="password"
        register={register}
        errors={errors}
      />
      <Field
        label="Confirmar senha"
        name="confirm_password"
        type="password"
        register={register}
        errors={errors}
      />

      <button type="button" onClick={() => {}}>
        Cancelar
      </button>

      <button type="submit">Salvar</button>
    </form>
  );
}

EditProfileForm.propTypes = {
  profile: PropTypes.shape({}).isRequired,
};
