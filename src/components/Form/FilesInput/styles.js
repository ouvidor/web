import styled from 'styled-components';

export const Container = styled.div`
  > div {
    border: 2px dotted rgba(100, 100, 100, 0.2);
    cursor: pointer;
    background: rgba(100, 100, 100, 0.1);
    border-radius: 8px;
    padding: 10px;
    transition: border 0.2s;

    &:hover {
      border: 2px dotted rgba(100, 100, 100, 0.5);
    }
  }
`;

export const ContainerPlaceholder = styled.div``;
