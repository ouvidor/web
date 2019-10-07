/**
 * Conforme a aplicação cresce é comum ter vários reducers,
 * para usar eles ao mesmo tempo é usado a função `combineReducers`
 */
import { combineReducers } from 'redux';

// reducers
import auth from './auth/reducer';
import admin from './admin/reducer';

/**
 * recebe um `Object` contendo os `Reducers`
 * retorna uma `Function`que invoca os `Reducers` e cria um `State` com o mesmo formato passado
 */
export default combineReducers({ auth, admin });
