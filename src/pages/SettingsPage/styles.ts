import styled from "styled-components"
import { Background as background } from "../../styles"

export const Container = styled.div`
  width: 80%;
`

export const Background = styled(background)`
  padding-top: 50px;
  display: flex;
  justify-content: center;
`

export const AboutList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  li {
    display: flex;
    align-items: center;

    background: #fff;
    border-radius: 4px;
    margin: 2px 4px;
    padding: 5px 10px;
    text-align: center;
  }
`
