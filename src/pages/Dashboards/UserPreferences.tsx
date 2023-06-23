import NavigationBar from "./NavigationBar";
import { BoardRowSection, BoardSection, DashboardMain, RealTimeBox } from "../../styles/GlobalStyle";
import PageName from "../components/PageName";
import styled from "styled-components";
import { useState } from "react";
import * as React from "react";
import { FaUserAlt } from "react-icons/fa";
import { AiTwotoneSetting } from 'react-icons/ai'

interface ButtonStatusProps {
  active: boolean;
}

const UserPreferences = () => {
  const [preferencesState, setPreferencesState] = useState<number>(0)

  const handlePreferencesState = (value: number) => {
    setPreferencesState(value)
  }

  return (
    <DashboardMain>
      <NavigationBar active={8}/>
      <BoardSection>
        <PageName name={'User Preferences'}/>
        <BoardRowSection style={{height: '91%'}}>
          <RealTimeBox width={'35%'} leftGap={true} rightGap={true} style={{ display: 'flex', alignItems: 'center' }}>

            <UserInformationContainer>
              <UserProfileImage/>
              <Username>Jinhyo Kim</Username>
              <UserPermission>Owner</UserPermission>

              <NavigationButtonContainer>
                <NavigationButton active={preferencesState === 0} onClick={() => handlePreferencesState(0)}>
                  <FaUserAlt/>
                  {<span>My Profile</span>}
                </NavigationButton>

                <NavigationButton active={preferencesState === 1} onClick={() => handlePreferencesState(1)}>
                  <AiTwotoneSetting/>
                  {<span>User management</span>}
                </NavigationButton>
              </NavigationButtonContainer>
            </UserInformationContainer>

          </RealTimeBox>
          <RealTimeBox width={'65%'} leftGap={false} rightGap={true}>
          </RealTimeBox>
        </BoardRowSection>
      </BoardSection>
    </DashboardMain>
  )
}

const UserInformationContainer = styled.div`
  height: 28rem;
  width: 100%;
`

const UserProfileImage = styled.div`
  width: 8rem;
  height: 8rem;
  margin: auto;
  border-radius: 50%;
  background-image: url("https://www.snexplores.org/wp-content/uploads/2021/11/1030_LL_auroras.jpg");
  background-size: cover;
`

const Username = styled.div`
  color: ${({theme}) => theme.fontColor};
  font-size: 1.6rem;
  text-align: center;
  margin-top: 1.5rem;
`

const UserPermission = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 1%;
  color: ${({theme}) => theme.fontSecondColor};
`

const NavigationButtonContainer = styled.div`
  width: 85%;
  margin: 4rem auto 0;
  height: auto;
`

const NavigationButton = styled.button<ButtonStatusProps>`
  background-color: ${({active}) => (active ? ({theme}) => theme.NavigationFocusButtonColor : ({theme}) => theme.primaryColor)};
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  width: 100%;
  height: 3.3rem;
  margin-top: 1.25rem;
  transition: all .3s;
  color: ${({theme}) => theme.fontColor};
  cursor: pointer;

  &:hover {
    background-color: ${({theme}) => theme.NavigationFocusButtonColor};
  }

  & span {
    font-size: 1rem;
    float: left;
    margin-left: 1rem;
  }

  & svg {
    font-size: 1.3rem;
    float: left;
    margin-left: 1rem;
    margin-top: 0.1rem;
  }
`

export default UserPreferences