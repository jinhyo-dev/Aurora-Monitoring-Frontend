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
import { useEffect, useState } from "react";
import { tokenValidity } from "../../utils/Cookie";
import Loaders from "../components/Loaders";
import Unauthorized from "../components/Error/Unauthorized";

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

    useEffect(() => {
      const checkValidity = async () => {
        const isValid = await tokenValidity();
        setIsAuthorized(isValid)
      };

      checkValidity().then(() => setLoading(false))
    }, []);

    return loading ? <Loaders/> : isAuthorized ? <WrappedComponent/> : <Unauthorized/>;
  };

  return TokenValidationComponent;
};

const Dashboard = () => {
  const [cookies] = useCookies()

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


  const labels = ['1s', '10:41', '10:42', '10:43', '10:44', '10:45', '10:46', '10:47', '10:48', '10:49', '10:50', '10:51', '10:51', '10:52', '10:40', '10:41', '10:42', '10:43', '10:44', '10:45', '10:46', '10:47', '10:48', '10:49', '10:50', '10:51', '10:51', '10:52'];

  const data: ExtendedChartData = {
    labels,
    datasets: [
      {
        label: 'A',
        data: labels.map(() => faker.datatype.number({min: -1000, max: 1000})),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      },
      {
        label: 'B',
        data: labels.map(() => faker.datatype.number({min: -1000, max: 1000})),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointStyle: false,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        tension: 0.15
      },
    ],
  };

  return (
    <DashboardMain>
      <NavigationBar active={0}/>
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
    </DashboardMain>
  )
}

const EnhancedMain = withTokenValidation(Dashboard);

export default EnhancedMain;