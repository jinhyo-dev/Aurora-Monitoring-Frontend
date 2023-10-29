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
import {useEffect, useState} from "react";
import * as React from "react";
import {ReactComponent as AuroraLogo} from '../../assets/svg/Aurora.svg'
import {ReactComponent as AuroraLogoDark} from '../../assets/svg/AuroraDark.svg'
import {
  CpuChartConfig,
  DiskReadSizeChartConfig, DiskWriteSizeChartConfig,
  ExtendedChartData, MemoryFreeChartConfig, MemoryUsedChartConfig, SwapFreeChartConfig, SwapUsedChartConfig,
  SystemChartConfig,
  UserChartConfig
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
    // const [loading, setLoading] = useState<boolean>(true)
    // const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    // const {teamId} = useParams()

    return <WrappedComponent/>
  };

  return TokenValidationComponent;
};

const Dashboard = () => {
  const [cookies] = useCookies()
  const [sidebarMove, setSidebarMove] = useState<boolean>(true)

  const [cpuData, setCpuData] = useState<ExtendedChartData | null>(null);
  const [systemData, setSystemData] = useState<ExtendedChartData | null>(null);
  const [userData, setUserData] = useState<ExtendedChartData | null>(null);
  const [diskReadData, setDiskReadData] = useState<ExtendedChartData | null>(null);
  const [diskWriteData, setDiskWriteData] = useState<ExtendedChartData | null>(null);
  const [memoryFreeData, setMemoryFreeData] = useState<ExtendedChartData | null>(null);
  const [memoryUsedData, setMemoryUsedData] = useState<ExtendedChartData | null>(null);
  const [swapFreeData, setSwapFreeData] = useState<ExtendedChartData | null>(null);
  const [swapUsedData, setSwapUsedData] = useState<ExtendedChartData | null>(null);

  useEffect(() => {

    setCpuData(CpuChartConfig())
    setSystemData(SystemChartConfig())
    setUserData(UserChartConfig())
    setDiskReadData(DiskReadSizeChartConfig())
    setDiskWriteData(DiskWriteSizeChartConfig())
    setMemoryFreeData(MemoryFreeChartConfig())
    setMemoryUsedData(MemoryUsedChartConfig())
    setSwapFreeData(SwapFreeChartConfig())
    setSwapUsedData(SwapUsedChartConfig())
  }, [])

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
      <NavigationBar active={0}/>
      {sidebarMove ?
        (
          <SidebarMovingHandler>
            {cookies.theme === 'dark' ? <AuroraLogo/> : <AuroraLogoDark/>}
          </SidebarMovingHandler>
        ) :
        (
          <>
            <TitleTag title={'Dashboard'}/>
            <BoardSection>
              <PageName name={'Dashboard'}/>

              <BoardRowSection>
                <RealTimeBox width={'50%'} $leftGap={true} $rightGap={true}>
                  <div className={'box-name'} style={boxNameStyle}>Disk - Read Size<span>unit: size</span></div>
                  <div className={'chart-container'}>
                    {diskReadData && <Line options={options} data={diskReadData} className={'chart'}/>}
                  </div>
                </RealTimeBox>

                <RealTimeBox width={'50%'} $leftGap={false} $rightGap={true}>
                  <div className={'box-name'} style={boxNameStyle}>Disk - Write Size<span>unit: size</span></div>
                  <div className={'chart-container'}>
                    {diskWriteData && <Line options={options} data={diskWriteData} className={'chart'}/>}
                  </div>
                </RealTimeBox>
              </BoardRowSection>

              <BoardRowSection>
                <RealTimeBox width={'32%'} $leftGap={true} $rightGap={true}>
                  <div className={'box-name'} style={boxNameStyle}>Cpu Percent<span>unit: percent</span></div>
                  <div className={'chart-container'}>
                    {cpuData && <Line options={options} data={cpuData} className={'chart'}/>}
                  </div>
                </RealTimeBox>

                <RealTimeBox width={'32%'} $leftGap={false} $rightGap={true}>
                  <div className={'box-name'} style={boxNameStyle}>System Percent<span>unit: percent</span></div>
                  <div className={'chart-container'}>
                    {systemData && <Line options={options} data={systemData} className={'chart'}/>}
                  </div>
                </RealTimeBox>

                <RealTimeBox width={'32%'} $leftGap={false} $rightGap={true}>
                  <div className={'box-name'} style={boxNameStyle}>User Percent<span>unit: percent</span></div>
                  <div className={'chart-container'}>
                    {userData && <Line options={options} data={userData} className={'chart'}/>}
                  </div>
                </RealTimeBox>

              </BoardRowSection>

              <BoardRowSection>
                <RealTimeBox width={'25%'} $leftGap={true} $rightGap={true}>
                  <div className={'box-name'} style={boxNameStyle}>Memory Free<span>unit: byte</span></div>
                  <div className={'chart-container'}>
                    {memoryFreeData && <Line options={options} data={memoryFreeData} className={'chart'}/>}
                  </div>
                </RealTimeBox>

                <RealTimeBox width={'25%'} $leftGap={false} $rightGap={true}>
                  <div className={'box-name'} style={boxNameStyle}>Memory Used<span>unit: byte</span></div>
                  <div className={'chart-container'}>
                    {memoryUsedData && <Line options={options} data={memoryUsedData} className={'chart'}/>}
                  </div>
                </RealTimeBox>

                <RealTimeBox width={'25%'} $leftGap={false} $rightGap={true}>
                  <div className={'box-name'} style={boxNameStyle}>Swap Free<span>unit: byte</span></div>
                  <div className={'chart-container'}>
                    {swapFreeData && <Line options={options} data={swapFreeData} className={'chart'}/>}
                  </div>
                </RealTimeBox>

                <RealTimeBox width={'25%'} $leftGap={false} $rightGap={true}>
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

const EnhancedMain = withTokenValidation(Dashboard);

export default EnhancedMain;