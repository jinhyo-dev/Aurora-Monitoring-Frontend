import styled, { keyframes } from "styled-components";
import AuroraBackground from '../assets/images/Aurora-Main-Background.jpg'
import Header from "./components/Header";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

const Main = () => {
  useEffect(() => {
    const stars: NodeListOf<HTMLElement> = document.querySelectorAll('.star');
    stars.forEach(setRandomStyles);
  },[])

  const pageTitle = 'Aurora'

  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const setRandomStyles = (element: HTMLElement): void => {
    const minRight = 0;
    const maxRight = 1200;
    const minDelay = 1;
    const maxDelay = 8;
    const minDuration = 1.5;
    const maxDuration = 5;

    const right: number = getRandomInt(minRight, maxRight);
    const delay: number = getRandomInt(minDelay, maxDelay);
    const duration: number = getRandomInt(minDuration, maxDuration);

    element.style.right = right + 'px';
    element.style.left = 'initial';
    element.style.animationDelay = delay + 's';
    element.style.animationDuration = duration + 's';
  }

  return (
    <MainTag>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Header/>
      <AuroraInfo>
        Aurora
        <AuroraIntro>
          Aurora monitoring system,<br/>
          where modern technology<br/>
          meets sleek design.
        </AuroraIntro>
      </AuroraInfo>

      {[1, 2, 3, 4, 5, 6, 7, 8].map((index: number) => (
        <Star key={`star-${index}`} className="star" />
      ))}

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
  font-weight: 600;
`

const AuroraIntro = styled.div`
  font-size: 2.2rem;
`

const Star = styled.span`
  z-index: 0;
  position: absolute;
  left: 50%;
  width: 1px;
  height: 1px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(255,255,255,0.1),0 0 0 6px rgba(255,255,255,0.1),0 0 14px rgba(255,255,255,0.1);
  animation: ${animate} 3s linear infinite;
  visibility: hidden;
  opacity: 0;
  top: 0;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 200px;
    height: 1px;
    background: linear-gradient(90deg, #fff, transparent);
    visibility: visible;
  }
`;

export default Main