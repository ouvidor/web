import styled from 'styled-components';
import { Form } from '@rocketseat/unform';
import PerfectScrollBar from 'react-perfect-scrollbar';

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

export const StyledForm = styled(Form)`
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

export const GridContainer = styled.div`
  max-height: 95vh;
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: 0.5fr 1fr;
  grid-gap: 8px;
  grid-template-areas: 'manifestation history' 'status history';

  > div {
    background: #fff;
    padding: 20px 25px;
    border-radius: 8px;
    box-shadow: 0 6px 12px rgb(11, 118, 218, 0.1);
  }
`;

export const ManifestationContainer = styled.div`
  grid-area: manifestation;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    margin: 5px 0;
  }

  p {
    margin-top: 10px;
    line-height: 1.6;
    width: 70%;
  }

  footer {
    margin-top: 20px;
  }
`;

export const StatusContainer = styled.div`
  grid-area: status;

  input,
  textarea {
    background: #eaedf2;
    border: none;
    border-radius: 8px;
    padding: 10px;
    width: 100%;
    margin-top: 5px;
  }

  textarea {
    resize: none;
    height: 140px;
  }

  > form {
    footer {
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      > button {
        margin-left: 10px;
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
`;

export const HistoryContainer = styled.div`
  grid-area: history;
  display: flex;
  flex-direction: column;

  > button {
    background: #0b76da;
    border: none;
    border-radius: 8px;
    padding: 10px 15px;
    color: #fff;
  }

  > ul {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const Scroll = styled(PerfectScrollBar)`
  margin-top: 10px;
  min-width: 100%;
  max-width: 100%;
  padding: 5px 0px 0 0;
`;
