import styled from 'styled-components';

export const Container = styled.li`
  padding: 2px 5px;
  background: #eee;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  cursor: default;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: border 0.3s;

  & + li {
    margin-left: 5px;
  }

  &:hover {
    border: 1px solid #ccc;

    svg {
      fill: rgba(0, 0, 0, 1);
    }
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
      fill: rgba(0, 0, 0, 0.7);
      transition: fill 0.3s;

      &:hover {
        fill: #f00;
      }
    }
  }
`;
