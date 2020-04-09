import styled from "styled-components"

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 1px 20px;
  grid-template-areas: "ombudsman prefecture";

  @media only screen and (max-width: 1000px) {
    & {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 20px 1px;
      grid-template-areas: "ombudsman" "prefecture";
    }
  }
`
export const OmbudsmanContainer = styled.div`
  grid-area: ombudsman;
`
export const PrefectureContainer = styled.div`
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
