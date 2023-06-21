import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { ReactComponent as AuroraLogo } from '../../assets/svg/Aurora.svg'
import { ReactComponent as AuroraSimpleLogo } from '../../assets/svg/AuroraSimpleLogo.svg'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { HiServer } from 'react-icons/hi'
import { BsGraphUp, BsStack } from 'react-icons/bs'
import * as React from "react";
import { IoNotifications } from "react-icons/io5";
import { AiFillDashboard } from "react-icons/ai";
import { RiBug2Fill } from "react-icons/ri";
import { MdAccessTimeFilled } from 'react-icons/md'
import { DarkModeSwitch } from 'react-toggle-dark-mode';

interface NavigationProps {
  active: number;
}

interface ButtonStatusProps {
  active: boolean;
}

const NavigationBar: React.FC<NavigationProps> = ({active}) => {
  const [status, setStatus] = useState<boolean>(false)
  const [showBackIcon, setShowBackIcon] = useState<boolean>(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (status) {
      timeout = setTimeout(() => {
        setShowBackIcon(true);
      }, 300);
    } else {
      timeout = setTimeout(() => {
        setShowBackIcon(false);
      }, 300);
    }

    return () => clearTimeout(timeout);
  }, [status]);

  return (
    <Nav status={status}>
      <div className={'logo-container'}>
        {showBackIcon ? <AuroraLogo className={'logo'}/> : <AuroraSimpleLogo className={'logo'}/>}
      </div>

      <div className={'server-name'}>Jinhyo-Server</div>

      <NavigationButton active={active === 0} className={'navigation-container'}>
        <HiServer/>
        {showBackIcon && <span>Process Overview</span>}
      </NavigationButton>

      <NavigationButton active={active === 1} className={'navigation-container'}>
        <BsGraphUp/>
        {showBackIcon && <span>Realtime Metrics</span>}
      </NavigationButton>

      <NavigationButton active={active === 2} className={'navigation-container'}>
        <BsStack/>
        {showBackIcon && <span>Apps Overview</span>}
      </NavigationButton>

      <NavigationButton active={active === 3} className={'navigation-container'}>
        <IoNotifications/>
        {showBackIcon && <span>Notification</span>}
      </NavigationButton>

      <NavigationButton active={active === 4} className={'navigation-container'}>
        <AiFillDashboard/>
        {showBackIcon && <span>App Dashboard</span>}
      </NavigationButton>

      <NavigationButton active={active === 5} className={'navigation-container'}>
        <RiBug2Fill/>
        {showBackIcon && <span>Historical Issue</span>}
      </NavigationButton>

      <NavigationButton active={active === 6} className={'navigation-container'}>
        <MdAccessTimeFilled/>
        {showBackIcon && <span>Realtime Logs</span>}
      </NavigationButton>

      <div className={'bottom-navigation-container'}>
        <button className={'navigation-container'}>
          <DarkModeSwitch/>
          {showBackIcon && <span>Light</span>}
        </button>

        <button className={'navigation-container'}>
          <MdAccessTimeFilled/>
          {showBackIcon && <span>Help</span>}
        </button>

        <button className={'navigation-container'}>
          <MdAccessTimeFilled/>
          {showBackIcon && <span>Jinhyo Kim</span>}
        </button>
        <button onClick={() => setStatus(!status)} className={'close-button'}>
          {status ? <IoIosArrowBack className={'logo'}/> : <IoIosArrowForward className={'logo'}/>}
        </button>
      </div>
    </Nav>
  )
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Nav = styled.nav<{ status: boolean }>`
  height: 98%;
  margin-left: 0.5%;
  width: ${({status}) => (status ? "20%" : "3.5rem")};
  background-color: #2E2E2E;
  border-radius: 5px;
  transition: all .3s;
  display: flex;
  flex-direction: column;
  min-height: 800px;

  & * {
    transition: all .3s;
  }

  & .logo {
    animation: ${fadeIn} 0.35s ease-in-out;
  }

  & button {
    border-radius: 5px;
    border: none;
  }

  & .logo-container {
    margin: 5% auto 0;
    width: 100%;
    text-align: center;

    & svg {
      width: ${({status}) => (status ? "55%" : "2rem")};
      margin-top: ${({status}) => (status ? "0" : "0.3rem")};
    }
  }

  & .server-name {
    background: none;
    margin: 5% auto 2%;
    max-width: 95%;
    font-size: ${({status}) => (status ? "1.25rem" : "0.4rem")};
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  & .navigation-container {
    width: 90%;
    height: 3rem;
    border-radius: ${({status}) => (status ? "5px" : "8px")};
    color: #fff;
    margin: ${({status}) => (status ? "5% auto 0" : "1rem auto 0")};
    cursor: pointer;

    &:hover {
      background-color: #484848;
    }

    & span {
      font-size: 1.1rem;
      float: left;
      margin-left: 1rem;
      display: ${({status}) => (status ? "" : "none")};
      animation: ${fadeIn} 0.35s ease-in-out;
    }

    & svg {
      ${({status}) => (status ? `
        font-size: 1.5rem;
        float: left;
        margin-left: 1rem;
        margin-top: 0.1rem;
      ` : `
        font-size: 1.5rem;
        text-align: center;
        margin-top: 0.25rem;
      `)};
    }
  }
  
  & .bottom-navigation-container {
    width: 95%;
    height: 18rem;
    margin: 5% auto;
    background-color: #292929;
    display: flex;
    flex-direction: column;
    border-radius: ${({status}) => (status ? "5px" : "8px")};
    
    & .navigation-container {
      background-color: #292929;
    }
  }

  & .close-button {
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    color: #fff;
    background-color: #2E2E2E;
    margin: ${({status}) => (status ? "auto 0.5rem 0.5rem auto" : "auto auto 0.5rem auto")};
    float: right;

    & svg {
      font-size: 1.3rem;
      margin-top: 0.3rem;
    }

    &:hover {
      background-color: #484848;
    }
  }
`
const NavigationButton = styled.button<ButtonStatusProps>`
  background-color: ${({active}) => (active ? "#484848" : "#2E2E2E")};
`;

export default NavigationBar