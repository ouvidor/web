/**
 * Exporta uma instancia do `Axios` configurada com a url base.
 * O Axios é uma biblioteca para fazer requisições HTTP.
 */

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
