import styled, { keyframes } from "styled-components";

const floatingAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-13px);
  }
  100% {
    transform: translateY(0px);
  }
`;


export const ErrorContainer = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  & .logo-container {
    width: 25rem;
    height: 32rem;
    text-align: center;

    & svg {
      width: 100%;
      animation: ${floatingAnimation} 2.5s ease-in-out infinite;
    }

    & .status-code {
      color: ${({theme}) => theme.fontColor};
      font-size: 2rem;
      font-weight: 600;
    }

    & button {
      color: #fff;
      border: none;
      border-radius: 5px;
      background-color: #2A5BCE;
      margin-top: 1rem;
      width: 8rem;
      height: 2.5rem;
      cursor: pointer;
      transition: all .25s;

      &:hover {
        background-color: #2551b9;
      }
    }
  }
`

export const NavigateToMain = () => {
  window.location.replace('/')
}