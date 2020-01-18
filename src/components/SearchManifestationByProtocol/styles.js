import styled from 'styled-components';
import { Form } from 'formik';

export const StyledForm = styled(Form)`
  label {
    font-size: 16px;
  }

  input {
    margin-bottom: 10px;
    padding: 5px 10px;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #ddd;
    transition: all 0.3s;
    width: 320px;

    &:hover {
      border: 1px solid #0b76da;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
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
