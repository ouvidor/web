import styled from 'styled-components';

export const List = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  flex-wrap: wrap;

  li {
    background: #7159c1;
    border-radius: 12px;
    padding: 1px 10px;
    color: rgba(255, 255, 255, 0.8);
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 300;
    cursor: pointer;
    margin-bottom: 5px;

    & + li {
      margin-left: 5px;
    }

    &:hover {
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    }
  }
`;
