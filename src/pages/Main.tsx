import styled, { keyframes } from "styled-components";
import AuroraBackground from '../assets/images/Aurora-Main-Background.jpg'

const Main = () => {
  return (
    <MainTag>
      <AuroraInfo>
        Aurora
        <AuroraIntro>
          Aurora monitoring system,<br/>
          where modern technology<br/>
          meets sleek design.
        </AuroraIntro>
      </AuroraInfo>

      <StarContainer>
        <Star/>
        <Star/>
        <Star/>
      </StarContainer>


    </MainTag>
  )
}

const shootingStarAnimation = keyframes`
  0% {
    transform: translateY(-100px) translateX(0);
    opacity: 0;
  }
  50% {
    transform: translateY(200px) translateX(200px);
    opacity: 1;
  }
  100% {
    transform: translateY(500px) translateX(400px);
    opacity: 0;
  }
`;


const MainTag = styled.main`
  background-image: url(${AuroraBackground});
  width: 100%;
  height: 100vh;
  background-size: cover;
  font-family: 'Poppins', sans-serif;
  color: #fff;
`

const AuroraInfo = styled.div`
  width: 85%;
  height: 20vh;
  font-size: 4.5rem;
  margin: auto;
  padding-top: 37vh;
`

const AuroraIntro = styled.div`
  font-size: 2.2rem;
`

const StarContainer = styled.div`
  position: relative;
`

const Star = styled.div`
  position: absolute;
  top: -100px;
  left: -100px;
  width: 30px;
  height: 30px;
  background-color: yellow;
  border-radius: 50%;
  animation: ${shootingStarAnimation} 2s linear infinite;

  &:nth-child(2) {
    animation-delay: 0.5s;
    top: -200px;
    left: -200px;
  }

  &:nth-child(3) {
    animation-delay: 1s;
    top: -300px;
    left: -300px;
  }
`;

export default Main