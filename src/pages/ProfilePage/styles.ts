import styled from "styled-components"
import PerfectScrollBar from "react-perfect-scrollbar"

export const NavBar = styled.nav`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 8px;
  padding: 8px 16px;
  margin-bottom: 20px;

  a {
    padding: 0 10px;
    color: #000;
    font-size: 18px;
  }

  a:visited {
    color: #000;
  }
`

const Container = styled.section`
  padding: 10px 20px;
  background: #fff;
  border-radius: 8px;
  border: 2px solid #fff;
  transition: border 0.3s;

  &:hover {
    border: 2px solid #ddd;
  }

  h1 {
    font-size: 36px;
    font-weight: 800;
    margin: 0 0 10px 0;
    padding: 0;
  }
`

export const ProfileContainer = styled(Container)`
  span {
    font-size: 14px;
    margin-right: 15px;
  }

  button {
    margin: 15px 0 7px 0;
    background: #f08781;
    border: 2px solid #f08781;
    border-radius: 4px;
    padding: 6px 12px;
    transition: border 0.3s;
    font-size: 16px;
  }

  button:hover {
    border: 2px solid #eb6a63;
  }

  p {
    font-size: 18px;
  }
`

export const EditProfileContainer = styled(Container)`
  input {
    background: #eee;
    margin-bottom: 5px;
  }

  button {
    margin: 15px 0 7px 0;
    background: #7eb9e6;
    border: 2px solid #7eb9e6;
    border-radius: 4px;
    padding: 6px 12px;
    transition: border 0.3s;
    font-size: 18px;
  }

  button:hover {
    border: 2px solid #3c9ee8;
  }
`

export const CreateUserContainer = styled(Container)`
  input {
    background: #eee;
    margin-bottom: 5px;
  }

  button {
    margin: 15px 0 7px 0;
    background: #86e670;
    border: 2px solid #86e670;
    border-radius: 4px;
    padding: 6px 12px;
    transition: border 0.3s;
    font-size: 18px;
  }

  button:hover {
    border: 2px solid #6ae04f;
  }
`

export const IsAdminContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;

  input {
    width: 20px;
    height: 20px;
  }

  label {
    margin-left: 10px;
  }
`

export const MembersContainer = styled(Container)`
  grid-area: members;
  max-height: 100%;
`

export const AdminList = styled.ul`
  margin-top: 10px;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;

    background: #eee;
    padding: 10px 15px;
    border: 2px solid #eee;
    border-radius: 8px;

    color: #2d2d2d;
    font-size: 16px;
    font-weight: bold;
    transition: border 0.3s;

    section {
      span {
        margin-right: 10px;
      }
    }

    div {
      display: flex;
      align-items: center;

      input {
        margin-left: 15px;
        width: 20px;
        height: 20px;
      }
    }
  }

  li:hover {
    border: 2px solid #ddd;
  }

  li + li {
    margin-top: 5px;
  }
`

export const UserContainer = styled(Container)`
  margin-bottom: 15px;

  label {
    font-size: 16px;
    margin-bottom: 2px;
  }

  input {
    background: #eee;
    margin-bottom: 4px;
  }

  button {
    border: 2px solid #ccc;
    border-radius: 4px;
    padding: 5px 10px;
    margin-bottom: 4px;
    transition: border 0.3s;
  }

  button:hover {
    border: 2px solid #0b76da;
  }

  div {
    p {
      font-size: 18px;

      span {
        font-size: 14px;
        margin-right: 15px;
      }
    }
  }
`

export const TransformIntoAdminCheckContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 5px 0;

  span {
    font-size: 16px;
  }

  input {
    margin-left: 10px;
    width: 20px;
    height: 20px;
  }
`

export const SearchContainer = styled(Container)`
  grid-area: search;
`

export const Scroll = styled(PerfectScrollBar)`
  margin-top: 10px;
  min-width: 100%;
  max-width: 100%;
  padding: 5px 0px 0 0;
`
