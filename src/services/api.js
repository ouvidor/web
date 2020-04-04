/**
 * Exporta uma instancia do `Axios` configurada com a url base.
 * O Axios é uma biblioteca para fazer requisições HTTP.
 */

import axios from 'axios';
import { toast } from 'react-toastify';

function getErrorMessage(errorResponse) {
  if (
    errorResponse === undefined ||
    (!errorResponse.data && !errorResponse.data.error)
  )
    return 'Erro inesperado!';

  if (typeof errorResponse.data.error === 'string') {
    return errorResponse.data.error;
  }

  return 'Erro na aplicação, por favor informe ao suporte!';
}

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3003',
    });
  }

  saveToken(token) {
    this.api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  get({ params, pathUrl, error = true }) {
    return this.api
      .get(pathUrl, { params })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        if (error === true) {
          toast.error(getErrorMessage(err.response));
        }
      });
  }

  post({ data, pathUrl }) {
    return this.api
      .post(pathUrl, data)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        toast.error(getErrorMessage(error.response));
      });
  }

  put({ data, pathUrl }) {
    return this.api
      .put(pathUrl, data)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        toast.error(getErrorMessage(error.response));
      });
  }

  delete({ pathUrl }) {
    return this.api
      .delete(pathUrl)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        toast.error(getErrorMessage(error.response));
      });
  }
}

export default new Api();
