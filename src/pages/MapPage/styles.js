import styled from 'styled-components';
import PerfectScrollBar from 'react-perfect-scrollbar';

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
  min-width: 300px;
  max-width: 300px;
  max-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const List = styled.ul`
  max-width: 100%;
  max-height: 100%;
`;

export const Scroll = styled(PerfectScrollBar)`
  margin-top: 10px;
  min-width: 100%;
  max-width: 100%;
  padding: 5px 0px 0 0;
`;
