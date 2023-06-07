import { Helmet } from 'react-helmet';
import styled from "styled-components";
import AuroraBackground from "../assets/images/Aurora-Main-Background.jpg";
import Header from "./components/Header";
import { AuthenticationContainer } from "../styles/GlobalStyle";

const SignIn = () => {
  const pageTitle = 'Aurora - Sign in';

  return (
    <MainTag>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Header/>

      <AuthenticationContainer>
        <div className={'left-box'}>
          <div className={'title'}>Sign in to Aurora</div>

          <div className="input-container">
            <input type="input" className="input-field" placeholder="Email" name="email" id='email' required={true}/>
            <label htmlFor="email" className="input-label">Email</label>
          </div>

          <div className="input-container">
            <input type="password" className="input-field" placeholder="Password" name="password" id='password' required={true}/>
            <label htmlFor="Password" className="input-label">Password</label>
          </div>

        </div>

        <div className={'right-box'}>

        </div>
      </AuthenticationContainer>
    </MainTag>
  )
}

const MainTag = styled.main`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${AuroraBackground});
  width: 100%;
  height: 100vh;
  background-size: cover;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  top: 0;
  left: 0;
`

export default SignIn