/**
 * Exportantdo uma Manifestação base para ser usada no Storybook
 */
export const Manifestation = {
  id: 1,
  title: 'Denuncia',
  description:
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ',
  categories: [{ id: 1, title: 'Saúde' }, { id: 2, title: 'Alimentação' }],
  type: { id: 1, title: 'Reclamação' },
  upvotes: 12,
  latitude: -22.8869,
  longitude: -42.0266,
  location: 'bairro Seila, rua NaoSeiQual',
  date: '2020-09-30T19:00:00.000Z',
  protocol: '197323848113',
};

export const tags = [
  { id: 1, title: 'Saúde' },
  {
    id: 2,
    title: 'Saneamento',
  },
  {
    id: 3,
    title: 'Criminalidade',
  },
];

export const suggestions = [
  { id: 1, title: 'Saúde' },
  { id: 2, title: 'Saneamento' },
  { id: 3, title: 'Criminalidade' },
];

export const categories = [
  { id: 1, title: 'Saneamento' },
  { id: 2, title: 'Criminalidade' },
  { id: 3, title: 'Saúde' },
];

export const types = [
  { id: 1, title: 'Reclamação' },
  { id: 2, title: 'Elogio' },
  { id: 3, title: 'Solicitação de informação' },
  { id: 4, title: 'Denúncia' },
  { id: 5, title: 'Elogio' },
  { id: 6, title: 'Sugestão' },
];

export const secretariats = [
  { id: 1, title: 'Secretaria de Saúde', email: 'gov.saude@gmail.com' },
  {
    id: 2,
    title: 'Secretaria de Saneamento',
    email: 'gov.saneamento@gmail.com',
  },
  { id: 3, title: 'Secretaria de Segurança', email: 'gov.seguranca@gmail.com' },
  { id: 4, title: 'Secretaria de Turismo', email: 'gov.turismo@gmail.com' },
  { id: 5, title: 'Secretaria do Cidadão', email: 'gov.cidadao@gmail.com' },
  { id: 6, title: 'Secretaria da Fazenda', email: 'gov.fazenda@gmail.com' },
];

export const status = [
  { id: 1, title: 'Enviado para secretaria' },
  { id: 2, title: 'Em progresso' },
  { id: 3, title: 'Fechada' },
];
