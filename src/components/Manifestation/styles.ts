import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 340px;
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border: 2px solid #fff;
  border-radius: 8px;
  padding: 15px;
  position: absolute;
  pointer-events: all;
  cursor: default;
  transition: border 0.3s;
  &:hover {
    border: 2px solid #ddd;
  }
`

export const Header = styled.header`
  > div {
    display: flex;
    align-items: center;
    flex: 1;

    > div {
      display: flex;
      align-items: center;
      justify-content: left;
      flex: 1;

      h1 {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 0;
        color: #000;
      }

      svg {
        margin: 0;
        padding: 0;
        width: 20px;
        height: 20px;
        pointer-events: all;
        cursor: grab;
      }
    }

    > svg {
      margin-left: 20px;
      fill: #000;
      width: 24px;
      height: 24px;
      pointer-events: all;
      cursor: pointer;
    }
  }

  > span {
    font-size: 12px;
    color: #000;
    font-weight: normal;
  }

  section {
    display: flex;
    align-items: center;
    margin-top: 10px;

    span {
      font-size: 12px;
    }

    button {
      display: flex;
      align-items: center;
      background-color: white;
      padding: 2px 10px;
      border-radius: 8px;
      border: 0.8px solid #0b76da;
      font-size: 12px;
      pointer-events: all;
    }
  }
`

export const TagList = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  list-style: none;

  span {
    font-size: 12px;
  }
`

export const DetailsContainer = styled.div`
  p {
    margin-top: 12px;
    color: #000;
    font-size: 14px;
    font-weight: normal;
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
`

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
    pointer-events: all;

    &:hover {
      box-shadow: 0 0 8px rgba(11, 118, 218, 0.5);
    }

    & + button {
      margin-left: 10px;
    }
  }
`
