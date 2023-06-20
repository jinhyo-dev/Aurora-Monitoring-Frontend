import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as AuroraLogo } from '../../assets/svg/Aurora.svg'
const NavigationBar = () => {
  const [status, setStatus] = useState<boolean>(false)
  return (
    <Nav status={status}>
      <div className={'logo-container'}>
        <AuroraLogo/>
      </div>
      <button onClick={() => setStatus(!status)} className={'close-button'}>close</button>
    </Nav>
  )
}

const Nav = styled.nav<{ status: boolean }>`
  height: 98%;
  margin-left: 0.5%;
  width: ${({status}) => (status ? "20%" : "3.5rem")};
  background-color: #2E2E2E;
  border-radius: 5px;
  transition: all .2s;
  text-align: center;

  & .logo-container {
    margin: 5% auto 0;
    width: 100%;
    text-align: center;

    & svg {
      width: ${({status}) => (status ? "60%" : "80%")};
    }
  }

  & .navigation-container {
    width: 90%;
    height: 3rem;
    background-color: #484848;
    border-radius: ${({status}) => (status ? "5px" : "8px")};
    margin: 5% auto;
  }

  & .close-button {
    width: 3rem; 
    height: 3rem;
    //float: right;
    display: flex;
    flex-direction: column;
    //bottom: 2%;
    //margin-right: 5%;
  }
`


export default NavigationBar