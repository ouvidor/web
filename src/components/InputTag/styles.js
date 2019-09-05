import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  input {
    height: 20px;
    width: 120px;
    padding: 0 5px;
    margin-right: 5px;
    border: 1px solid rgba(66, 147, 222, 0.5);
    border-radius: 4px;
    background-color: #eee;
    caret-color: rgba(0, 0, 0, 0.4);

    &::placeholder {
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;

export const Button = styled.button`
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
  border-radius: 4px;
  border: none;
  height: 20px;
  width: 20px;
  transition: all 0.1s;

  &:hover {
    box-shadow: 0 0 2px 1px
      ${props =>
        props.isInputActive
          ? 'rgba(216, 66, 66, 0.4)'
          : 'rgba(66, 147, 222, 0.4)'};
    background-color: #ddd;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Tag = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  background: #999;
  color: #fff;
  border-radius: 4px;
  height: 20px;
  padding: 0 10px;
  cursor: pointer;
`;
