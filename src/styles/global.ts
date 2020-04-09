import { createGlobalStyle } from "styled-components"
import "react-toastify/dist/ReactToastify.css"
import "react-perfect-scrollbar/dist/css/styles.css"

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }
  *:focus {
    outline: 0;
  }
  html, body {
    min-height: 100%;
  }
  #root {
    min-height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased;
  }
  body, button, input, textarea {
    font: 14px 'Open Sans', sans-serif;
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
  button {
    cursor: pointer;
  }
`
