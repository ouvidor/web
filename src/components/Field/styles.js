import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  input,
  textarea {
    height: 40px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 0 10px;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: 0 2px 12px rgb(11, 118, 218, 0.1);
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
