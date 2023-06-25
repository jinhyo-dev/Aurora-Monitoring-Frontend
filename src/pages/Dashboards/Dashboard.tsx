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
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - Multi Axis',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
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
            <div className={'box-name'}>Recent Deployments</div>
            <div className={'chart-container'}>
              <Line options={options} data={data} className={'chart'}/>
            </div>
          </RealTimeBox>

          <RealTimeBox width={'39%'} leftGap={false} rightGap={true}>
          </RealTimeBox>
        </BoardRowSection>

        <BoardRowSection>
          <RealTimeBox width={'32%'} leftGap={true} rightGap={true}>
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
