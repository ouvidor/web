import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

export const StyledForm = styled(Form)`
  width: 100%;
  margin-bottom: 12px;
`;

export const TextInput = styled.div`
  display: flex;
  margin-bottom: 6px;
  border-radius: 8px;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0px 0px 5px rgb(11, 118, 218, 0.2);
  }

  input {
    width: 100%;
    height: 35px;
    padding-left: 10px;
    background: #fff;
    border: none;
    border-radius: 8px 0 0 8px;
  }

  button {
    background-color: #0b76da;
    border-radius: 0 8px 8px 0;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    transition: all 0.2s;

    svg {
      width: 20px;
      height: 20px;
      fill: rgba(255, 255, 255, 0.7);
      transition: fill 0.2s;
    }

    &:hover {
      svg {
        fill: rgba(255, 255, 255, 1);
      }
    }
  }
`;
