/**
 * Middleware do Redux responsável por fazer as chamadas a API de forma assíncrona.
 *
 */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history'; // manipulador de páginas
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });

    const { user, token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // redireciona o admin para essa url
    history.push('/map');
  } catch (err) {
    toast.error('Login não pôde ser feito');
    yield put(signFailure());
  }
}

export function* registerAdmin({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'admin', {
      name,
      email,
      password,
    });
  } catch (err) {
    toast.error('Falha ao cadastrar um admin.');
  }
}

export function setToken({ payload }) {
  // caso o usuário não tenha nada salvo
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

// intercepta todas essas Actions e só executa a ultima vez clicada.
export default all([
  // utilizando a action do redux-persist para pegar o token salvo
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', registerAdmin),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
