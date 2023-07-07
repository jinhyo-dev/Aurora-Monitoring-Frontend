import styled, { keyframes } from "styled-components";

const SpinLoaders = () => {
  return (
    <Svg viewBox="25 25 50 50">
      <Circle r="20" cy="50" cx="50"></Circle>
    </Svg>
  )
}

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dashoffset: -125px;
  }
`

const Svg = styled.svg`
  width: 3em;
  transform-origin: center;
  animation: ${rotate} 2s linear infinite;
`

const Circle = styled.circle`
  fill: none;
  stroke: ${({theme}) => theme.fontSecondColor};
  stroke-width: 3;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
`

export default SpinLoaders