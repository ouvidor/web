import styled from "styled-components"

import pattern from "../../assets/hideout.svg"

export const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e2ebf0;
  background-image: url(${pattern});
  background-size: 50px;
`

export const Container = styled.div`
  width: 100%;
  max-width: 420px;
  text-align: center;
  background: #eee;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);

  form {
    > div {
      margin-bottom: 10px;
    }

    span,
    label {
      font-size: 16px;
      color: #2d2d2d;
      margin-bottom: 5px;
    }

    button {
      width: 100%;
      border: none;
      border-radius: 8px;
      background: rgb(11, 118, 218);
      margin-top: 15px;
      padding: 5px 12px;
      height: 50px;
      transition: box-shadow 0.3s;
      color: #fff;
      font-size: 16px;

      &:hover {
        box-shadow: 0 2px 8px rgba(11, 118, 218, 0.1);
      }
    }
  }
`
