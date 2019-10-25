import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 10px;
  align-self: stretch;

  label {
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #fff;
    border-radius: 8px;
    align-items: center;
    position: relative;
    cursor: pointer;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: 0 8px 12px rgb(11, 118, 218, 0.1);
    }

    span {
      color: rgba(0, 0, 0, 0.5);
      font-weight: bold;
      font-size: 16px;
      flex-grow: 1;
      align-self: center;
      text-align: center;
    }

    img {
      height: 100%;
      width: 100%;
      border-radius: 4px;
      z-index: 1;
    }

    /* não mostrar o verdadeiro input */
    input {
      display: none;
    }
  }
`;

export const ContainerPlaceholder = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    span {
      margin-left: 20px;
    }
  }
`;
