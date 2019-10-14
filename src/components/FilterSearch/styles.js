import styled from 'styled-components';

export const Container = styled.div`
  min-height: 80px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;

  > div {
    display: flex;

    > input {
      width: 300px;
      height: 35px;
      padding-left: 10px;
      background: #fff;
      border-radius: 8px 0 0 8px;
      border: none;

      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
      }
    }

    > button {
      background-color: #0b76da;
      border-radius: 0 8px 8px 0;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 35px;
      transition: all 0.2s;

      svg {
        width: 25px;
        height: 25px;
        fill: rgba(255, 255, 255, 0.7);
        transition: fill 0.2s;
      }

      &:hover {
        svg {
          fill: rgba(255, 255, 255, 1);
        }
      }
    }
  }
`;
