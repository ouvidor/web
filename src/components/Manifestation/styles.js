import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 333px;
  width: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgb(11, 118, 218, 0.2);
  padding: 15px;
  position: relative;
`;

export const Header = styled.header`
  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    h1 {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 0;
    }
  }

  > span {
    font-size: 12px;
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
      transition: box-shadow 0.2s;

      &:hover {
        box-shadow: 0 0 4px rgba(11, 118, 218, 0.5);
      }
    }
  }
`;

export const DetailsContainer = styled.div`
  p {
    margin-top: 12px;
  }

  div {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);

    & + div {
      margin-top: 5px;
    }
  }
`;

export const Footer = styled.footer`
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
    transition: box-shadow 0.2s;

    &:hover {
      box-shadow: 0 0 8px rgba(11, 118, 218, 0.5);
    }
  }
`;
