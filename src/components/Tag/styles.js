import styled from 'styled-components';

export const Container = styled.li`
  padding: 2px 10px;
  background: ${props => props.background};
  border-radius: 16px;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 12px;
  color: ${props => props.color};
  cursor: pointer;

  & + li {
    margin-left: 5px;
  }

  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }
`;
