import styled from 'styled-components';

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  height: 376px;
  width: 325px;
  background-color: #eee;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  padding: 15px;
  position: relative;

  header {
    h1 {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 5px;
    }

    section {
      display: flex;
      justify-content: space-between;
      ul {
        list-style: none;
        padding: 0px;
        margin: 0px;
      }
      div:last-child {
        display: flex;
        align-items: center;
        width: 70px;
      }
    }
  }

  article {
    p {
      margin: 10px 0;
      font-size: 12px;
    }
    button {
      display: flex;
      align-items: center;
      background-color: #2d2d2d;
      border: none;
      padding: 2px 10px;
      border-radius: 8px;

      &:hover {
        background-color: #444;
      }
    }
  }

  footer {
    margin-top: auto;

    button {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
    p {
      font-size: 12px;
      opacity: 0.5;
    }
  }
`;
