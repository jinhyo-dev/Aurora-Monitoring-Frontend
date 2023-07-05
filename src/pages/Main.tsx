import styled, { keyframes } from "styled-components";
import AuroraBackground from '../assets/images/Aurora-Main-Background.jpg'
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Title from "./components/Title";
import { useNavigate } from "react-router-dom";
import { tokenValidity } from "../utils/Cookie";
import Loaders from "./components/Loaders";

const withTokenValidation = (WrappedComponent: React.ComponentType) => {
    const TokenValidationComponent = () => {
      const navigate = useNavigate();
      const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
      const [loading, setLoading] = useState<boolean>(true)

      useEffect(() => {
          const image = new Image();
          image.src = "../assets/images/Aurora-Main-Background.jpg";
          image.onload = () => {
            setIsImageLoaded(true);
          };

          const checkValidity = async () => {
            const isValid = await tokenValidity();
            isValid && navigate('/teams');
          };

          checkValidity().then(() => setLoading(false))
        }, []
      )
      ;

      return loading || isImageLoaded ? <Loaders/> : <WrappedComponent/>;
    };

    return TokenValidationComponent;
  }
;

const Main = () => {
  useEffect(() => {
    const stars: NodeListOf<HTMLElement> = document.querySelectorAll('.star');
    stars.forEach(setRandomStyles);
  }, []);

  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const setRandomStyles = (element: HTMLElement): void => {
    const minRight = 0;
    const maxRight = 800;
    const minDelay = 3;
    const maxDelay = 7;
    const minDuration = 2;
    const maxDuration = 5;

    const applyRandomStyles = () => {
      const right: number = getRandomInt(minRight, maxRight);
      const delay: number = getRandomInt(minDelay, maxDelay);
      const duration: number = getRandomInt(minDuration, maxDuration);

      element.style.right = right + 'px';
      element.style.left = 'initial';
      element.style.animationDelay = delay + 's';
      element.style.animationDuration = duration + 's';
    };

    applyRandomStyles();
    element.addEventListener('animationend', applyRandomStyles);
  };

  return (
    <MainTag>
      <Title title={'Aurora Monitoring'}/>
      <Header/>
      <InfoContainer>
        <AuroraInfo>
          Aurora
          <AuroraIntro>
            Aurora monitoring system,<br/>
            where modern technology<br/>
            meets sleek design.
          </AuroraIntro>
        </AuroraInfo>

        {[1, 2, 3, 4, 5, 6].map((index: number) => (
          <Star key={`star-${index}`} className="star"/>
        ))}
      </InfoContainer>
    </MainTag>
  );
};

// 고차 컴포넌트 적용
const EnhancedMain = withTokenValidation(Main);

export default EnhancedMain;

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
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background-size: cover;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  background-image: url(${AuroraBackground});
  top: 0;
  left: 0;
  position: absolute;
  overflow: hidden;
`

const InfoContainer = styled.div`
  width: 100%;
  height: calc(100vh - 10rem);
  display: flex;
  align-items: center;
`

const AuroraInfo = styled.div`
  width: 85%;
  font-size: 5rem;
  margin: auto;
  font-weight: 600;
`

const AuroraIntro = styled.div`
  font-size: 2.2rem;
`

const Star = styled.span`
  z-index: 0;
  position: absolute;
  left: 50%;
  width: 0.1rem;
  height: 0.1rem;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1), 0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 8px rgba(255, 255, 255, 0.1);
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