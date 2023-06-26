import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { CustomTheme } from "./theme/defaultTheme";
import AuroraBackground from "../assets/images/Aurora-Main-Background.jpg";

interface GlobalStyleProps {
  theme: CustomTheme;
}

interface RealTimeBoxWidthProps {
  width: string;
  leftGap: boolean;
  rightGap: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  * {
    font-family: 'Poppins', sans-serif;
    margin: 0;
  }

  body {
    background-color: ${({theme}) => theme.backgroundColor};
    animation: ${fadeIn} 0.3s ease-out backwards;
    transition: background-color 0.3s ease-out;
    overflow: auto;
  }

  a {
    text-decoration: none;
  }

  .image-gallery {
    width: 100%;
    height: auto;
  }

  .image-gallery-slide img {
    width: 100%;
    height: auto;
    max-height: 80vh;
    object-fit: cover;
    overflow: hidden;
    object-position: center center;
  }
`

export const MainTag = styled.main`
  padding: 0;
  box-sizing: border-box;
  background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${AuroraBackground});
  width: 100%;
  height: 100vh;
  background-size: cover;
  overflow: hidden;
  color: #fff;
  top: 0;
  left: 0;
`

export const DashboardMain = styled.main`
  min-height: 800px;
  max-height: 1700px;
  min-width: 900px;
  max-width: 1800px;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
`

export const AuthenticationContainer = styled.div`
  width: 72%;
  height: 36rem;
  background: rgba(0, 0, 0, .6);
  margin: calc(8% - 3.3rem) auto 0;
  border-radius: 10px;

  & .left-box, .right-box {
    height: 100%;
    width: 50%;
    float: left;
  }

  & .left-box {
    text-align: center;
  }
  
  & .right-box {
    border-radius: 0 5px 5px 0;
  }

  & .title {
    margin-top: 4rem;
    font-size: 1.8rem;
    font-weight: 500;
  }
`

export const AuthenticationForm = styled.form`
  width: 70%;
  margin: 3rem auto 0;
  position: relative;
  
  & button {
    cursor: pointer;
    width: 100%;
    position: absolute;
    height: 3.1rem;
    font-size: 1.3rem;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border: none;
    border-radius: 5px;
    transition: all .2s;
  }
  
  & button:hover {
    opacity: .9;
  }

  & .password-container {
    margin-top: 3rem;
  }

  & .input-container {
    position: relative;
    padding: 15px 0 0;
    width: 100%;

    & input {
      font-family: inherit;
      width: 100%;
      border: 0;
      border-bottom: 1px solid #fff;
      outline: 0;
      font-size: 1rem;
      color: #fff;
      padding: 5px 2px;
      background: transparent;
      transition: all 0.3s;

      &::placeholder {
        color: transparent;
      }

      &:placeholder-shown ~ .input-label {
        font-size: 1.2rem;
        cursor: text;
        top: 20px;
      }
    }

    & .input-field:focus {
      ~ .input-label {
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 0.75rem;
        color: #fff;
      }
      padding-bottom: 6px;
      border-width: 3px;
    }

    .input-field {
      &:required, &:invalid {
        box-shadow: none;
      }
    }

    & .input-label {
      position: absolute;
      top: 0;
      display: block;
      font-size: 0.8rem;
      transition: 0.2s;
      color: #ccc;
    }
  }
  
  & .name-container {
    width: 45%;
    float: left;
    margin-bottom: 0;
  }
  
  & .phone-container {
    margin-top: 3rem;
  }

  & .email-container {
    margin-top: 1rem;
  }
  
  & .password-container-2 {
    margin-top: 2rem;
  }
  
  & .info-text {
    font-size: 0.65rem;
    color: #ccc;
    padding-top: 0.2rem;
    padding-left: 0.1rem;
  }
  
  & .status-message {
    text-align: left;
    padding-top: 0.4rem;
    font-size: 0.75rem;
  }
`

export const AccountLink = styled.div`
  margin-top: 3.5rem;
  font-size: 1rem;
  
  & span {
    cursor: pointer;
    color: #2CA3E5;
  }
`

export const ArrowButton = styled.button`
  width: 30px;
  background: none;
  border: 0px;
  color: #fff;
  font-size: 1.3rem;
  opacity: .5;
  transition: opacity 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`

export const BoardSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 98%;
  height: 98%;
  min-height: 785px
`

export const RealTimeBox = styled.div<RealTimeBoxWidthProps>`
  margin-left: ${({ leftGap }) => leftGap ? '1%' : '0'};
  margin-right: ${({ rightGap }) => rightGap ? '1%' : '0'};
  height: 100%;
  background-color: ${({theme}) => theme.primaryColor};
  box-shadow: rgba(50, 50, 105, 0.1) 0px 1px 1px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  animation: ${fadeIn} 0.3s ease-out backwards;
  transition: background-color 0.3s ease-out;
  color: ${({theme}) => theme.fontColor};
  border-radius: 5px;
  width: ${({ width }) => width};
  
  & .box-name {
    font-size: 1.1rem;
    padding-left: 1rem;
    padding-top: 0.5rem;
  }
  
  & .chart-container {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    
    & .chart {
      width: 100%;
    }  
  }
`

export const BoardRowSection = styled.div`
  height: 33.333%;
  margin-top: 1%;
  width: 100%;
  display: flex;
`