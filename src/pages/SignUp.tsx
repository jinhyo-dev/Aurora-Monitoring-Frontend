import { MainTag } from "../styles/GlobalStyle";
import { Helmet } from "react-helmet";
import Header from "./components/Header";
import styled from "styled-components";

const SignUp = () => {
  const pageTitle = 'Sign up to Aurora · Aurora';
  // const navigate = useNavigate()

  return (
    <MainTag>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Header/>

      <Title>
        Pick a plan for your account
      </Title>

      <PlanContainer>
        <PlanBox></PlanBox>
        <PlanBox style={{ marginLeft: '5%' }}></PlanBox>
        <PlanBox style={{ marginLeft: '5%' }}></PlanBox>
      </PlanContainer>


    </MainTag>
  )
}

const Title = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
`

const PlanContainer = styled.div`
  width: 90%;
  margin: calc(6% - 3rem) auto 0;
  height: 35rem;
`

const PlanBox = styled.div`
  width: 30%;
  height: 100%;
  float: left;
  background-color: #000;
  border-radius: 7px;
  opacity: .6;
`

export default SignUp