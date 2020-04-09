import styled from "styled-components"
import PerfectScrollBar from "react-perfect-scrollbar"

export const Container = styled.div`
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
`

export const Scroll = styled(PerfectScrollBar)`
  margin-top: 10px;
  min-width: 100%;
  max-width: 100%;
  padding: 5px 0px 0 0;
`
