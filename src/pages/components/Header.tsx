import styled from "styled-components";
import { ReactComponent as AuroraIcon } from '../../assets/svg/Aurora.svg'
import { MdLogin } from 'react-icons/md'
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  return (
    <HeaderTag>
      <NavigateContainer>
        <AuroraNavigate href={'/'}>
          <AuroraIcon style={{width: '2rem', height: '2rem', marginBottom: '-0.23rem'}}/> Aurora
        </AuroraNavigate>

        <LoginNavigator onClick={() => navigate('/sign-up')}>
          <MdLogin style={{ marginBottom: '-0.2rem', marginRight: '0.3rem' }}/> Sign up
        </LoginNavigator>

        <UsageNavigator href={'/sign-in'}>
          Sign in
        </UsageNavigator>

        <UsageNavigator href={'/install'}>
          Install
        </UsageNavigator>

        <UsageNavigator href={'/usage'}>
          Usage
        </UsageNavigator>

      </NavigateContainer>
    </HeaderTag>
  )
}

const HeaderTag = styled.header`
  height: 3.3rem;
  padding: 1rem;
  color: white;
  background: none;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
`

const NavigateContainer = styled.div`
  width: 85%;
  margin: auto;
  font-weight: 400;
`

const AuroraNavigate = styled.a`
  font-size: 2.2rem;
  color: #fff;
  font-weight: 500;
  opacity: 1;
  transition: .2s all;
  
  &:hover {
    opacity: .75;
  }
`

const UsageNavigator = styled.a`
  margin-top: 0.8rem;
  float: right;
  font-size: 1.1rem;
  color: #fff;
  padding-right: 2rem;
  transition: .2s all;

  &:hover {
    margin-top: 0.7rem;
    opacity: .75;
  }
`

const LoginNavigator = styled.button`
  margin-top: 0.5rem;
  width: 7rem;
  height: 2.2rem;
  background: none;
  float: right;
  border-radius: 7px;
  font-size: 1.1rem;
  color: #fff;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    margin-top: 0.4rem;
    opacity: .75;
  }
`

export default Header