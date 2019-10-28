import styled from 'styled-components';

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
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  input,
  textarea {
    height: 40px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 0 10px;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: 0 2px 12px rgb(11, 118, 218, 0.1);
    }
  }

  textarea {
    height: 120px;
    resize: none;
    padding-top: 10px;
  }
`;
