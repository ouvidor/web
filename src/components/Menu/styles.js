import styled from 'styled-components';

export const Background = styled.div`
  height: 100vh;
  width: 70px;
  background: #bbb;

  nav {
    display: flex;
    justify-content: center;
  }
`;

export const ButtonsList = styled.ul`
  margin-left: 0px;
  padding: 0px;
  margin-top: 15px;

  li {
    height: 50px;
    width: 50px;
    padding: 5px;
    background-color: #ddd;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 8px rgb(75, 170, 224, 0.8);
    }

    & + li {
      margin-top: 15px;
    }

    a {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    /* classe para quando o NavLink estiver ativo */
    .active-menu-btn {
      svg {
        fill: rgb(75, 170, 224, 0.9);
      }
    }

    svg {
      fill: #2d2d2d;
      width: 30px;
      height: 30px;
    }
  }
`;
