import styled from 'styled-components';

export const Container = styled.div``;

export const InputLabel = styled.label`
  display: flex;
  align-items: center;
  background: rgba(100, 100, 100, 0.1);
  border: 2px dotted rgba(100, 100, 100, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: border 0.2s;

  &:hover {
    border: 2px dotted rgba(100, 100, 100, 0.5);
  }

  input {
    display: none;
  }

  p {
    padding: 10px;
  }
`;
