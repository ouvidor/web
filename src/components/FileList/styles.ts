import styled from "styled-components"

export const ListContainer = styled.div`
  ul {
    list-style: none;
    display: flex;
    flex-flow: row wrap;
  }
`

export const ListItem = styled.li`
  margin: 5px;

  > div,
  img {
    width: 100px;
    height: 75px;
    border-radius: 8px;
    object-fit: cover;
    background: rgba(0, 0, 0, 0.1);
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;

    svg {
      width: 24px;
      height: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-bottom: 4px;
    }

    p {
      overflow: hidden;
      white-space: nowrap;
      width: 80px;
      text-overflow: ellipsis;
      font-size: 12px;
      text-align: center;
    }
  }
`
