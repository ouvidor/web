import styled from 'styled-components';

export const Container = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-grow: 1;
  background-color: #ddd;
  padding: 10px 15px;
  flex-direction: column;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const SearchInput = styled.input`
  width: 300px;
  height: 30px;
  padding-left: 10px;
  background: #eee;
  border-radius: 4px 0 0 4px;
  border: none;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

export const SearchButton = styled.button`
  background-color: #ccc;
  border-radius: 0 4px 4px 0;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 30px;
  transition: all 0.2s;

  svg {
    width: 25px;
    height: 25px;
    fill: rgba(0, 0, 0, 0.5);
  }

  &:hover {
    background-color: #bbb;
  }
`;

export const TagFilterContainer = styled.div`
  margin-top: 5px;

  color: rgba(0, 0, 0, 0.8);

  > span {
    margin-right: 5px;
  }
`;

export const ClearTagsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  padding: 2px 5px;
  background: #d32727;
  color: #fff;
  font-size: 14px;
  margin-right: 10px;

  svg {
    width: 14px;
    height: 14px;
    fill: #fff;
    margin-right: 3px;
  }

  &:hover {
    box-shadow: 0 0 2px rgb(211, 39, 39, 0.8);
  }
`;
