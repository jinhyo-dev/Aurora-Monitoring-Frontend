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
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {
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
  };

  const labels = ['10:40', '10:41', '10:42', '10:43', '10:44', '10:45', '10:46', '10:47', '10:48', '10:49', '10:50', '10:51', '10:51', '10:52'];

  const data = {
    labels,
    datasets: [
      {
        label: 'A',
        data: labels.map(() => faker.datatype.number({min: -1000, max: 1000})),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointStyle: false,
        pointRadius: 5,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        fill: false,
        tension: 0.15
      },
      {
        label: 'B',
        data: labels.map(() => faker.datatype.number({min: -1000, max: 1000})),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointStyle: false,
        pointRadius: 5,
        pointBorderColor: 'rgb(0, 0, 0)',
        borderWidth: 1,
        fill: false,
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
          <RealTimeBox width={'58%'} leftGap={true} rightGap={true}>
          </RealTimeBox>

          <RealTimeBox width={'39%'} leftGap={false} rightGap={true}>

          </RealTimeBox>
        </BoardRowSection>

        <BoardRowSection>
          <RealTimeBox width={'32%'} leftGap={true} rightGap={true}>
            <div className={'box-name'}>Recent Deployments</div>
            <div className={'chart-container'}>
              <Line options={options} data={data} className={'chart'}/>
            </div>
          </RealTimeBox>

          <RealTimeBox width={'32%'} leftGap={false} rightGap={true}>
          </RealTimeBox>

          <RealTimeBox width={'32%'} leftGap={false} rightGap={true}>
          </RealTimeBox>

        </BoardRowSection>

        <BoardRowSection>
          <RealTimeBox width={'58%'} leftGap={true} rightGap={true}>
          </RealTimeBox>

          <RealTimeBox width={'39%'} leftGap={false} rightGap={true}>
          </RealTimeBox>
        </BoardRowSection>

      </BoardSection>
    </DashboardMain>
  )
}

export default Dashboard
