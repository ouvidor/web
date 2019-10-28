import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const BodyWrapper = styled.div`
  display: flex;
  flex: 1;
  > section {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 24px;
    color: #fff;
  }
`;

export const Body = styled.div`
  background: #eaedf2;
  padding: 10px;
`;

export const List = styled.ul``;
