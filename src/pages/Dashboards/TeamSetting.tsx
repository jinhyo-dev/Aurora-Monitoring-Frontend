import React, { useEffect, useState } from "react";
import { tokenValidity } from "../../utils/Cookie";
import Loaders from "../components/Loaders";
import Unauthorized from "../components/Error/Unauthorized";
import NavigationBar from "./NavigationBar";
import { BoardSection, DashboardMain, fadeIn } from "../../styles/GlobalStyle";
import PageName from "../components/PageName";
import styled from "styled-components";
import { ReactComponent as AuroraLogo } from '../../assets/svg/Aurora.svg'
import { ReactComponent as AuroraLogoDark } from '../../assets/svg/AuroraDark.svg'
import { useCookies } from "react-cookie"

const withTokenValidation = (WrappedComponent: React.ComponentType) => {
  const TokenValidationComponent = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)

    useEffect(() => {
      const checkValidity = async () => {
        const isValid = await tokenValidity();
        setIsAuthorized(isValid)
      };

      checkValidity().then(() => setLoading(false));
    }, []);
    return loading ? <Loaders/> : isAuthorized ? <WrappedComponent/> : <Unauthorized/>;
  };

  return TokenValidationComponent;
};

const TeamSetting = () => {
  const [cookies] = useCookies()

  return (
    <DashboardMain>
      <NavigationBar active={7}/>
      <BoardSection>
        <PageName name={'Team Setting'}/>
        <TeamSettingContainer>
          {cookies.theme === 'dark' ? <AuroraLogo className={'aurora-logo'}/> :
            <AuroraLogoDark className={'aurora-logo'}/>}
          <div className={'title'}>
            <div>Team Information</div>
            <button>
              Delete this team
            </button>
          </div>
        </TeamSettingContainer>
      </BoardSection>
    </DashboardMain>
  )
}

const TeamSettingContainer = styled.div`
  color: ${({theme}) => theme.fontColor};
  height: 40rem;
  width: 35rem;
  margin: auto;
  background-color: ${({theme}) => theme.primaryColor};
  border-radius: 5px;
  box-shadow: ${({theme}) => theme.boxShadow};
  animation: ${fadeIn} 0.3s ease-out backwards;
  transition: background-color 0.3s ease-out;
  text-align: center;

  & .aurora-logo {
    width: 12rem;
    margin-top: 3rem;
  }

  & .title {
    width: 85%;
    height: 2.6rem;
    border-bottom: ${({theme}) => `1px solid ${theme.NavigationFocusButtonColor}`};
    margin: 3rem auto 0;
    align-items: center;
    font-size: 1.4rem;

    & div {
      float: left;
    }

    & button {
      float: right;
      background: #d94141;
      color: #fff;
      cursor: pointer;
      height: 2rem;
      width: 8.5rem;
      border: none;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 300;
      transition: all .25s;

      &:hover {
        background: #b93939;
      }
    }
  }
`

const EnhancedTeamSetting = withTokenValidation(TeamSetting);

export default EnhancedTeamSetting;