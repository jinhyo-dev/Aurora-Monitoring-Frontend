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
        <PlanBox>
          <PlanName>Free</PlanName>
          <PlanButton>Continue with Free</PlanButton>
        </PlanBox>
        <PlanBox style={{ marginLeft: '5%' }}>
          <PlanName>Team</PlanName>
          <PlanButton>Continue with Team</PlanButton>
        </PlanBox>
        <PlanBox style={{ marginLeft: '5%' }}>
          <PlanName>Enterprise</PlanName>
          <PlanButton>Continue with Enterprise</PlanButton>
        </PlanBox>
      </PlanContainer>


    </MainTag>
  )
}

const Title = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
`

const PlanContainer = styled.div`
  width: 90%;
  margin: calc(6% - 3rem) auto 0;
  height: 35rem;
  text-align: center;
`

const PlanName= styled.div`
  font-size: 1.8rem;
  text-align: center;
  margin-top: 2rem;
  font-weight: 600;
`

const PlanButton = styled.button`
  margin: 2rem auto 0;
  width: 90%;
  height: 3rem;
  font-size: 1.1rem;
  border: 2px solid #fff;
  border-radius: 5px;
  background: none;
  color: #fff;
  cursor: pointer;
  transition: all .2s;
  
  &:hover {
    background: #fff;
    color: #000;
  }
`

const PlanBox = styled.div`
  width: 30%;
  height: 100%;
  float: left;
  background-color: rgba(0, 0, 0, .6);
  border-radius: 7px;
`

export default SignUp