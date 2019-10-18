import styled from 'styled-components';

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 457px;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  position: relative;

  &:hover {
    box-shadow: 0px 0px 5px rgb(11,118,218,0.2);
  }

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    section {
      display: flex;
      flex: 7;

      h1 {
        font-weight: bold;
        font-size: 16px;
        color: #0E508D;
        width: 350px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    article {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      div {
        height: 12px;
        width: 12px;
        background-color: green;
        border-radius: 50%;
      }
      
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
    
  span{
    font-size: 12px;
  }
  
`;
