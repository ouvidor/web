import styled from "styled-components"

export const Container = styled.div`
  margin: 15px 20px;

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
