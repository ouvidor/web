/**
 * Wrapper para `redux-persist` com a configuração.
 * Persiste a informações da Store do Redux, ou seja, sempre que recarregar
 * a página a Store do Redux vai continuar no mesmo estado.
 *
 * github do redux-persist
 * https://github.com/rt2zz/redux-persist
 */
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default rootReducer => {
  return persistReducer(
    {
      key: 'ouvidor',
      storage,
      whitelist: ['auth', 'admin'],
    },
    rootReducer
  );
};
