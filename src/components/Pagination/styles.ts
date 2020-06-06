import styled, { css } from "styled-components"

export const Container = styled.div`
  background-color: #fff;
  border: 2px solid #fff;
  border-radius: 8px;
  height: 40px;
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border 0.3s;
  &:hover {
    border: 2px solid #ddd;
  }

  span {
    user-select: none;
    color: #0b76da;
  }
`

type ButtonProps = {
  blocked?: 1 | 0 | boolean
}

export const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 4px;
  height: 36px;
  width: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;

  svg {
    fill: #0b76da;
    width: 20px;
    height: 20px;
    transition: all 0.1s;
  }

  ${(props) =>
    props.blocked
      ? css`
          cursor: not-allowed;
          opacity: 0.2;
        `
      : css`
          &:hover {
            svg {
              fill: #0b4cda;
            }
          }
        `}
`
