import styled, { keyframes } from "styled-components";
import { ReactComponent as AuroraLogo } from '../../assets/svg/Aurora.svg'
import { ReactComponent as AuroraLogoDark } from '../../assets/svg/AuroraDark.svg'
import Cookies from "js-cookie";

const Loaders = () => {
  const theme = Cookies.get('theme');

  return (
    <Container>
      <LoadingContainer>
        {theme === 'dark' ? <AuroraLogo/> : <AuroraLogoDark/>}
        <Loader/>
      </LoadingContainer>
    </Container>
  )
}

const moving = keyframes`
  50% {
    width: 100%;
  }

  100% {
    width: 0;
    right: 0;
    left: unset;
  }
`

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoadingContainer = styled.div`
  width: 11rem;
  height: 5.5rem;
  
  & svg {
    width: 100%;
  }
`

const Loader = styled.div`
  margin-top: 1rem;
  display: block;
  --height-of-loader: 4px;
  --loader-color: ${({theme}) => theme.fontColor};
  width: 100%;
  height: var(--height-of-loader);
  border-radius: 30px;
  background-color: ${({theme}) => theme.BottomNavigationFocusButtonColor};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    background: var(--loader-color);
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    border-radius: 30px;
    animation: ${moving} 1s ease-in-out infinite;;
`

export default Loaders