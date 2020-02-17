import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

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

  > span {
    border-radius: 8px;
    padding: 2px 8px;
    position: absolute;
    right: 10px;
    top: ${props => (props.height ? `${props.height - 15}px` : `50px`)};
    background-color: #ffdfdf;
    color: #c44543;
    border: 1px solid #c44543;
    box-shadow: 0 2px 4px rgba(196, 69, 67, 0.5);
    z-index: 1;
  }
`;
