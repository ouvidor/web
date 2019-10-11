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

    // faz a chamada à API no endereço '/sessions' enviando um JSON contendo email e senha
    const response = yield call(api.post, 'auth', { email, password });

    const { user: admin, token } = response.data;

    // coloca o Token na Header das requisições HTTP, agora toda requisição vai ter o token
    api.defaults.headers.Authorization = `Bearer ${token}`;

    // diz ao middleware para dar um dispatch nessa action para a store
    yield put(signInSuccess(token, admin));

    // redireciona o admin para essa url
    history.push('/map');
  } catch (err) {
    toast.error('Login não pôde ser feito');
    yield put(signFailure());
  }
}

// recuperar o token salvo no storage do navegador
export function setToken({ payload }) {
  // caso o admin não tenha nada salvo
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    // coloca o Token na Header das chamadas HTTP
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
  takeLatest('@auth/SIGN_OUT', signOut),
]);
