import styled, { css } from 'styled-components';

export const Container = styled.div`
  background-color: #ddd;
  border-radius: 4px;
  height: 40px;
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    user-select: none;
  }
`;

export const Button = styled.button`
  border: none;
  border-radius: 4px;
  height: 40px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: #000;
    width: 20px;
    height: 20px;
    transition: all 0.1s;
  }

  ${props =>
    props.blocked
      ? css`
          cursor: not-allowed;
          opacity: 0.3;
        `
      : css`
          &:hover {
            svg {
              fill: #bbb;
            }
          }
        `}
`;
