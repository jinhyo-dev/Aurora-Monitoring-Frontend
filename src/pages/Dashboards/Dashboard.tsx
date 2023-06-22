import { BoardRowSection, BoardSection, DashboardMain, RealTimeBox } from "../../styles/GlobalStyle";
import NavigationBar from "./NavigationBar";
import PageName from "../components/PageName";

const Dashboard = () => {
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
