import styled from "styled-components"

export const Background = styled.div`
  height: 100%;
  min-height: 100vh;
  background: #eaedf2;
  flex: 1;
  padding: 15px 20px;

  h1,
  h2 {
    color: #2d2d2d;
    font-variant-ligatures: none;
    margin-bottom: 20px;
  }

  hr {
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin: 20px;
  }
`

export const FieldError = styled.span<{ height?: number }>`
  border-radius: 8px;
  padding: 2px 8px;
  position: absolute;
  right: 10px;
  top: ${(props) => (props.height ? `${props.height - 15}px` : `50px`)};
  background-color: #ffdfdf;
  color: #c44543;
  border: 2px solid #c44543;
  box-shadow: 0 4px 8px rgba(196, 69, 67, 0.4);
  z-index: 1;
`
