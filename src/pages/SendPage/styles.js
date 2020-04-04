import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 30px 35px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgb(11, 118, 218, 0.1);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
    }
  }

  /* corpo */
  > div {
    h1 {
      margin: 5px 0;
    }

    p {
      margin-top: 10px;
      line-height: 1.6;
      width: 70%;
    }

    /* começo do email */
    > section {
      border-top: 1px solid #eee;
      padding-top: 10px;
      margin-top: 15px;

      > header {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        h2 {
          margin-bottom: 0px;
        }

        /* react-select */
        > div {
          width: 30%;
        }
      }

      form {
        input,
        textarea {
          background: #eaedf2;
          border: 2px solid #eaedf2;
          border-radius: 8px;
          padding: 10px;
          width: 100%;
          margin-bottom: 5px;
        }

        textarea {
          resize: none;
          height: 160px;
        }

        > footer {
          display: flex;
          justify-content: space-between;
          align-items: center;

          /* react-select */
          > div {
            width: 100%;
            margin-right: 5px;
          }

          button {
            padding: 5px 10px;
            border: none;
            border-radius: 8px;
            color: #fff;
            font-size: 16px;
            background: #0b76da;
            width: 100px;
            height: 38px;

            &:hover {
              background: rgb(11, 118, 218, 0.8);
            }

            &:active {
              background: rgb(11, 118, 218, 0.4);
            }
          }
        }
      }
    }
  }
`;

export const TagList = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  list-style: none;

  span {
    font-size: 12px;
  }
`;

export const StyledForm = styled.form`
  label {
    font-size: 16px;
  }

  input {
    margin-left: 10px;
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
