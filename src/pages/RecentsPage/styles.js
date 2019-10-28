import styled from 'styled-components';

export const Container = styled.div`
  margin: 15px 20px;

  > header {
    max-width: 500px;
  }
`;

export const ManifestationList = styled.ul`
  background: rgb(11, 118, 218);
  margin-top: 20px;
  padding: 15px 20px;
  border-radius: 8px;

  > li {
    background: #fff;
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;

    > span {
      font-size: 18px;
      font-weight: bold;
    }
  }
`;
