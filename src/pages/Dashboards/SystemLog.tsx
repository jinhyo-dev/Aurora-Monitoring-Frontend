import {
  BoardRowSection,
  BoardSection,
  DashboardMain,
  RealTimeBox,
  SidebarMovingHandler
} from "../../styles/GlobalStyle";
import NavigationBar from "./NavigationBar";
import PageName from "../components/PageName";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import {useCookies} from "react-cookie";
import {useCallback, useEffect, useState} from "react";
import {fetchAgentList, fetchTeamInfo} from "../../utils/Cookie";
import Loaders from "../components/Loaders/Loaders";
import Unauthorized from "../components/Error/Unauthorized";
import {useParams} from "react-router-dom";
import * as React from "react";
import {ReactComponent as AuroraLogo} from '../../assets/svg/Aurora.svg'
import {ReactComponent as AuroraLogoDark} from '../../assets/svg/AuroraDark.svg'
import useWebSocket, {ReadyState} from 'react-use-websocket';
import axiosInstance from "../../utils/AxiosInstance";
import {
  DataItem,
} from "./ChartConfiguraion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
import TitleTag from '../components/TitleTag'
import styled from "styled-components";

const withTokenValidation = (WrappedComponent: React.ComponentType) => {
  const TokenValidationComponent = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const {teamId} = useParams()

    useEffect(() => {
      const checkValidity = async () => {
        const isValid = await fetchTeamInfo(teamId)
        setIsAuthorized(isValid?.success)
      };

      checkValidity().then(() => setLoading(false))
    }, []);

    return loading ? <Loaders/> : isAuthorized ? <WrappedComponent/> : <Unauthorized/>;
  };

  return TokenValidationComponent;
};

const SystemLog = () => {
  const [cookies] = useCookies()
  const [agentKey, setAgentKey] = useState<string>('')
  const {teamId} = useParams()

  const [sidebarMove, setSidebarMove] = useState<boolean>(true)
  const [systemLog, setSystemLog] = useState<any[]>([])
  const [logUpdating, setLogUpdating] = useState<boolean>(false)

  useEffect(() => {
    fetchAgentList(teamId)
      .then(res => {
        setAgentKey(res[0].key)
        const payload = {
          key: res[0].key,
          limit: '15'
        }

        axiosInstance.post('/agent/syslog/recent', payload).then((res) => {
          if (Array.isArray(res.data)) {
            res.data.forEach((v: DataItem) => {
              const formattedTimestamp = v.data.Timestamp.replace('T', ' ').replace('Z', '')
              setSystemLog((prevState) => [...prevState, {...v.data, Timestamp: formattedTimestamp}])
            })
          } else {
            console.error('res.data is not an array')
          }
        })
      })
  }, [])

  const SOCKET_URL = import.meta.env.VITE_WS_URL;

  const messageHandler = useCallback((event: MessageEvent<any>) => {
    const data = JSON.parse(event.data);

    if (Array.isArray(data)) {
      data.forEach((v: DataItem) => {
        const formattedTimestamp = v.data.Timestamp.replace('T', ' ').replace('Z', '')
        setSystemLog((prevState) => [...prevState, {...v.data, Timestamp: formattedTimestamp}])
      });
    } else {
      console.error("Event data is not an array");
    }

    setLogUpdating(false)
  }, []);

  const {sendMessage, readyState} = useWebSocket(SOCKET_URL, {
    onMessage: messageHandler,
    reconnectAttempts: 10,
    reconnectInterval: 3000,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (agentKey !== undefined) {
      const timerId = setInterval(() => {
        if (readyState === ReadyState.OPEN) {
          setLogUpdating(true)
          sendMessage(
            JSON.stringify({
              event: 'syslog',
              data: {
                "key": agentKey,
                "limit": 1
              }
            }),
          );
        } else {
          console.log('WebSocket is not connected');
        }
      }, 10000);
      return () => clearInterval(timerId)
    }
  }, [agentKey, readyState, sendMessage]);

  useEffect(() => {
    setSidebarMove(true)
    setTimeout(() => {
      setSidebarMove(false)
    }, 500)
  }, [cookies.sidebarStatus])

  return (
    <DashboardMain>
      <NavigationBar active={4}/>
      {sidebarMove ?
        (
          <SidebarMovingHandler>
            {cookies.theme === 'dark' ? <AuroraLogo/> : <AuroraLogoDark/>}
          </SidebarMovingHandler>
        ) :
        (
          <>
            <TitleTag title={'System Log'}/>
            <BoardSection>
              <PageName name={'System Log'}/>

              <BoardRowSection style={{height: '90%'}}>
                <RealTimeBox width={'100%'} $leftGap={true} $rightGap={true}>
                  <LogData>
                    <div className={'header'}>
                      <div className={'timestamp'}>Timestamp</div>
                      <div className={'message'}>Message <span>{logUpdating ? 'Updating...' : 'Recent'}</span></div>
                    </div>

                    <div className={'data-body'}>
                      {Object.values(systemLog).map((value: any, index: number) => (
                        <div className={'row-data'} key={index}>
                          <div className={'timestamp'}>{value.Timestamp}</div>
                          <div className={'message'}>{value.Log}</div>
                        </div>
                      ))}
                    </div>

                  </LogData>
                </RealTimeBox>
              </BoardRowSection>
            </BoardSection>
          </>
        )
      }
    </DashboardMain>
  )
}

const LogData = styled.div`
  width: 100%;
  height: calc(100% - 3rem);

  & .header {
    width: 100%;
    height: 3rem;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: ${({theme}) => theme.BottomNavigationFocusButtonColor};
    display: flex;

    & .timestamp {
      width: 18%;
      display: flex;
      align-items: center;
      padding-left: 1.5rem;
    }

    & .message {
      width: 82%;
      display: flex;
      padding-left: 1.5rem;
      align-items: center;

      & span {
        margin-left: auto;
        padding-right: 1.5rem;
        font-weight: 300;
        font-size: 0.8rem;
      }
    }
  }

  & .data-body {
    height: calc(100% - 1rem);
    overflow: auto;

    & .row-data {
      background: ${({theme}) => theme.BottomNavigationContainerColor};
      padding-top: 0.7rem;
      padding-bottom: 0.7rem;
      height: auto;
      margin: 1rem auto 0;
      width: calc(100% - 2rem);
      font-weight: 300;
      border-radius: 4px;
      display: flex;
      box-shadow: ${({theme}) => theme.boxShadow};

      & .timestamp {
        width: 18%;
        padding-left: 1rem;
        display: flex;
        align-items: center;
      }

      & .message {
        width: 82%;
        padding-left: 1rem;
        display: flex;
        align-items: center;
      }

    }
  }
`

const EnhancedMain = withTokenValidation(SystemLog);

export default EnhancedMain;