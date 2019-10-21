import styled from 'styled-components';

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  height: 333px;
  width: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgb(11, 118, 218, 0.2);
  padding: 15px;
  position: relative;

  header {
    div:first-child {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      h1 {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 0;
      }
    }

    section {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;

      span {
        font-size: 12px;
      }
      ul {
        list-style: none;
        padding: 0px;
        margin: 0px;
      }

      button {
        display: flex;
        align-items: center;
        background-color: white;
        border: none;
        padding: 2px 10px;
        border-radius: 8px;
        border: 0.8px solid #0b76da;
        font-size: 12px;

        &:hover {
          background-color: #dfffff;
        }
      }
    }
  }

  article {
    p:first-child {
      margin: 10px 0;
      color: black;
    }
    p {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.7);
    }
  }

  footer {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;

    button {
      background-color: #0b76da;
      color: white;
      padding: 10px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      font-size: 12px;

      &:hover {
        background: #0665bd;
      }
    }
  }
`;
