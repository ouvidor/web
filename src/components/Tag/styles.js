import styled from 'styled-components';

export const Container = styled.li`
  padding: 2px 8px;
  background: ${props => props.background};
  border-radius: 4px;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: ${props => props.color};
  cursor: default;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  & + li {
    margin-left: 5px;
  }

  &:hover {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  }

  span {
    margin-right: 4px;
  }

  button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 14px;
      height: 14px;
      fill: ${props => props.color};
    }
  }
`;
