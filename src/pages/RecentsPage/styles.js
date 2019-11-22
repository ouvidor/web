import styled from 'styled-components';

export const Container = styled.div`
  margin: 15px 20px;

  > header {
    max-width: 500px;
  }
`;

export const Grid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: 1fr;
  grid-gap: 8px;
  grid-template-areas: 'list manifestation';
`;

export const ManifestationList = styled.ul`
  grid-area: 'list';
`;

export const ManifestationContainer = styled.div`
  grid-area: 'manifestation';
  position: sticky;
  top: 0;
  height: 340px;
`;

export const NoSelectedContainer = styled.div`
  background: #fff;
  border: 2px solid #eee;
  border-radius: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    border: 2px solid #ccc;
  }

  svg {
    width: 40px;
    height: 40px;
    fill: rgba(0, 0, 0, 0.6);
  }

  p {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
  }
`;
