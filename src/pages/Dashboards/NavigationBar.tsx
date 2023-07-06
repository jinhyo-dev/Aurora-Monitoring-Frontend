import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { ReactComponent as AuroraLogo } from '../../assets/svg/Aurora.svg'
import { ReactComponent as AuroraLogoDark } from '../../assets/svg/AuroraDark.svg'
import { ReactComponent as AuroraSimpleLogo } from '../../assets/svg/AuroraSimpleLogo.svg'
import { ReactComponent as AuroraSimpleLogoDark } from '../../assets/svg/AuroraSimpleLogoDark.svg'
import { IoIosArrowBack, IoIosArrowForward, IoIosHelpCircle } from 'react-icons/io'
import { HiServer } from 'react-icons/hi'
import { BsGraphUp, BsStack } from 'react-icons/bs'
import * as React from "react";
import { AiFillDashboard } from "react-icons/ai";
import { RiBug2Fill } from "react-icons/ri";
import { FaUserCircle, FaUsers } from 'react-icons/fa'
import { MdAccessTimeFilled } from 'react-icons/md'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useCookies } from "react-cookie";
import { FiLogOut, FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { fetchUserInfo } from "../../utils/Cookie";
import { confirmAlert } from "react-confirm-alert";

interface NavigationProps {
  active: number;
}

interface ButtonStatusProps {
  $active: boolean;
}

const NavigationBar: React.FC<NavigationProps> = ({active}) => {
  const [showBackIcon, setShowBackIcon] = useState<boolean>(false);
  const [name, setName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [cookies, setCookie, removeCookie] = useCookies()
  const navigate = useNavigate()

  useEffect(() => {
    fetchUserInfo()
      .then(res => {
        if (res.data.email) {
          setName(res.data.name.firstName + ' ' + res.data.name.lastName)
        } else {
          SignOut()
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const toggleDarkMode = () => {
    const checked: string = cookies.theme
    setCookie('theme', checked === 'dark' ? 'light' : 'dark', {
      sameSite: 'none',
      secure: true,
      path: '/'
    })
  };

  const toggleSideBar = () => {
    const status: string = cookies.sidebarStatus
    setCookie('sidebarStatus', status === 'open' ? 'closed' : 'open', {
      sameSite: 'none',
      secure: true,
      path: '/'
    })
  }

  const SignOutModalHandler = () => {
    return (
      confirmAlert({
        customUI: ({onClose}) => {
          return (
            <div className='custom-alert-ui'>
              <div className={'logo-container'}>
                {cookies.theme === 'dark' ? <AuroraLogo/> :
                  <AuroraLogoDark/>}
              </div>

              <div className={'sign-out-text'}>Are you sure you want to sign out?</div>

              <div className={'button-container'} style={{ width: '10rem' }}>
                <button onClick={onClose} className={'close-btn'} style={{ width: '4.5rem' }}>Cancel</button>
                <button
                  onClick={SignOut}
                  className={'create-btn'}
                  style={{ width: '4.5rem' }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )
        }
      })
    )
  }

  const SignOut = () => {
    removeCookie('aurora_token', {path: '/'})
    window.location.replace('/')
  }

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (cookies.sidebarStatus === 'open') {
      timeout = setTimeout(() => {
        setShowBackIcon(true);
      }, 300);
    } else {
      timeout = setTimeout(() => {
        setShowBackIcon(false);
      }, 300);
    }

    return () => clearTimeout(timeout);
  }, [cookies.sidebarStatus]);

  return (
    <Nav $status={cookies.sidebarStatus === 'open'}>
      <div className={'logo-container'}>
        {showBackIcon ? (cookies.theme === 'dark' ? <AuroraLogo className={'logo'}/> :
          <AuroraLogoDark className={'logo'}/>) : (cookies.theme === 'dark' ? <AuroraSimpleLogo className={'logo'}/> :
          <AuroraSimpleLogoDark className={'logo'}/>)}
      </div>

      <div className={'server-name'}>Jinhyo-Server</div>

      <NavigationButton $active={active === 0} className={'navigation-container'} onClick={() => navigate('/team/AURORA633/dashboard')}>
        <HiServer/>
        {showBackIcon && <span>Process Overview</span>}
      </NavigationButton>

      <NavigationButton $active={active === 1} className={'navigation-container'}>
        <BsGraphUp/>
        {showBackIcon && <span>Realtime Metrics</span>}
      </NavigationButton>

      <NavigationButton $active={active === 2} className={'navigation-container'}>
        <BsStack/>
        {showBackIcon && <span>Apps Overview</span>}
      </NavigationButton>

      <NavigationButton $active={active === 3} className={'navigation-container'}>
        <AiFillDashboard/>
        {showBackIcon && <span>App Dashboard</span>}
      </NavigationButton>

      <NavigationButton $active={active === 4} className={'navigation-container'}>
        <RiBug2Fill/>
        {showBackIcon && <span>Historical Issue</span>}
      </NavigationButton>

      <NavigationButton $active={active === 5} className={'navigation-container'}>
        <MdAccessTimeFilled/>
        {showBackIcon && <span>Realtime Logs</span>}
      </NavigationButton>

      <div className={'bottom-navigation-container'}>
        <NavigationBottomButton className={'navigation-container'} onClick={toggleDarkMode} $active={false}>
          <DarkModeSwitch
            checked={cookies.theme === 'dark'}
            onChange={toggleDarkMode}
            size={'22px'}
          />
          {showBackIcon && <span>{cookies.theme === 'dark' ? 'Dark' : 'Light'}</span>}
        </NavigationBottomButton>

        <NavigationBottomButton $active={active === 6} className={'navigation-container'}>
          <IoIosHelpCircle/>
          {showBackIcon && <span>Help</span>}
        </NavigationBottomButton>

        <NavigationBottomButton $active={active === 7} className={'navigation-container'}
                                onClick={() => navigate('/team/AURORA633/teams')}>
          <FaUsers/>
          {showBackIcon && <span>Teams</span>}
        </NavigationBottomButton>

        <NavigationBottomButton $active={active === 8} className={'navigation-container'}
                                onClick={() => navigate('/team/AURORA633/user-preference')}>
          <FaUserCircle/>
          {showBackIcon && <span>{loading ? 'loading...' : name}</span>}
        </NavigationBottomButton>

        <NavigationBottomButton className={'navigation-container'} onClick={SignOutModalHandler} $active={false}>
          <FiLogOut/>
          {showBackIcon && <span>Sign Out</span>}
        </NavigationBottomButton>

        <div className={'bottom-box'}>
          {showBackIcon && <div><FiRefreshCw/> <span>Last Update: 1s</span></div>}
          <button onClick={toggleSideBar} className={'close-button'}>
            {cookies.sidebarStatus === 'open' ? <IoIosArrowBack className={'logo'}/> :
              <IoIosArrowForward className={'logo'}/>}
          </button>
        </div>
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

const Nav = styled.nav<{ $status: boolean }>`
  height: 98%;
  margin-left: 0.5%;
  width: ${({$status}) => ($status ? "18%" : "3.5rem")};
  background-color: ${({theme}) => theme.primaryColor};
  border-radius: 5px;
  transition: all .3s;
  display: flex;
  flex-direction: column;
  min-height: 800px;
  min-width: ${({$status}) => ($status ? "240px" : "2rem")};

  & .logo {
    animation: ${fadeIn} 0.35s ease-in-out;
  }

  & button {
    transition: all .3s;
    border-radius: 5px;
    border: none;
  }

  & .logo-container {
    margin: 5% auto 0;
    width: 100%;
    text-align: center;

    & svg {
      width: ${({$status}) => ($status ? "60%" : "2rem")};
      margin-top: ${({$status}) => ($status ? "0" : "0.3rem")};
    }
  }

  & .server-name {
    transition: all .3s;
    background: none;
    margin: 5% auto 2%;
    max-width: 95%;
    font-size: ${({$status}) => ($status ? "1.2rem" : "0.4rem")};
    color: ${({theme}) => theme.fontColor};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  & .navigation-container {
    transition: all .3s;
    width: 90%;
    height: 6vh;
    max-height: 4rem;
    min-height: 2rem;
    border-radius: ${({$status}) => ($status ? "5px" : "8px")};
    color: ${({theme}) => theme.fontColor};
    margin: ${({$status}) => ($status ? "5% auto 0" : "1rem auto 0")};
    cursor: pointer;

    &:hover {
      background-color: ${({theme}) => theme.NavigationFocusButtonColor};
    }

    & span {
      font-size: 0.9rem;
      float: left;
      margin-left: 1rem;
      display: ${({$status}) => ($status ? "" : "none")};
      animation: ${fadeIn} 0.35s ease-in-out;
    }

    & svg {
      ${({$status}) => ($status ? `
        font-size: 1.3rem;
        float: left;
        margin-left: 1rem;
        margin-top: 0.05rem;
      ` : `
        font-size: 1.3rem;
        text-align: center;
        margin-top: 0.4rem;
      `)};
    }
  }

  & .bottom-navigation-container {
    transition: all .3s;
    width: 95%;
    height: 45vh;
    min-height: 20rem;
    margin: 5% auto;
    background-color: ${({theme}) => theme.BottomNavigationContainerColor};
    display: flex;
    flex-direction: column;
    border-radius: ${({$status}) => ($status ? "5px" : "8px")};


    & .navigation-container {
      height: 5.5vh;

      &:hover {
        background-color: ${({theme}) => theme.BottomNavigationFocusButtonColor};
      }
    }

    & span {
      animation: ${fadeIn} 0.35s ease-in-out;
    }

    & .bottom-box {
      margin: auto auto 0.5rem 0;
      width: 100%;
      text-align: center;
      height: 2.5rem;

      div {
        display: ${({$status}) => ($status ? "flex" : "none")};
        align-items: center;
        height: 100%;
        float: left;
        margin-left: 0.8rem;
        font-size: 0.8rem;
        color: ${({theme}) => theme.fontColor};

        & > span {
          margin-left: 0.5rem;
        }
      }
    }
  }

  & .close-button {
    transition: all .3s;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    color: ${({theme}) => theme.fontColor};
    background-color: ${({theme}) => theme.NavigationBarControlButtonColor};
    margin: ${({$status}) => ($status ? "auto 0.5rem 0.5rem auto" : "auto")};
    float: ${({$status}) => ($status ? "right" : "")};

    & svg {
      font-size: 1.3rem;
      margin-top: 0.3rem;
    }

    &:hover {
      background-color: ${({theme}) => theme.NavigationFocusButtonColor};
    }

    & svg {
      font-size: 1.3rem;
      margin-top: 0.3rem;
    }
  }
`;

const NavigationButton = styled.button<ButtonStatusProps>`
  background-color: ${({$active, theme}) => ($active ? theme.NavigationFocusButtonColor : "transparent")};
`;

const NavigationBottomButton = styled.button<ButtonStatusProps>`
  background-color: ${({$active, theme}) => ($active ? theme.BottomNavigationFocusButtonColor : "transparent")};
`;

export default NavigationBar;