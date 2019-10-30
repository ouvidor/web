import styled from 'styled-components';

export const Container = styled.div`
  background: #0b76da;
  min-width: 68px;
  max-width: 68px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  z-index: 1;
  position: fixed;
  overflow: hidden;

  svg {
    fill: #fff;
    width: 22px;
    height: 22px;
  }

  ul {
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    background: rgba(255, 255, 255, 0.3);
  }

  a {
    min-height: 50px;
    max-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
`;

export const ActiveIndicator = styled.div`
  width: 10px;
  height: 44px;
  border-radius: 8px 0 0 8px;
  background: #eaedf2;
  position: absolute;
  left: 58px;
  animation: ANIMATION .2s;

  @keyframes ANIMATION {
    0% {
      left: 69px;
    }
    100% {
      left: 58px;
    }
  }
`;
