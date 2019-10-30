import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    border: 1px solid #0b76da;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
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
