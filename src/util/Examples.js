/**
 * Exportantdo uma Manifestação base para ser usada no Storybook
 */
export const Manifestation = {
  id: 1,
  title: 'Denuncia',
  description:
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ',
  tags: [{ id: 1, name: 'Saúde', color: '#fff', background: '#d32727' },
        { id: 2, name: 'Alimentação', color: '#fff', background: '#d32727' }],
  upvotes: 12,
  latitude: -22.8869,
  longitude: -42.0266,
  location: 'bairro Seila, rua NaoSeiQual',
  date: '2020-09-30T19:00:00.000Z',
  protocol: '197323848113',
};

export const tags = [
  { id: 1, name: 'Saúde' },
  {
    id: 2,
    name: 'Saneamento',
  },
  {
    id: 3,
    name: 'Criminalidade',
  },
];

export const suggestions = [
  { id: 1, name: 'Saúde' },
  { id: 2, name: 'Saneamento' },
  { id: 3, name: 'Criminalidade' },
];
