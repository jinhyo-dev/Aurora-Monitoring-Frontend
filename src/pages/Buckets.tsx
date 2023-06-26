import { BoardSection, DashboardMain } from "../styles/GlobalStyle";
import styled from "styled-components";
import NavigationBar from "./Dashboards/NavigationBar";
import PageName from "./components/PageName";

const Buckets = () => {
  return (
    <DashboardMain>
      <NavigationBar active={0}/>
      <BoardSection>
        <PageName name={'Buckets'}/>
        <BucketsContainer>

        </BucketsContainer>
      </BoardSection>
    </DashboardMain>
  )
}

const BucketsContainer = styled.div`
  height: 40rem;
  width: 35rem;
  background: #aaa;
  margin: auto;
`

export default Buckets