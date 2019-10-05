/**
 * Cria a Redux Store que guarda a árvore de estado da aplicação.App
 * A única forma de mudar os dados da Store é chamando o `dispatch()`.
 * Para específicar diferentes partes da árvore da aplicação criamos diferentes
 * Reducers e combinamos eles em uma função apenas, utilizando `combineReducers`.
 */
import { createStore } from 'redux';

import rootReducer from './modules/rootReducer';

const store = createStore(rootReducer);

export default store;
