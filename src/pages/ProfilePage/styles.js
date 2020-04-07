import styled from 'styled-components';
import PerfectScrollBar from 'react-perfect-scrollbar';

export const NavBar = styled.nav`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 8px;
  padding: 8px 16px;

  a {
    padding: 0 10px;
    color: #000;
    font-size: 18px;
  }

  a:visited {
    color: #000;
  }
`;

const Container = styled.div`
  padding: 10px 20px;
  background: #fff;
  border-radius: 8px;
  border: 2px solid #fff;
  transition: border 0.3s;

  &:hover {
    border: 2px solid #ddd;
  }
`;

export const BoxesContainer = styled.div`
  height: 100%;
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'user members search';
`;

export const UserContainer = styled.div`
  grid-area: user;
`;

export const ProfileContainer = styled(Container)`
  padding: 10px 20px;
  background: #fff;
  border-radius: 8px;
  border: 2px solid #fff;
  transition: border 0.3s;

  p {
    font-size: 16px;
    font-weight: bold;
  }
`;

export const EditProfileContainer = styled(Container)``;

export const MembersContainer = styled(Container)`
  grid-area: members;
  max-height: 100%;

  ul {
    margin-top: 10px;

    li {
      background: #ddd;
      padding: 10px 20px;
      border: 1px solid #ddd;
      border-radius: 8px;

      color: #2d2d2d;
      font-size: 16px;
      font-weight: bold;
    }

    li + li {
      margin-top: 5px;
    }
  }
`;

export const SearchContainer = styled(Container)`
  grid-area: search;
`;

export const Scroll = styled(PerfectScrollBar)`
  margin-top: 10px;
  min-width: 100%;
  max-width: 100%;
  padding: 5px 0px 0 0;
`;
