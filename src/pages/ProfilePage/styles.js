import styled from 'styled-components';

export const ProfileContainer = styled.div`
  background: #0b76da;
  border-radius: 8px;
  padding: 10px 15px;
  margin-top: 10px;

  &:hover {
    box-shadow: 4px 0 10px rgba(11, 118, 218, 0.2);
  }

  li {
    background: #eee;
    border-radius: 8px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    aside {
      display: flex;
      align-items: center;
      justify-content: space-between;
      section {
        border-left: 1px solid rgba(0, 0, 0, 0.2);
        margin-left: 10px;
        padding-left: 10px;
      }
    }

    button {
      border: 1px solid #2d2d2d;
      border-radius: 4px;
      background: transparent;
      padding: 2px 8px;
      transition: all 0.2s;

      &:hover {
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
      }

      & + button {
        margin-left: 10px;
        background: rgb(199, 29, 72);
        color: #fff;
        font-weight: bold;
        border: none;

        &:hover {
          box-shadow: 0 0 8px rgba(199, 29, 72, 0.4);
        }
      }
    }
  }
`;
