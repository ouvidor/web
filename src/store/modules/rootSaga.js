/**
 * Junta todos os Sagas e permite execução em paralelo
 */
import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import admin from './admin/sagas';

// generator function
export default function* rootSaga() {
  // `all` junta todos os sagas de forma similar ao Promise.all
  return yield all([auth, admin]);
}
