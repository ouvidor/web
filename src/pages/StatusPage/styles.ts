import styled from "styled-components"

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

export const GridContainer = styled.div`
  max-height: 100%;
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: 0.34fr 1fr;
  grid-gap: 8px;
  grid-template-areas: "manifestation history" "status history";

  > div {
    background: #fff;
    padding: 20px 25px;
    border-radius: 8px;
    box-shadow: 0 6px 12px rgb(11, 118, 218, 0.1);
  }
`

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
`

export const StatusContainer = styled.div`
  grid-area: status;

  input,
  textarea {
    background: #eaedf2;
    border: 2px solid #eaedf2;
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
      margin-top: 20px;
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      > button {
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
`
