import styled from 'styled-components';

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 100%;
  max-width: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  position: relative;

  &:hover {
    box-shadow: 0px 4px 12px rgb(11, 118, 218, 0.2);
  }

  section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-weight: bold;
      font-size: 16px;
      color: #0e508d;
      max-width: 100%;
      flex: 1;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    div {
      height: 12px;
      width: 12px;
      background-color: green;
      border-radius: 50%;
    }
  }
`;

export const TagList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  list-style: none;
  padding: 0px;
  margin: 4px 0 0 0;

  span {
    font-size: 12px;
  }
`;
