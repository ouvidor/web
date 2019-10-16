import reducer, { INITIAL_STATE } from '../../../store/modules/auth/reducer';

import * as AuthActions from '../../../store/modules/auth/actions';

describe('Admin reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});
    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('@auth/SIGN_IN_REQUEST', async () => {
    const state = reducer(
      INITIAL_STATE,
      AuthActions.signInRequest('test@test.com', '123456')
    );

    expect(state).toStrictEqual({
      ...state,
      loading: true,
    });
  });

  it('@auth/SIGN_IN_SUCCESS', async () => {
    const state = reducer(
      { ...INITIAL_STATE, loading: true },
      AuthActions.signInSuccess('token', {})
    );

    expect(state).toStrictEqual({
      loading: false,
      token: 'token',
      signed: true,
    });
  });

  it('@auth/SIGN_FAILURE', async () => {
    const state = reducer(
      { ...INITIAL_STATE, loading: true },
      AuthActions.signFailure()
    );

    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('@auth/SIGN_OUT', async () => {
    const state = reducer(
      { token: 'token', signed: true, loading: false },
      AuthActions.signOut()
    );

    expect(state).toStrictEqual(INITIAL_STATE);
  });
});
