import styled, { css } from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  height: 40px;
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;

  span {
    user-select: none;
    color: #0b76da;
  }

  &:hover {
    box-shadow: 0px 3px 8px rgb(11, 118, 218, 0.2);
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
  background-color: white;

  svg {
    fill: #0b76da;
    width: 20px;
    height: 20px;
    transition: all 0.1s;
  }

  ${props =>
    props.blocked
      ? css`
          cursor: not-allowed;
          opacity: 0.2;
        `
      : css`
          &:hover {
            svg {
              fill: #0b4cda;
            }
          }
        `}
`;
