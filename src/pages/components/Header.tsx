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
          <MdLogin style={{ marginBottom: '-0.2rem', marginRight: '0.3rem' }}/> Sign In
        </LoginNavigator>

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
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
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
`

const UsageNavigator = styled.a`
  margin-top: 0.55rem;
  float: right;
  font-size: 1.3rem;
  color: #fff;
  padding-right: 2rem;
`

const LoginNavigator = styled.button`
  margin-top: 0.5rem;
  width: 7rem;
  height: 2.2rem;
  background-color: #fff;
  float: right;
  border-radius: 7px;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
   margin-top: 0.35rem; 
  }
`

export default Header