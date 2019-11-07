export const basic = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted rgb(11, 118, 218, 0.2)',
    color: state.isSelected ? '#0b76da' : 'rgb(0, 0, 0, 0.8)',
    padding: 5,
  }),
  control: provided => ({
    ...provided,
    borderRadius: 8,
    background: '#fff',
    border: 'none',
    display: 'flex',
    transition: 'all 0.3s',
    '&:hover': {
      boxShadow: '0 4px 8px rgb(11, 118, 218, 0.1)',
    },
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
  menuList: () => ({}),
  // remove a linha que separada o controle
  indicatorSeparator: () => ({}),
};

export const alternative = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted rgb(11, 118, 218, 0.2)',
    color: state.isSelected ? '#0b76da' : 'rgb(0, 0, 0, 0.8)',
    padding: 5,
  }),
  control: provided => ({
    ...provided,
    borderRadius: 8,
    background: '#EAEDF2',
    border: 'none',
    display: 'flex',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
  menuList: () => ({}),
  // remove a linha que separada o controle
  indicatorSeparator: () => ({}),
};
