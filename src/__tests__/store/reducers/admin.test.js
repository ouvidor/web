import reducer, { INITIAL_STATE } from '../../../store/modules/admin/reducer';

import * as AdminActions from '../../../store/modules/admin/actions';
import * as AuthActions from '../../../store/modules/auth/actions';

const admin = {
  first_name: 'test',
  last_name: 'test',
  email: 'test@test.com',
};

describe('Admin reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});
    expect(state).toStrictEqual(INITIAL_STATE);
  });

  it('@admin/UPDATE_PROFILE_SUCCESS', async () => {
    const state = reducer(
      INITIAL_STATE,
      AdminActions.updateProfileSuccess(admin)
    );

    expect(state).toStrictEqual({
      profile: admin,
    });
  });

  it('@auth/SIGN_IN_SUCCESS', async () => {
    const state = reducer(
      INITIAL_STATE,
      AuthActions.signInSuccess('token', admin)
    );

    expect(state).toStrictEqual({
      profile: admin,
    });
  });

  it('@auth/SIGN_OUT', async () => {
    const state = reducer(INITIAL_STATE, AuthActions.signOut());

    expect(state).toStrictEqual({ profile: null });
  });
});
