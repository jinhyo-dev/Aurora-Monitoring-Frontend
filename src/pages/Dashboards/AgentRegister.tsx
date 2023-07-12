import {DashboardMain} from "../../styles/GlobalStyle.ts";
import {useEffect, useState} from "react";
import {fetchAgentList} from "../../utils/Cookie.ts";
import {useNavigate, useParams} from "react-router-dom";
import Loaders from "../components/Loaders/Loaders.tsx";
import styled from "styled-components";
import {TbCopy} from 'react-icons/tb'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast from "react-hot-toast";
import {confirmAlert} from "react-confirm-alert";
import {ReactComponent as AuroraLogo} from '../../assets/svg/Aurora.svg'
import {ReactComponent as AuroraLogoDark} from '../../assets/svg/AuroraDark.svg'
import {useCookies} from "react-cookie";
import axiosInstance from "../../utils/AxiosInstance.ts";

const AgentRegister = () => {
  const {teamId} = useParams()
  const [agentKey, setAgentKey] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const [cookies] = useCookies()

  useEffect(() => {
    checkAgentConfig(teamId)
  }, [])

  const checkAgentConfig = (teamId: string | undefined) => {
    setLoading(true)
    fetchAgentList(teamId)
      .then(res => {
        res[0].status === "ok" && navigate(`/team/${teamId}/dashboard`)
        setAgentKey(res[0].key)
      })
      .finally(() => setLoading(false))
  }

  const CopiedAlert = () => {
    toast('Copied !',
      {
        style: {
          borderRadius: '5px',
          background: '#15bb50',
          color: '#fff',
        },
        duration: 1000
      }
    )
  }

  const deleteTeam = () => {
    toast.promise(
      axiosInstance.delete('/team/delete', {data: {'teamId': teamId}}), {
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
      .then(() => navigate('/teams'))
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

              <div className={'button-container'} style={{width: '10rem'}}>
                <button onClick={onClose} className={'close-btn'} style={{width: '4.5rem'}}>No</button>
                <button
                  onClick={() => {
                    deleteTeam()
                    onClose()
                  }}
                  className={'create-btn'}
                  style={{width: '4.5rem'}}
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
    <>
      {
        loading ? <Loaders/> :
          (
            <DashboardMain>
              <LinkInstructions>
                <div className={'title'}>Connect your agent</div>
                <div className={'intro'}>
                  Welcome to Aurora, an modern technology meets sleek design.<br/>
                  You can now connect up to your servers.
                </div>

                <div className={'code-container'}>
                  <div className={'code'}>
                    <div>1. Install agent by running this script on your ubuntu 22.04 host</div>
                    <div>
                      <span className={'dollar'}>$</span>
                      <span className={'command'}>curl https://raw.githubusercontent.com/proj-aurora/Releases/main/install.sh | sudo bash</span>
                      <CopyToClipboard
                        text={'curl https://raw.githubusercontent.com/proj-aurora/Releases/main/install.sh | sudo bash'}>
                        <TbCopy onClick={CopiedAlert}/>
                      </CopyToClipboard>
                    </div>
                  </div>

                  <div className={'code'}>
                    <div>2. Once installation is done, configure your key by running this command</div>
                    <div>
                      <span className={'dollar'}>$</span>
                      <span className={'command'}>sudo aurora-agent -c</span>
                      <CopyToClipboard text={'sudo aurora-agent -c'}>
                        <TbCopy onClick={CopiedAlert}/>
                      </CopyToClipboard>
                    </div>
                  </div>

                  <div className={'code'}>
                    <div>3. Enter your key to agent</div>
                    <div>
                      <span className={'dollar'}/>
                      <span className={'command'}>{agentKey}</span>
                      <CopyToClipboard text={agentKey}>
                        <TbCopy onClick={CopiedAlert}/>
                      </CopyToClipboard>
                    </div>
                  </div>

                  <div className={'code'}>
                    <div>4. CTRL+C to exit agent. Then start agent as service by running this command</div>
                    <div>
                      <span className={'dollar'}>$</span>
                      <span className={'command'}>sudo systemctl enable --now aurora-agent</span>
                      <CopyToClipboard text={'sudo systemctl enable --now aurora-agent'}>
                        <TbCopy onClick={CopiedAlert}/>
                      </CopyToClipboard>
                    </div>
                  </div>

                  <div className={'code'}>
                    <div>5. Then click this button to refresh.</div>
                    <div>
                      <span className={'dollar'}/>
                      <button onClick={() => checkAgentConfig(teamId)}>Refresh</button>
                    </div>
                  </div>
                </div>

                <div className={'navigate-tag'}>Are you not ready yet?
                  <span onClick={() => navigate('/teams')}>Team list</span>
                </div>

                <div className={'or'}>or</div>

                <div className={'delete-tag'}>Are you want to delete the team?
                  <span onClick={deleteTeamModal}>Delete team</span>
                </div>
              </LinkInstructions>
            </DashboardMain>
          )
      }
    </>
  )
}

const LinkInstructions = styled.div`
  width: 65rem;
  height: 52rem;
  margin: auto;
  border-radius: 5px;
  background-color: ${({theme}) => theme.primaryColor};
  color: ${({theme}) => theme.fontColor};

  & .title {
    margin-top: 2rem;
    text-align: center;
    font-size: 1.7rem;
    font-weight: 500;
  }

  & .intro {
    margin-top: 1rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 400;
  }

  & .code-container {
    width: 90%;
    height: 32rem;
    margin: 1rem auto 0;
    background-color: ${({theme}) => theme.backgroundColor};
    border-radius: 5px;
    display: block;

    & .code {
      height: 5rem;
      width: 90%;
      padding-top: 1rem;
      margin: auto;

      & > div {
        &:first-child {
          height: 2rem;
          width: 100%;
          display: flex;
          align-items: center;
        }

        &:last-child {
          height: 3rem;
          width: 100%;
          display: flex;
          align-items: center;
          border-radius: 4px;
          background-color: ${({theme}) => theme.primaryColor};

          & > span {
            font-family: 'Ubuntu Mono', monospace;
          }

          & .dollar {
            padding-left: 1rem;
            color: ${({theme}) => theme.fontSecondColor};
          }

          & .command {
            padding-left: 1rem;
            margin-right: 1rem;
          }

          & button {
            width: 5rem;
            height: 1.8rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            background-color: ${({theme}) => theme.backgroundColor};
            transition: all .25s;
            color: ${({theme}) => theme.fontColor};

            &:hover {
              background-color: ${({theme}) => theme.NavigationFocusButtonColor};
            }
          }


          & > svg {
            margin-left: auto;
            margin-right: 1rem;
            font-size: 1.2rem;
            float: right;
            transition: all .25s;
            cursor: pointer;

            &:hover {
              transform: translateY(-2px);
            }
          }
        }
      }
    }
  }

  & .navigate-tag {
    font-size: 1rem;
    text-align: center;
    margin-top: 2.5rem;

    & > span {
      color: #0095f6;
      cursor: pointer;
      padding-left: 0.4rem;
    }
  }

  & .or {
    font-size: 1rem;
    text-align: center;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
  }

  & .delete-tag {
    font-size: 1rem;
    text-align: center;

    & > span {
      color: #f60000;
      cursor: pointer;
      padding-left: 0.4rem;
    }
  }
`

export default AgentRegister