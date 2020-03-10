import styled from 'styled-components';

export const StyledForm = styled.form`
  label {
    font-size: 16px;
  }

  input {
    margin-bottom: 10px;
    padding: 5px 10px;
    background: #fff;
    border-radius: 8px;
    border: 2px solid #fff;
    transition: border 0.3s;
    width: 320px;

    &:hover {
      border: 2px solid #ddd;
    }
  }

  button {
    display: block;
    padding: 5px 10px;
    font-size: 16px;
    background: #0b76da;
    color: #fff;
    border-radius: 8px;
    border: none;
    transition: all 0.2s;

    &:hover {
      background: rgb(11, 118, 218, 0.8);
    }

    &:active {
      background: rgb(11, 118, 218, 0.4);
    }
  }
`;
