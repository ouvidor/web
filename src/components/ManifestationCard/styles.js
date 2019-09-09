import styled from 'styled-components';

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 145px;
  width: 250px;
  background-color: #eee;
  border-radius: 8px;
  padding: 15px;
  position: relative;

  header {
    h1 {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 5px;
    }

    ul {
      list-style: none;
      padding: 0px;
      margin: 0px;
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
    opacity: 0.5;
    user-select: none;

    section {
      display: flex;
      align-items: center;

      svg {
        margin-right: 5px;
        width: 20px;
        height: 20px;
      }
    }

    button {
      border: none;
      background: transparent;
      display: flex;
      align-items: center;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }

  div {
    content: '';
    position: absolute;
    height: 15px;
    width: 15px;
    top: -5px;
    right: -5px;
    background: #f07c3a;
    border-radius: 50%;
  }
`;
