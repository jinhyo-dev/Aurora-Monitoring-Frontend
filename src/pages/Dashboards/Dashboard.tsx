import { BoardRowSection, BoardSection, DashboardMain, RealTimeBox } from "../../styles/GlobalStyle";
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
  ChartType,
  ChartData,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import faker from 'faker';
import { useCookies } from "react-cookie";
import { useCallback, useEffect, useState } from "react";
import { fetchTeamInfo } from "../../utils/Cookie";
import Loaders from "../components/Loaders/Loaders";
import Unauthorized from "../components/Error/Unauthorized";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import * as React from "react";
import { ReactComponent as AuroraLogo } from '../../assets/svg/Aurora.svg'
import { ReactComponent as AuroraLogoDark } from '../../assets/svg/AuroraDark.svg'
import useWebSocket, { ReadyState } from 'react-use-websocket';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ExtendedChartData extends ChartData<ChartType, number[], string> {
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    pointStyle: false;
    pointBorderColor: string;
    borderWidth: number;
    tension: number;
  }[];
}

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

const Dashboard = () => {
  const [cookies] = useCookies()
  const [sidebarMove, setSidebarMove] = useState<boolean>(true)

  const SOCKET_URL = 'ws://183.106.245.209:8265';
  const messageHandler = useCallback((event: MessageEvent<any>) => {
    console.log('Received:', JSON.parse(event.data));
  }, []);

  const {sendMessage, readyState} = useWebSocket(SOCKET_URL, {
    onMessage: messageHandler,
    reconnectAttempts: 10,
    reconnectInterval: 3000,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendMessage(JSON.stringify({
        event: 'influx',
        data: {
          start: '-7d',
          stop: 'now()',
          windowPeriod: '1s'
        }
      }));
      console.log('Request sent');
    } else {
      console.log('WebSocket is not connected');
    }
  }, [readyState, sendMessage]);

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
    animation: {
      duration: 150,
    },
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


  const labels = [''];

  const [data, setData] = useState<ExtendedChartData>({
    labels: labels.slice(0, 1),
    datasets: [
      {
        label: 'A',
        data: [0],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      },
      {
        label: 'B',
        data: [0],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      },
    ],
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      setData((prevData: ExtendedChartData) => ({
        labels: [...((prevData.labels || []).slice(-10)), currentTime],
        datasets: prevData.datasets.map((dataset) => ({
          ...dataset,
          data: [...dataset.data.slice(-10), faker.datatype.number({min: -1000, max: 1000})]
        }))
      }))
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <DashboardMain>
      <NavigationBar active={0}/>
      {sidebarMove ?
        (
          <SidebarMovingHandler>
            {cookies.theme === 'dark' ? <AuroraLogo/> : <AuroraLogoDark/>}
          </SidebarMovingHandler>
        ) :
        (
          <BoardSection>
            <PageName name={'Dashboard'}/>

            <BoardRowSection>
              <RealTimeBox width={'58%'} $leftGap={true} $rightGap={true}>
                <div className={'box-name'} style={boxNameStyle}>WebTransaction</div>
                <div className={'chart-container'}>
                  <Line options={options} data={data} className={'chart'}/>
                </div>
              </RealTimeBox>

              <RealTimeBox width={'39%'} $leftGap={false} $rightGap={true}>
                <div className={'box-name'} style={boxNameStyle}>WebTransaction</div>
                <div className={'chart-container'}>
                  <Line options={options} data={data} className={'chart'}/>
                </div>
              </RealTimeBox>
            </BoardRowSection>

            <BoardRowSection>
              <RealTimeBox width={'32%'} $leftGap={true} $rightGap={true}>
                <div className={'box-name'} style={boxNameStyle}>WebTransaction</div>
                <div className={'chart-container'}>
                  <Line options={options} data={data} className={'chart'}/>
                </div>
              </RealTimeBox>

              <RealTimeBox width={'32%'} $leftGap={false} $rightGap={true}>
                <div className={'box-name'} style={boxNameStyle}>WebTransaction</div>
                <div className={'chart-container'}>
                  <Line options={options} data={data} className={'chart'}/>
                </div>
              </RealTimeBox>

              <RealTimeBox width={'32%'} $leftGap={false} $rightGap={true}>
                <div className={'box-name'} style={boxNameStyle}>WebTransaction</div>
                <div className={'chart-container'}>
                  <Line options={options} data={data} className={'chart'}/>
                </div>
              </RealTimeBox>

            </BoardRowSection>

            <BoardRowSection>
              <RealTimeBox width={'58%'} $leftGap={true} $rightGap={true}>
                <div className={'box-name'} style={boxNameStyle}>WebTransaction</div>
                <div className={'chart-container'}>
                  <Line options={options} data={data} className={'chart'}/>
                </div>
              </RealTimeBox>

              <RealTimeBox width={'39%'} $leftGap={false} $rightGap={true}>
                <div className={'box-name'} style={boxNameStyle}>WebTransaction</div>
                <div className={'chart-container'}>
                  <Line options={options} data={data} className={'chart'}/>
                </div>
              </RealTimeBox>
            </BoardRowSection>

          </BoardSection>
        )
      }
    </DashboardMain>
  )
}

const SidebarMovingHandler = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    width: 15rem;
  }
`

const EnhancedMain = withTokenValidation(Dashboard);

export default EnhancedMain;