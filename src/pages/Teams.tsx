import {BoardSection, DashboardMain, fadeIn} from "../styles/GlobalStyle"
import styled from "styled-components"
import NavigationBar from "./Dashboards/NavigationBar"
import PageName from "./components/PageName"
import {ReactComponent as AuroraLogo} from '../assets/svg/Aurora.svg'
import {ReactComponent as AuroraLogoDark} from '../assets/svg/AuroraDark.svg'
import {useCookies} from "react-cookie"
import {FaUsers} from 'react-icons/fa'
import * as React from "react"
import {useNavigate} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import {FormEvent, PropsWithChildren, useEffect, useState} from "react";
import {fetchAgentList, tokenValidity} from "../utils/Cookie";
import Loaders from "./components/Loaders/Loaders";
import Unauthorized from "./components/Error/Unauthorized";
import axiosInstance from "../utils/AxiosInstance";
import {BsQuestionCircleFill} from 'react-icons/bs'
import toast from "react-hot-toast";
import SpinLoaders from "./components/Loaders/SpinLoaders";

interface PageStatus {
  firstRender: boolean;
}

const withTokenValidation = (WrappedComponent: React.ComponentType<PropsWithChildren<PageStatus>>) => {
  const TokenValidationComponent: React.FC<PageStatus> = (props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)

    useEffect(() => {
      const checkValidity = async () => {
        const isValid = await tokenValidity();
        setIsAuthorized(isValid)
      };

      checkValidity().then(() => setLoading(false));
    }, [])
    return loading ? <Loaders/> : isAuthorized ? <WrappedComponent {...props}/> : <Unauthorized/>;
  };

  return TokenValidationComponent;
};

const TeamsComponents = () => {
  const [cookies] = useCookies()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)
  const [teamData, setTeamData] = useState<any>([])

  useEffect(() => {
    fetchTeamData()
  }, [])

  const fetchTeamData = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/user/team');
      if (res.data.success) {
        setTeamData(res.data.data)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  };

  const createTeamHandler = (e: FormEvent) => {
    e.preventDefault()
    const teamName = (document.getElementById('team-name') as HTMLInputElement).value;
    const activePlanBox = document.querySelector('.plan-box-active');
    const planId = activePlanBox?.id;

    const payload = {
      'name': teamName,
      'plan': planId
    }

    toast.promise(
      axiosInstance.post('/team/create', payload), {
        loading: 'Creating..',
        success: 'Created !',
        error: 'Error occurred.'
      }, {
        duration: 2500,
        position: 'top-center',
        style: {
          background: cookies.theme === 'dark' ? '#484848' : '#e1e1e1',
          color: cookies.theme === 'dark' ? '#fff' : '#000',
          width: '14rem',
          fontSize: '1.2rem',
          height: '2.2rem'
        }
      }
    )
      .then(fetchTeamData)
  }

  const joinTeamHandler = (e: FormEvent, code: string) => {
    e.preventDefault()

    toast.promise(
      axiosInstance.put('/team/join', {registrationCode: code}), {
        loading: 'Joining..',
        success: 'Joined !',
        error: 'Error occurred.'
      }, {
        duration: 2500,
        position: 'top-center',
        style: {
          background: cookies.theme === 'dark' ? '#484848' : '#e1e1e1',
          color: cookies.theme === 'dark' ? '#fff' : '#000',
          width: '14rem',
          fontSize: '1.2rem',
          height: '2.2rem'
        }
      }
    )
      .then(fetchTeamData)
  }

  const joinTeamModal = () => {
    return (
      confirmAlert({
        customUI: ({onClose}) => {
          return (
            <div className='custom-alert-ui'>
              <div className={'logo-container'}>
                {cookies.theme === 'dark' ? <AuroraLogo/> :
                  <AuroraLogoDark/>}
              </div>

              <p>Join with Invitation code</p>

              <form className={'team-form'} onSubmit={e => e.preventDefault()}>
                <input type="text" placeholder="Invitation code" required={true} id={'invitation-code'}/>
              </form>

              <div className={'button-container'} style={{width: '10rem'}}>
                <button onClick={onClose} className={'close-btn'} style={{width: '4.5rem'}}>Cancel</button>
                <button
                  onClick={e => {
                    const inputElement = document.getElementById('invitation-code') as HTMLInputElement;
                    const inputValue = inputElement?.value;
                    joinTeamHandler(e, inputValue)
                    onClose()
                  }}
                  className={'create-btn'}
                  style={{width: '4.5rem'}}
                >
                  Join
                </button>
              </div>
            </div>
          )
        }
      })
    )
  }

  const createNewTeamModal = () => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const clickedElement = event.currentTarget
      const {id} = clickedElement

      const elements = document.getElementsByClassName('plan-box')
      Array.from(elements).forEach((element) => {
        if (element.id === id) {
          element.classList.add('plan-box-active')
        } else {
          element.classList.remove('plan-box-active')
        }
      })
    }

    return (
      confirmAlert({
        customUI: ({onClose}) => {
          return (
            <div className='custom-alert-ui'>
              <div className={'logo-container'}>
                {cookies.theme === 'dark' ? <AuroraLogo/> :
                  <AuroraLogoDark/>}
              </div>

              <p>Create new team</p>

              <form className={'team-form'} onSubmit={e => e.preventDefault()}>
                <input type="text" placeholder="Team name" maxLength={15} required={true} id={'team-name'}/>
              </form>

              <p>Choose plan</p>

              <div className={'plan-select-container'}>

                <div className={'plan-box'} id={'free'} onClick={handleClick}>
                  <div className={'plan-name'}>
                    Free
                    <div className={'tooltip-container'}>
                      <button className="tooltip-trigger"><BsQuestionCircleFill/></button>
                      <div className="tooltip">
                        <ul>
                          <li>Up to 3 Agents with 5 Processes</li>
                          <li>See your data as real-time</li>
                          <li>Notify when its down</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className={'plan-price'}>0 $</div>
                </div>

                <div className={'plan-box'} id={'pro'} onClick={handleClick}>
                  <div className={'plan-name'}>
                    Pro
                    <div className={'tooltip-container'}>
                      <button className="tooltip-trigger"><BsQuestionCircleFill/></button>
                      <div className="tooltip">
                        <ul>
                          <li>Up to 10 Agents with 30 Processes</li>
                          <li>See your data as real-time</li>
                          <li>Notify when its down</li>
                          <li>Webhook & Integration</li>
                          <li>Advanced Log Filtering</li>
                          <li>Save history for 30 days</li>
                          <li>24/7 Support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className={'plan-price'}>15.29 $
                    <div>(per month)</div>
                  </div>
                </div>

                <div className={'plan-box'} id={'enterprise'} onClick={handleClick}>
                  <div className={'plan-name'}>
                    Enterprise
                    <div className={'tooltip-container'}>
                      <button className="tooltip-trigger"><BsQuestionCircleFill/></button>
                      <div className="tooltip">
                        <ul>
                          <li>Up to 100 Agents with Over 500 Processes</li>
                          <li>See your data as real-time</li>
                          <li>Notify when its down</li>
                          <li>Webhook & Integration</li>
                          <li>Advanced Log Filtering</li>
                          <li>Save history for 180 days</li>
                          <li>24/7 Support</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={'plan-price'}>Get in touch</div>
                </div>
              </div>

              <div className={'button-container'}>
                <button onClick={onClose} className={'close-btn'}>Cancel</button>
                <button
                  onClick={e => {
                    createTeamHandler(e)
                    onClose()
                  }}
                  className={'create-btn'}
                >
                  Create
                </button>
              </div>
            </div>
          )
        }
      })
    )
  }

  const checkAgentConfig = async (teamId: string) => {
    const agentList = await fetchAgentList(teamId)
    if (agentList.length === 1 && agentList[0].status === 'off') {
      navigate(`/team/${teamId}/agent-register`)
    } else {
      navigate(`/team/${teamId}/dashboard`)
    }
  }

  return (
    <TeamsContainer>
      {cookies.theme === 'dark' ? <AuroraLogo className={'aurora-logo'}/> :
        <AuroraLogoDark className={'aurora-logo'}/>}
      <div className={'title'}>
        <div>Teams</div>
        <button className={'join-button'} onClick={joinTeamModal}>
          Join Invitation code
        </button>
        <button onClick={createNewTeamModal}>
          Create new team
        </button>
      </div>

      <div className={teamData.length === 0 || loading ? 'teams-list-none' : 'teams-list'}>

        {
          loading ? <SpinLoaders/> :
            teamData.length === 0 ?
              (<div>Team does not exist.</div>) :
              (
                Object.values(teamData).map((value: any, index: number) => (
                  <div className={'team'} onClick={() => checkAgentConfig(value._id)} key={index}>
                    <div>
                      <div className={'server-name'}>
                        {value.name}
                        <span>{value.plan}</span>
                      </div>
                      <div className={'server-info'}>
                        <FaUsers/> <span>{value.members.length} Team members</span>
                      </div>
                    </div>
                  </div>
                ))
              )
        }
      </div>
    </TeamsContainer>
  )
}

const TeamsContainer = styled.div`
  color: ${({theme}) => theme.fontColor};
  height: 40rem;
  width: 35rem;
  margin: auto;
  background-color: ${({theme}) => theme.primaryColor};
  border-radius: 5px;
  box-shadow: ${({theme}) => theme.boxShadow};
  animation: ${fadeIn} 0.3s ease-out backwards;
  transition: background-color 0.3s ease-out;
  text-align: center;

  & .aurora-logo {
    width: 12rem;
    margin-top: 3rem;
  }

  & .title {
    width: 85%;
    height: 2.6rem;
    border-bottom: ${({theme}) => `1px solid ${theme.NavigationFocusButtonColor}`};
    margin: 3rem auto 0;
    align-items: center;
    font-size: 1.4rem;

    & div {
      float: left;
    }

    & button {
      float: right;
      background: #07a4ff;
      color: #fff;
      cursor: pointer;
      height: 2rem;
      width: 8.5rem;
      border: none;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 300;
      transition: all .25s;

      &:hover {
        background: #0a8ad5;
      }
    }

    & .join-button {
      width: 8.7rem;
      margin-left: 1rem;
      background: #047cc2;

      &:hover {
        background: #046ca8;
      }
    }
  }

  & .teams-list-none {
    width: 85%;
    margin: 2rem auto 0;
    height: 23.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    & div {
      font-size: 1.4rem;
    }
  }

  & .teams-list {
    width: 85%;
    margin: 2rem auto 0;
    height: 23.5rem;
    overflow: auto;

    & .team {
      width: 100%;
      height: 5rem;
      background: ${({theme}) => theme.BottomNavigationContainerColor};
      border-radius: 5px;
      margin-top: 1rem;
      font-weight: 300;
      transition: all .25s;
      display: flex;
      align-items: center;
      cursor: pointer;
      box-shadow: ${({theme}) => theme.boxShadow};

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 1rem;
      }

      &:hover {
        background: ${({theme}) => theme.BottomNavigationFocusButtonColor};
      }

      & .server-name {
        text-align: left;
        font-size: 1.2rem;
        padding-left: 1rem;

        & span {
          padding-left: 0.4rem;
          font-size: 0.8rem;
        }
      }

      & .server-info {
        padding-top: 0.4rem;
        padding-left: 1rem;
        float: left;

        & svg {
          margin-bottom: -0.15rem;
        }

        & span {
          padding-left: 0.3rem;
        }
      }
    }
  }
`

const Teams: React.FC<PropsWithChildren<PageStatus>> = ({firstRender}) => {
  if (firstRender) {
    return (
      <DashboardMain>
        <TeamsComponents/>
      </DashboardMain>
    )
  } else {
    return (
      <DashboardMain>
        <NavigationBar active={6}/>
        <BoardSection>
          <PageName name={'Teams'}/>
          <TeamsComponents/>
        </BoardSection>
      </DashboardMain>
    )
  }
}

const EnhancedMain = withTokenValidation(Teams);

export default EnhancedMain;