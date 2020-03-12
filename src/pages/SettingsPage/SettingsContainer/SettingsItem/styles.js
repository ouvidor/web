import styled from 'styled-components';
import { MdCheck, MdClear } from 'react-icons/md';

export const StyledMdCheck = styled(MdCheck)`
  width: 20px;
  height: 20px;
  transition: all 0.2s;

  &:hover {
    fill: #0b76da;
  }

  &:active {
    fill: rgba(11, 118, 218, 0.5);
  }
`;

export const StyledMdClear = styled(MdClear)`
  width: 20px;
  height: 20px;
  transition: all 0.2s;

  &:hover {
    fill: #c71d48;
  }

  &:active {
    fill: rgba(199, 29, 72, 0.5);
  }
`;

export const Container = styled.li`
  background: linear-gradient(90deg, #ddd, #ededed);
  border-radius: 8px;
  margin-bottom: 5px;

  form {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      width: 100%;
      margin-right: 10px;
      position: relative;
      display: flex;
      align-items: center;

      input {
        padding: 5px 10px;
        background: linear-gradient(90deg, #eee, #ddd);
        border: 2px solid #ddd;
        border-radius: 8px;
        transition: all 0.3s;

        width: 100%;

        &:hover {
          border: 2px solid #aaa;
        }
      }
    }

    aside {
      display: flex;
      margin-right: 10px;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5px;

        svg {
        }
      }
    }

    input,
    button {
      background: transparent;
      border: none;
    }
  }
`;
