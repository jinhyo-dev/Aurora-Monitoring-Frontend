import NavigationBar from "./NavigationBar";
import { BoardRowSection, BoardSection, DashboardMain, RealTimeBox } from "../../styles/GlobalStyle";
import PageName from "../components/PageName";
import styled from "styled-components";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { AiTwotoneSetting } from 'react-icons/ai'
import { BsPersonFillAdd } from 'react-icons/bs'

interface ButtonStatusProps {
  $active: boolean;
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
          <RealTimeBox width={'35%'} $leftGap={true} $rightGap={true} style={{display: 'flex', alignItems: 'center'}}>

            <UserInformationContainer>
              <UserProfileImage/>
              <Username>Jinhyo Kim</Username>
              <UserPermission>Owner</UserPermission>

              <NavigationButtonContainer>
                <NavigationButton $active={preferencesState === 0} onClick={() => handlePreferencesState(0)}>
                  <FaUserAlt/>
                  {<span>My Profile</span>}
                </NavigationButton>

                <NavigationButton $active={preferencesState === 1} onClick={() => handlePreferencesState(1)}>
                  <AiTwotoneSetting/>
                  {<span>User management</span>}
                </NavigationButton>

                <NavigationButton $active={preferencesState === 2} onClick={() => handlePreferencesState(2)}>
                  <BsPersonFillAdd/>
                  {<span>Invite members</span>}
                </NavigationButton>
              </NavigationButtonContainer>
            </UserInformationContainer>

          </RealTimeBox>
          <RealTimeBox width={'65%'} $leftGap={false} $rightGap={true}>
            {
              preferencesState === 0 ?
                (<ProfileContainer>
                  <div className={'container-name'}>Account Information</div>
                  <div className={'container-information'}>Edit personal information and password</div>
                  <div className={'container-subtitle'}>Personal Information</div>

                  <div className={'input-container'} style={{marginTop: '5%'}}>
                    <div className={'left-input'}>
                      <div>First Name</div>
                      <input type={'text'}/>
                    </div>

                    <div className={'right-input'}>
                      <div>Last Name</div>
                      <input type={'text'}/>
                    </div>
                  </div>

                  <div className={'input-container'}>
                    <div className={'left-input'}>
                      <div>Phone Number</div>
                      <input type={'text'}/>
                    </div>

                    <div className={'right-input'}>
                      <div>Email</div>
                      <input type={'text'}/>
                    </div>
                  </div>

                  <div className={'input-container'}>
                    <div className={'left-input'}>
                      <div>New Password</div>
                      <input type={'password'}/>
                    </div>

                    <div className={'right-input'}>
                      <div>Confirm Password</div>
                      <input type={'password'}/>
                    </div>
                  </div>

                  <div className={'button-container'}>
                    <button className={'save-button'}>Save</button>
                    <button className={'cancel-button'}>Cancel</button>
                  </div>
                </ProfileContainer>) :
                preferencesState === 1 ?
                  (<ProfileContainer>
                  </ProfileContainer>) :
                  (<ProfileContainer>
                    <div className={'container-name'}>Invite member to your team</div>
                    <div className={'container-information'}>Invite by code or email address</div>
                  </ProfileContainer>)
            }
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
  background-color: ${({$active}) => ($active ? ({theme}) => theme.NavigationFocusButtonColor : ({theme}) => theme.primaryColor)};
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

const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  & > div {
    padding-left: 2rem;
  }

  & .container-name {
    padding-top: 1.5rem;
    color: ${({theme}) => theme.fontColor};
    font-size: 1.8rem;
  }

  & .container-information {
    padding-top: 0.2rem;
    color: ${({theme}) => theme.fontSecondColor};
    font-size: 1rem;
  }

  & .container-subtitle {
    padding-top: 1.5rem;
    color: ${({theme}) => theme.fontColor};
    font-size: 1.45rem;
  }

  & .input-container {
    padding-left: 0;
    margin-top: 13%;
    height: 4rem;
    width: 100%;
    color: ${({theme}) => theme.fontSecondColor};

    & .left-input {
      width: 40%;
      float: left;
      padding-left: 2rem;
    }

    & .right-input {
      width: 40%;
      float: right;
      padding-right: 2rem;
    }

    & input {
      margin-top: 0.5rem;
      width: 100%;
      background: none;
      height: 3.1rem;
      border: ${({theme}) => `1px solid ${theme.fontSecondColor}`};
      border-radius: 5px;
      padding-left: 1rem;
      padding-right: 1rem;
      font-size: 1rem;
      box-sizing: border-box;
      transition: all .15s;
      color: ${({theme}) => theme.fontColor};

      &:focus {
        outline: none;
        border: ${({theme}) => `1px solid ${theme.fontColor}`};
      }
    }
  }

  & .button-container {
    width: 50%;
    height: 3rem;
    margin: auto 2rem 1rem auto;

    & button {
      width: 20%;
      height: 80%;
      float: right;
      font-size: 0.9rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: all .2s;

      &:hover {
        width: 21%;
        height: 82%;
      }
    }

    & .save-button {
      background: ${({theme}) => theme.fontColor};
      color: ${({theme}) => theme.backgroundColor};
    }

    & .cancel-button {
      margin-right: 1rem;
      background: ${({theme}) => theme.NavigationFocusButtonColor};
      color: ${({theme}) => theme.fontColor};
    }
  }
`

export default UserPreferences