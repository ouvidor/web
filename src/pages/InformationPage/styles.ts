import styled from "styled-components"

export const CreateNewContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-evenly;

  button {
    border-radius: 4px;
    border: 2px solid #ddd;
    background: #ddd;
    padding: 5px 10px;
    transition: border 0.3s;
  }

  button:hover {
    border: 2px solid #aaa;
  }
`

export const PopupContainer = styled.div`
  padding: 20px 40px;

  form {
    label {
      margin-bottom: 5px;
    }
    input,
    textarea {
      background: #eee;
      border: 2px solid #eee;
    }

    button {
      margin-top: 10px;
      background: #86e670;
      border: 2px solid #86e670;
      transition: border 0.3s;
    }

    button:hover {
      border: 2px solid #54a341;
    }
  }
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 1px 20px;
  grid-template-areas: "ombudsman prefecture";

  @media only screen and (max-width: 1000px) {
    & {
      display: flex;
      flex-wrap: wrap;
    }
  }
`
export const OmbudsmanContainer = styled.div`
  margin: 0 10px;
  grid-area: ombudsman;
`
export const PrefectureContainer = styled.div`
  margin: 0 10px;
  grid-area: prefecture;
`

export const Header = styled.header`
  margin-bottom: 20px;
  h1,
  h2,
  h3 {
    margin-bottom: 5px;
  }
  h1 {
    font-size: 32px;
    margin-bottom: 10px;
  }
  p {
    font-weight: 600;
    display: inline-block;
    line-height: 1.618;
  }
  button {
    border-radius: 4px;
    border: 2px solid #ddd;
    background: #eee;
    padding: 4px 8px;
    margin-top: 5px;
    font-size: 16px;
    transition: border 0.3s;
  }
  button:hover {
    border: 2px solid #ccc;
  }
  button:active {
    border: 2px solid #0b76da;
  }
  section > div {
    margin-top: 10px;
  }
`

export const Section = styled.div`
  form {
    > div {
      margin-bottom: 5px;
    }

    span,
    label {
      font-size: 16px;
      color: #2d2d2d;
      margin-bottom: 5px;
    }

    button {
      border: none;
      border-radius: 8px;
      background: rgb(11, 118, 218);
      margin-top: 15px;
      padding: 10px 20px;
      transition: box-shadow 0.3s;
      color: #fff;
      font-size: 16px;

      &:hover {
        box-shadow: 0 2px 8px rgba(11, 118, 218, 0.1);
      }
    }
  }
`
