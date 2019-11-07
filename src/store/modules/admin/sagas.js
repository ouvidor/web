/**
 * Middleware do Redux responsável por fazer as chamadas a API de forma assíncrona.
 */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { first_name, last_name, email, ...rest } = payload.data;
    const profile = {
      first_name,
      last_name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };
    const response = yield call(api.put, 'user', profile);

    toast.success('Perfil foi atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Não pôde atualizar perfil.');
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest('@admin/UPDATE_PROFILE_REQUEST', updateProfile),
]);
