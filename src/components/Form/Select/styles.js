import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const GroupLabelContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  span:nth-last-child(1) {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 90px;
    width: 16px;
    height: 15px;
    text-align: center;
  }
`;

export const basic = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted rgb(11, 118, 218, 0.2)',
    color: state.isSelected ? '#0b76da' : 'rgb(0, 0, 0, 0.8)',
    background: state.isSelected ? 'rgb(11, 118, 218, 0.2)' : '#fff',
    padding: 5,
    '&:hover': {
      cursor: 'pointer',
    },
  }),
  control: () => ({
    borderRadius: 8,
    background: '#fff',
    border: '2px solid #fff',
    display: 'flex',
    transition: 'all 0.3s',
    '&:hover': {
      border: '2px solid #ddd',
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    opacity: state.isDisabled ? 0.5 : 1,
    transition: 'opacity 300ms',
  }),
  menuList: () => ({}),
  // remove a linha que separada o controle
  indicatorSeparator: () => ({}),
};

export const alternative = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted rgb(11, 118, 218, 0.2)',
    color: state.isSelected ? '#0b76da' : 'rgb(0, 0, 0, 0.8)',
    background: state.isSelected ? 'rgb(11, 118, 218, 0.2)' : '#fff',
    padding: 5,
  }),
  control: () => ({
    borderRadius: 8,
    background: '#EAEDF2',
    border: '2px solid #EAEDF2',
    display: 'flex',
    transition: 'all 0.3s',
    '&:hover': {
      border: '2px solid #ddd',
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
