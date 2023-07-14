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

import {Line} from 'react-chartjs-2';
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
  ExtendedChartData,
  MemoryFreeChartConfig,
  MemoryUsedChartConfig,
  SwapFreeChartConfig,
  SwapUsedChartConfig,
  TempValues,
  DataItem
} from "./ChartConfiguration.ts";

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

const MemoryOverview = () => {
  const [cookies] = useCookies()
  const [sidebarMove, setSidebarMove] = useState<boolean>(true)
  const [agentKey, setAgentKey] = useState<string>('')
  const {teamId} = useParams()

  const [memoryFreeData, setMemoryFreeData] = useState<ExtendedChartData | null>(null);
  const [memoryUsedData, setMemoryUsedData] = useState<ExtendedChartData | null>(null);
  const [swapFreeData, setSwapFreeData] = useState<ExtendedChartData | null>(null);
  const [swapUsedData, setSwapUsedData] = useState<ExtendedChartData | null>(null);

  useEffect(() => {
    fetchAgentList(teamId)
      .then(res => {
        setAgentKey(res[0].key)
        const payload = {
          start: '-2m',
          stop: 'now()',
          key: res[0].key,
          windowPeriod: '10s',
        }

        const tempValues: TempValues = {
          MemoryFree: [],
          MemoryUsed: [],
          MemoryTotal: [],
          SwapFree: [],
          SwapUsed: [],
          SwapTotal: [],
        };

        axiosInstance.post("/influx/overview", payload).then((res) => {
          if (Array.isArray(res.data)) {
            res.data.forEach((v: DataItem) => {
              if (Object.prototype.hasOwnProperty.call(tempValues, v._field)) {
                tempValues[v._field].push(v);
              }
            })
          } else {
            console.error("res.data is not an array")
          }
        })
          .then(() => {
            setMemoryFreeData(MemoryFreeChartConfig(tempValues.MemoryFree, tempValues.MemoryTotal))
            setMemoryUsedData(MemoryUsedChartConfig(tempValues.MemoryUsed, tempValues.MemoryTotal))
            setSwapFreeData(SwapFreeChartConfig(tempValues.SwapFree, tempValues.SwapTotal))
            setSwapUsedData(SwapUsedChartConfig(tempValues.SwapUsed, tempValues.SwapTotal))
          })
      })
  }, [])

  const SOCKET_URL = import.meta.env.VITE_WS_URL;

  const messageHandler = useCallback((event: MessageEvent<any>) => {
    const tempValues: TempValues = {
      MemoryFree: [],
      MemoryUsed: [],
      MemoryTotal: [],
      SwapFree: [],
      SwapUsed: [],
      SwapTotal: [],
    };

    const data = JSON.parse(event.data);

    if (Array.isArray(data)) {
      data.forEach((v: DataItem) => {
        if (Object.prototype.hasOwnProperty.call(tempValues, v._field)) {
          tempValues[v._field].push(v);
        }
      });
    } else {
      console.error("Event data is not an array");
    }

    setMemoryFreeData(MemoryFreeChartConfig(tempValues.MemoryFree, tempValues.MemoryTotal))
    setMemoryUsedData(MemoryUsedChartConfig(tempValues.MemoryUsed, tempValues.MemoryTotal))
    setSwapFreeData(SwapFreeChartConfig(tempValues.SwapFree, tempValues.SwapTotal))
    setSwapUsedData(SwapUsedChartConfig(tempValues.SwapUsed, tempValues.SwapTotal))
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
          sendMessage(
            JSON.stringify({
              event: 'overview',
              data: {
                start: '-2m',
                stop: 'now()',
                key: agentKey,
                windowPeriod: '10s',
              },
            }),
          );
        } else {
          console.log('WebSocket is not connected');
        }
      }, 10000);

      return () => clearInterval(timerId);
    }
  }, [agentKey, readyState, sendMessage]);

  useEffect(() => {
    setSidebarMove(true)
    setTimeout(() => {
      setSidebarMove(false)
    }, 500)
  }, [cookies.sidebarStatus])

  const boxNameStyle = {
    fontSize: cookies.sidebarStatus === 'closed' ? '1.2rem' : '0.9rem',
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
        labels: {
          boxWidth: 0,
          usePointStyle: true,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        border: {dash: [4, 4]},
        ticks: {
          color: cookies.theme === 'dark' ? '#aaa' : '#888',
          font: {
            size: 10,
          },
        },
        grid: {
          tickBorderDash: [2, 3],
          tickLength: 10,
          color: cookies.theme === 'dark' ? '#383838' : '#eee',
        },
      },
      x: {
        beginAtZero: false,
        ticks: {
          color: cookies.theme === 'dark' ? '#aaa' : '#888',
          font: {
            size: 8,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    bezierCurve: true,
  };

  return (
    <DashboardMain>
      <NavigationBar active={3}/>
      {sidebarMove ?
        (
          <SidebarMovingHandler>
            {cookies.theme === 'dark' ? <AuroraLogo/> : <AuroraLogoDark/>}
          </SidebarMovingHandler>
        ) :
        (
          <>
            <TitleTag title={'Memory Overview'}/>
            <BoardSection>
              <PageName name={'Memory Overview'}/>

              <BoardRowSection>
                <RealTimeBox width={'50%'} $leftGap={true} $rightGap={true}>
                  <div className={'box-name'} style={boxNameStyle}>Memory Free<span>unit: byte</span></div>
                  <div className={'chart-container'}>
                    {memoryFreeData && <Line options={options} data={memoryFreeData} className={'chart'}/>}
                  </div>
                </RealTimeBox>

                <RealTimeBox width={'50%'} $leftGap={false} $rightGap={true}>
                  <div className={'box-name'} style={boxNameStyle}>Memory Used<span>unit: byte</span></div>
                  <div className={'chart-container'}>
                    {memoryUsedData && <Line options={options} data={memoryUsedData} className={'chart'}/>}
                  </div>
                </RealTimeBox>
              </BoardRowSection>

              <BoardRowSection>
                <RealTimeBox width={'100%'} $leftGap={true} $rightGap={true}>
                  <div className={'box-name'} style={boxNameStyle}>Swap Free<span>unit: byte</span></div>
                  <div className={'chart-container'}>
                    {swapFreeData && <Line options={options} data={swapFreeData} className={'chart'}/>}
                  </div>
                </RealTimeBox>
              </BoardRowSection>

              <BoardRowSection>
                <RealTimeBox width={'100%'} $leftGap={true} $rightGap={true}>
                  <div className={'box-name'} style={boxNameStyle}>Swap Used<span>unit: byte</span></div>
                  <div className={'chart-container'}>
                    {swapUsedData && <Line options={options} data={swapUsedData} className={'chart'}/>}
                  </div>
                </RealTimeBox>
              </BoardRowSection>

            </BoardSection>
          </>
        )
      }
    </DashboardMain>
  )
}

const EnhancedMain = withTokenValidation(MemoryOverview);

export default EnhancedMain;