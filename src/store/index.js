/**
 * Breve explicação do Redux:
 *
 * Redux permite a aplicação ter fácil acesso a um estado global. A Redux `Store`.
 * No React é usado o hook `useSelector` para acessar a `Store` pelo componente
 * e o hook `useDispatch` para fazer mudanças na `Store`.
 *
 * O `useDispatch()` gera uma função que recebe um objeto, `Action`.
 * Exemplo de `Action`, `{type: '@auth/SIGN_IN_REQUEST', payload: {...} }`
 *
 * O `Reducer` ouve por todas as actions e faz as mudanças necessárias na `Store`.
 *
 * O middleware `Redux-Saga` intercepta a `Action` e chama a função expecíficada.
 */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

/**
 * `rootReducer` e `rootSaga` são agregadores de reducers e de sagas, necessário para poder usar mais de um
 * `persistReducers` é uma função que retorna os reducers configurados para o Redux-persist
 */
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import persistReducers from './persistReducers';

// cria um middleware Redux-Saga
const sagaMiddleware = createSagaMiddleware();

// cria um enhancer para Redux Store que aplica um middleware para o método dispatch da Redux Store
const enhancer = applyMiddleware(sagaMiddleware);

// cria a Redux Store com os reducers e enhancer com o Sagas
const store = createStore(persistReducers(rootReducer), enhancer);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

// exporta a Redux Store e a persistência da Redux Store
export { store, persistor };
