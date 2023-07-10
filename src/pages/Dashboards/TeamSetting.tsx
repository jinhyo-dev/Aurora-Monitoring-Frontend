import React, { useEffect, useState } from "react";
import { fetchTeamInfo } from "../../utils/Cookie";
import Loaders from "../components/Loaders/Loaders";
import Unauthorized from "../components/Error/Unauthorized";
import NavigationBar from "./NavigationBar";
import { BoardSection, DashboardMain, fadeIn } from "../../styles/GlobalStyle";
import PageName from "../components/PageName";
import styled from "styled-components";
import { ReactComponent as AuroraLogo } from '../../assets/svg/Aurora.svg'
import { ReactComponent as AuroraLogoDark } from '../../assets/svg/AuroraDark.svg'
import { useCookies } from "react-cookie"
import toast from "react-hot-toast";
import axiosInstance from "../../utils/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import SpinLoaders from "../components/Loaders/SpinLoaders";
import { BsQuestionCircleFill } from "react-icons/bs";
import { confirmAlert } from "react-confirm-alert";

const withTokenValidation = (WrappedComponent: React.ComponentType) => {
  const TokenValidationComponent = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const {teamId} = useParams()

    useEffect(() => {
      const checkValidity = async () => {
        const isValid = await fetchTeamInfo(teamId)
        setIsAuthorized(isValid?.success)
      };

      checkValidity().then(() => setLoading(false));
    }, []);
    return loading ? <Loaders/> : isAuthorized ? <WrappedComponent/> : <Unauthorized/>;
  }

  return TokenValidationComponent
}

const TeamSetting = () => {
  const [cookies] = useCookies()
  const {teamId} = useParams()
  const navigate = useNavigate()
  const [teamInfo, setTeamInfo] = useState<any>()
  const [teamName, setTeamName] = useState<string>('')
  const [plan, setPlan] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getTeamInfo().then(() => setLoading(false))
  }, [])

  const getTeamInfo = async () => {
    setLoading(true)
    const team = await fetchTeamInfo(teamId)
    setTeamName(team?.data.team.name)
    setPlan(team?.data.team.plan)
    setTeamInfo(team?.data.team)
  }

  const deleteTeam = () => {
    toast.promise(
      axiosInstance.delete('/team/delete', {data: {'_id': teamId}}), {
        loading: 'Deleting..',
        success: 'Deleted !',
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
      .then(() => navigate(`/team/${teamId}/teams`))
  }

  const handlePlanState = (planValue: string) => {
    setPlan(planValue)
  }

  const deleteTeamModal = () => {
    return (
      confirmAlert({
        customUI: ({onClose}) => {
          return (
            <div className='custom-alert-ui'>
              <div className={'logo-container'}>
                {cookies.theme === 'dark' ? <AuroraLogo/> :
                  <AuroraLogoDark/>}
              </div>

              <div className={'delete-team-text'}>Are you sure you want to delete this team?</div>

              <div className={'button-container'} style={{ width: '10rem' }}>
                <button onClick={onClose} className={'close-btn'} style={{ width: '4.5rem' }}>No</button>
                <button
                  onClick={deleteTeam}
                  className={'create-btn'}
                  style={{ width: '4.5rem' }}
                >
                  Yes
                </button>
              </div>
            </div>
          )
        }
      })
    )
  }

  return (
    <DashboardMain>
      <NavigationBar active={6}/>
      <BoardSection>
        <PageName name={'Team Setting'}/>
        <TeamSettingContainer>
          {cookies.theme === 'dark' ? <AuroraLogo className={'aurora-logo'}/> :
            <AuroraLogoDark className={'aurora-logo'}/>}
          <div className={'title'}>
            <div>Team Information</div>
            <button onClick={deleteTeamModal}>
              Delete this team
            </button>
          </div>

          <div className={loading ? 'loading-bottom-container' : 'bottom-container'}>
            {
              loading ? <SpinLoaders/> :
                (
                  <>
                    <div className={'created-date'}>Created at {teamInfo.createdAt}</div>
                    <div className={'owner'}>Owner - {teamInfo.owner}</div>
                    <div className={'name-container'}>
                      <div>Team name</div>
                      <input value={teamName} onChange={e => setTeamName(e.target.value)} type={'text'}/>
                    </div>

                    <div className={'plan-container'}>
                      <div className={'plan'}>Plan</div>

                      <div className={'plan-select-container'} style={{ width: '100%', height: '7.5rem', marginTop: '0.8rem' }}>

                        <div className={`plan-box ${plan === 'free' ? 'plan-box-active' : ''}`} id={'free'} onClick={() => handlePlanState('free')}>
                          <div className={'plan-name'} style={{ marginTop: '2.4rem' }}>
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

                        <div className={`plan-box ${plan === 'pro' ? 'plan-box-active' : ''}`} id={'pro'} onClick={() => handlePlanState('pro')}>
                          <div className={'plan-name'} style={{ marginTop: '2.4rem' }}>
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

                        <div className={`plan-box ${plan === 'enterprise' ? 'plan-box-active' : ''}`} id={'enterprise'} onClick={() => handlePlanState('enterprise')}>
                          <div className={'plan-name'} style={{ marginTop: '2.4rem' }}>
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
                    </div>

                    <div className={'button-container'}>
                      <button className={'cancel-button'} onClick={() => navigate(`/team/${teamId}/teams`)}>Back</button>
                      <button className={'save-button'}>Save</button>
                    </div>
                  </>
                )
            }
          </div>
        </TeamSettingContainer>
      </BoardSection>
    </DashboardMain>
  )
}

const TeamSettingContainer = styled.div`
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
      background: #d94141;
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
        background: #b93939;
      }
    }
  }

  & .loading-bottom-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 26rem;
    width: 85%;
    margin: auto;
  }

  & .bottom-container {
    height: 26rem;
    width: 85%;
    margin: auto;
  }

  & .created-date {
    text-align: right;
    font-size: 0.85rem;
    padding-top: 0.8rem;
    color: ${({theme}) => theme.AlertOverlayColor};
  }
  
  & .owner {
    text-align: right;
    font-size: 0.85rem;
    color: ${({theme}) => theme.AlertOverlayColor};
    padding-top: 0.1rem;
  }
  
  & .plan-container {
    margin-top: 1.5rem;
    text-align: left;

    & .plan {
      font-size: 1.2rem;
      color: ${({theme}) => theme.fontSecondColor};
    }
  }
  
  & .name-container {
    text-align: left;
    margin-top: 0.8rem;
    height: 4.6rem;
    width: 100%;
    
    & div {
      font-size: 1.2rem;
      color: ${({theme}) => theme.fontSecondColor};
    }
    
    & input {
      width: 100%;
      box-sizing: border-box;
      margin-top: 0.1rem;
      padding-left: 1rem;
      padding-right: 1rem;
      height: 2.6rem;
      font-size: 1.1rem;
      background: none;
      border: ${({theme}) => `1px solid ${theme.fontSecondColor}`};
      border-radius: 5px;
      color: ${({theme}) => theme.fontColor};
      transition: all .25s;
      
      &:focus {
        outline: none;
        border: ${({theme}) => `1px solid ${theme.fontColor}`};
      }
    }
  }

  & .button-container {
    margin: 2.8rem auto 0;
    width: 50%;
    height: 2.3rem;

    & button {
      height: 100%;
      font-size: 0.9rem;
      border: none;
      border-radius: 5px;
      width: 5rem;
      cursor: pointer;
      transition: all .2s;

      &:hover {
        transform: translateY(-3px);
      }
    }

    & .save-button {
      margin-left: 1rem;
      background: ${({theme}) => theme.fontColor};
      color: ${({theme}) => theme.backgroundColor};
    }

    & .cancel-button {
      background: ${({theme}) => theme.NavigationFocusButtonColor};
      color: ${({theme}) => theme.fontColor};
    }
  }
`

const EnhancedTeamSetting = withTokenValidation(TeamSetting);

export default EnhancedTeamSetting;