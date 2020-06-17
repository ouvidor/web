import styled from "styled-components"

export const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 8px;
  border: 0.8px solid #0b76da;
  font-size: 14px;
  background: #fafafa;
  pointer-events: all;
  transition: all 0.3s;

  &:hover {
    border: 0.8px solid #4ea3f2;
  }

  &:active {
    background: #fff;
  }

  svg {
    margin-right: 5px;
  }
`
