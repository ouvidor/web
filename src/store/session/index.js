import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import sessionReducer from './reducer';

import Api from '../../services/api';

const initialState = {
  token: null,
  isSigned: false,
  profile: null,
};

// contêm o provider e o consumer, essencial para o uso do estado global
export const SessionContext = createContext();

export default function SessionContextProvider({ children }) {
  const [session, dispatch] = useReducer(sessionReducer, initialState, () => {
    const localData = localStorage.getItem('session');

    // usa os dados guardados no localStorage
    if (localData) {
      const parsedLocalData = JSON.parse(localData);
      const { token } = parsedLocalData;
      Api.saveToken(token); // coloca o token salvo no axios
      return parsedLocalData;
    }

    // caso não tenha nada no localStorage
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem('session', JSON.stringify(session));
    // sempre que o token mudar ele é salvo na config do axios
    Api.saveToken(session.token);
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
}

SessionContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
