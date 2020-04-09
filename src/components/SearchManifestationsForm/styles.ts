import styled from "styled-components"

export const StyledForm = styled.form`
  width: 100%;
  margin-bottom: 12px;
`

export const TextInputContainer = styled.div`
  display: flex;
  margin-bottom: 6px;
  border-radius: 8px;
  position: relative;

  input {
    width: 100%;
    height: 35px;
    padding-left: 10px;
    background: #fff;
    border: 2px solid #fff;
    border-right: none;
    border-radius: 8px 0 0 8px;
    transition: border 0.3s;

    &:hover {
      border: 2px solid #ddd;
      border-right: none;
    }
  }

  button {
    background-color: #0b76da;
    border-radius: 0 8px 8px 0;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    transition: all 0.2s;

    svg {
      width: 20px;
      height: 20px;
      fill: rgba(255, 255, 255, 0.7);
      transition: fill 0.2s;
    }

    &:hover {
      svg {
        fill: rgba(255, 255, 255, 1);
      }
    }
  }
`
