import styled, { keyframes } from "styled-components";
import AuroraBackground from '../assets/images/Aurora-Main-Background.jpg'
import Header from "./components/Header";

const Main = () => {
  return (
    <MainTag>
      <Header/>
      <AuroraInfo>
        Aurora
        <AuroraIntro>
          Aurora monitoring system,<br/>
          where modern technology<br/>
          meets sleek design.
        </AuroraIntro>
      </AuroraInfo>

      <Star />
      <Star style={{ right: 0, left: 'initial', animationDelay: '0s', animationDuration: '1s' }} />
      <Star style={{ right: '80px', left: 'initial', animationDelay: '0.3s', animationDuration: '3s' }} />
      <Star style={{ right: '160px', left: 'initial', animationDelay: '0.6s', animationDuration: '2s' }} />
      <Star style={{ right: '250px', left: 'initial', animationDelay: '0.9s', animationDuration: '1.5s' }} />
      <Star style={{ right: '400px', left: 'initial', animationDelay: '1.2s', animationDuration: '2.5s' }} />
      <Star style={{ right: '600px', left: 'initial', animationDelay: '1.5s', animationDuration: '3s' }} />
      <Star style={{ right: '0px', left: 'initial', animationDelay: '1.8s', animationDuration: '1.75s' }} />


    </MainTag>
  )
}

const animate = keyframes`
  0% {
    transform: rotate(315deg) translateX(0);
    visibility: hidden;
    opacity: 0;
  }
  70% {
    visibility: visible;
    opacity: 1;
  }
  100% {
    transform: rotate(315deg) translateX(-1000px);
    opacity: 0;
  }
`;


const MainTag = styled.main`
  margin: 0;
  padding:0;
  box-sizing: border-box;
  background-image: url(${AuroraBackground});
  width: 100%;
  height: 100vh;
  background-size: cover;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`

const AuroraInfo = styled.div`
  width: 85%;
  height: 20vh;
  font-size: 5rem;
  margin: auto;
  padding-top: 27vh;
`

const AuroraIntro = styled.div`
  font-size: 2.2rem;
`

const Star = styled.span`
  z-index: 0;
  position: absolute;
  left: 50%;
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(255,255,255,0.1),0 0 0 8px rgba(255,255,255,0.1),0 0 20px rgba(255,255,255,0.1);
  animation: ${animate} 3s linear infinite;
  visibility: hidden;
  opacity: 0;
  top: 0;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    height: 1px;
    background: linear-gradient(90deg, #fff, transparent);
    visibility: visible;
  }
`;

export default Main