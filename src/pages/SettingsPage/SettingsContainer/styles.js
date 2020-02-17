import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  margin-bottom: 10px;
  border: 2px solid #fff;
  border-radius: 8px;
  transition: all 0.3s;
  &:hover {
    border: 2px solid #ddd;
  }

  > button {
    padding: 10px 28px 10px 15px;
    background: transparent;
    width: 100%;
    text-align: left;
    border: none;
    border-radius: 8px;
    font-size: 16px;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      > svg {
        width: 24px;
        height: 24px;
      }
    }
  }

  > div {
    padding: 0 15px;
    margin: 10px 0;

    div {
      color: blue;
    }
  }
`;
