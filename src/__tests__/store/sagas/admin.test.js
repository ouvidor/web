import { runSaga } from 'redux-saga';
import MockAdapter from 'axios-mock-adapter';

import api from '../../../services/api';

import {
  updateProfileSuccess,
  updateProfileFailure,
} from '../../../store/modules/admin/actions';
import { updateProfile } from '../../../store/modules/admin/sagas';

// MockAdapter recebe uma instancia do axios
const apiMock = new MockAdapter(api);

describe('Admin Sagas', () => {
  it('should be able to update profile', async () => {
    const dispatch = jest.fn();

    apiMock.onPut('admin').reply(200, {
      // o que vem dentro do response.data
      first_name: 'test2',
      last_name: 'test',
      email: 'test@test.com',
      id: 1,
    });

    // chama a função updateProfile do sagas de Admin
    await runSaga({ dispatch }, updateProfile, {
      payload: { data: { first_name: 'test2' } },
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(
      updateProfileSuccess({
        first_name: 'test2',
        last_name: 'test',
        email: 'test@test.com',
        id: 1,
      })
    );
  });

  it('should fail when api returns error', async () => {
    const dispatch = jest.fn();

    apiMock.onPut('admin').reply(500);

    // chama a função updateProfile do sagas de Admin
    await runSaga({ dispatch }, updateProfile, {
      payload: { data: { attr: 'invalid' } },
    }).toPromise();

    expect(dispatch).toHaveBeenCalledWith(updateProfileFailure());
  });
});
