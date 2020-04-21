import styled from "styled-components"

export const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #eee;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;

  & + li {
    margin-top: 10px;
  }
`

export const Title = styled.span`
  font-size: 16px;
  font-weight: bold;
`

export const Date = styled.span`
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
`
