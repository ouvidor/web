import styled from 'styled-components';

import pattern from '../../assets/hideout.svg';

export const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e2ebf0;
  background-image: url(${pattern});
  background-size: 50px;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 420px;
  text-align: center;
  background: #eee;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);

  form {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input {
      width: 100%;
      background: #fff;
      border: 0;
      border-radius: 8px;
      height: 50px;
      padding: 0 15px;
      color: #000;
      margin: 0 0 10px;
      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
      }
    }

    button {
      width: 100%;
      height: 50px;
      margin: 5px 0 0;
      background: #2e55e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 8px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: #506fe9;
      }
    }

    span {
      padding: 2px 15px;
      margin-bottom: 10px;
      color: #c44543;
      border: 1px solid #c44543;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
  }
`;
