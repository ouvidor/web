import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  label {
    text-align: left;
  }

  input,
  textarea {
    height: 40px;
    background: #fff;
    border: 2px solid #fff;
    border-radius: 8px;
    padding: 0 10px;
    transition: border 0.3s;

    &:hover {
      border: 2px solid #ddd;
    }
  }

  textarea {
    height: 120px;
    resize: none;
    padding-top: 10px;
  }
`;
