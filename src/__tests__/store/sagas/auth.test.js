import { runSaga } from 'redux-saga';
import MockAdapter from 'axios-mock-adapter';

import api from '../../../services/api';
import history from '../../../services/history';

import * as AuthActions from '../../../store/modules/auth/actions';
import { signIn, signOut, setToken } from '../../../store/modules/auth/sagas';

// MockAdapter recebe uma instancia do axios
let apiMock = new MockAdapter(api);

describe('Auth Sagas', () => {
  beforeEach(() => {
    apiMock = new MockAdapter(api);
    // deleta o token da api
    delete apiMock.axiosInstance.defaults.headers.Authorization;
  });

  it('should be able to login', async () => {
    const admin = {
      id: 1,
      first_name: 'test',
      last_name: 'test',
      email: 'test@test.com',
    };

    const dispatch = jest.fn();

    apiMock.onPost('auth').reply(200, {
      // o que vem dentro do response.data
      token: 'token',
      user: admin,
    });

    await runSaga({ dispatch }, signIn, {
      payload: { email: 'test@test.com', password: 123456 },
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(
      AuthActions.signInSuccess('token', admin)
    );
  });

  it('should fail to login', async () => {
    const dispatch = jest.fn();

    apiMock.onPost('auth').reply(401);

    await runSaga({ dispatch }, signIn, {
      payload: { email: 'test@test.com', password: 123456 },
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(AuthActions.signFailure());
  });

  it('should recover token when refresh', async () => {
    setToken({
      payload: { auth: { token: 'token' } },
    });

    expect(apiMock.axiosInstance.defaults.headers).toHaveProperty(
      'Authorization'
    );
    expect(apiMock.axiosInstance.defaults.headers.Authorization).toStrictEqual(
      'Bearer token'
    );
  });

  it('should not recover token when a token is not saved', async () => {
    setToken({ payload: { auth: { token: null } } });

    expect(apiMock.axiosInstance.defaults.headers).not.toHaveProperty(
      'Authorization'
    );
  });

  it('should not recover token when no payload', async () => {
    setToken({ payload: null });

    expect(apiMock.axiosInstance.defaults.headers).not.toHaveProperty(
      'Authorization'
    );
  });

  it('should signout', async () => {
    signOut();
    expect(history.location).toHaveProperty('pathname');
    expect(history.location.pathname).toBe('/');
  });
});
