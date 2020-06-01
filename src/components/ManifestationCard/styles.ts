import styled from "styled-components"

export const Container = styled.li<{ onClick: Function }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 100%;
  max-width: 100%;
  background-color: #fff;
  border-radius: 8px;
  border: 2px solid #fff;
  padding: 10px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  & + li {
    margin-top: 10px;
  }
  &:hover {
    border: 2px solid #ddd;
  }

  > span {
    font-weight: bold;
    font-size: 16px;
    color: #0e508d;
    max-width: 100%;
    flex: 1;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    > svg {
      height: 20px;
      width: 20px;
    }
  }
`

export const TagList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  list-style: none;
  padding: 0px;
  margin: 4px 0 0 0;

  span {
    font-size: 12px;
  }
`
