import NavigationBar from "./NavigationBar";
import { BoardRowSection, BoardSection, DashboardMain, RealTimeBox } from "../../styles/GlobalStyle";
import PageName from "../components/PageName";
import styled, { keyframes } from "styled-components";
import { FormEvent, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { AiTwotoneSetting, AiFillDelete } from 'react-icons/ai'
import { BsPersonFillAdd } from 'react-icons/bs'
import { TbCopy } from 'react-icons/tb'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { isValidEmail } from "../../utils/Formatter";
import { FiEdit } from 'react-icons/fi'
import { IoClose, IoCheckmarkSharp } from 'react-icons/io5'


interface ButtonStatusProps {
  $active: boolean;
}

interface EmailListProps {
  email: string;
  removing: boolean;
  editing: boolean;
}

interface EmailListErrorProps {
  status: boolean;
  message: string;
}

const UserPreferences = () => {
  const [preferencesState, setPreferencesState] = useState<number>(0)
  const [email, setEmail] = useState<string>('')
  const [isEmailFormValid, setIsEmailFormValid] = useState<EmailListErrorProps>({status: true, message: ''})
  const [emailList, setEmailList] = useState<EmailListProps[]>([])
  const [editNewEmail, setEditNewEmail] = useState<string>('')
  const [cookies] = useCookies()

  const handlePreferencesState = (value: number) => {
    setPreferencesState(value)
  }

  const CopiedAlert = () => {
    toast('Copied !',
      {
        style: {
          borderRadius: '5px',
          background: cookies.theme === 'dark' ? '#484848' : '#e1e1e1',
          color: cookies.theme === 'dark' ? '#fff' : '#000',
        },
        duration: 1000
      }
    )
  }

  const checkExistEmail = (email: string) => {
    return emailList.some((item: EmailListProps) => item.email === email)
  }

  const addEmailToList = (e: FormEvent) => {
    e.preventDefault()

    if (isValidEmail(email)) {
      if (checkExistEmail(email)) {
        setIsEmailFormValid({status: false, message: 'This email address is already exist in list.'})
      } else {
        setEmailList(prevState => ([
          ...prevState,
          {
            email: email,
            removing: false,
            editing: false
          }
        ]))

        setIsEmailFormValid({status: true, message: ''})
      }
    } else {
      setIsEmailFormValid({status: false, message: 'Invalid email format'})
    }

    console.log(emailList)
  }

  const deleteEmail = (email: string) => {
    setEmailList(prevList =>
      prevList.map(item => ({
        ...item,
        removing: item.email === email
      }))
    );

    setTimeout(() => {
      setEmailList(prevList => prevList.filter(item => item.email !== email));
    }, 350);
  }


  const editEmail = (email: string) => {
    setEditNewEmail(email)
    setEmailList(prevList =>
      prevList.map(item => ({
        ...item,
        editing: item.email === email
      }))
    );
  }

  const handleEditBlur = (email: string) => {
    setEmailList(prevList =>
      prevList.map(item => ({
        ...item,
        editing: item.email === email ? false : item.editing
      }))
    );
  }

  const handleEmailChange = (e: FormEvent, email: string, update: boolean) => {
    e.preventDefault()

    if (update && checkExistEmail(editNewEmail)) {
      toast('This email address is already exist in list.',
        {
          style: {
            borderRadius: '5px',
            background: cookies.theme === 'dark' ? '#484848' : '#e1e1e1',
            color: cookies.theme === 'dark' ? '#fff' : '#000',
          },
          duration: 1000
        }
      )
    } else {
      setEmailList(prevList =>
        prevList.map(item => ({
          ...item,
          email: item.email === email ? update ? editNewEmail : item.email : item.email
        }))
      );
      handleEditBlur(update ? editNewEmail : email)
    }
  };


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
                    <div className={'container-subtitle'}>Your team code
                      <div>
                        @kimsunghyun-cute
                        <CopyToClipboard text={'@kimsunghyun-cute'}>
                          <button onClick={CopiedAlert}><TbCopy/> Copy</button>
                        </CopyToClipboard>
                      </div>
                    </div>

                    <div className={'add-form-container'}>
                      <form onSubmit={addEmailToList}>
                        <label>
                          <input placeholder={'Add user by email'} required={true} value={email}
                                 onChange={(e) => setEmail(e.target.value)}/>
                          <button type="submit">Add</button>
                        </label>

                        {!isEmailFormValid.status && <p>{isEmailFormValid.message}</p>}
                      </form>
                    </div>

                    <div className={'email-list-container'}>
                      <div>
                        {Object.values(emailList).map((value: EmailListProps, index: number) => (
                          <div key={index} className={`email-box ${value.removing ? 'removing' : ''}`}>
                            <form onSubmit={e => handleEmailChange(e, value.email, true)}>
                              <label>
                                <input value={value.editing ? editNewEmail : value.email}
                                       className={`email-name ${value.editing ? 'editing' : ''}`}
                                       readOnly={!value.editing}
                                       id={value.email}
                                       onChange={e => setEditNewEmail(e.target.value)}
                                       ref={inputRef => {
                                         if (value.editing) {
                                           inputRef && inputRef.focus();
                                         }
                                       }}
                                />
                                {
                                  value.editing &&
                                  (
                                    <div className={'button-container'}>
                                      <button type={'button'} onClick={e => handleEmailChange(e, value.email, false)}><IoClose/></button>
                                      <button type={'submit'}><IoCheckmarkSharp/>
                                      </button>
                                    </div>
                                  )
                                }
                              </label>
                            </form>
                            <div className={'button-container'}>
                              <button onClick={() => editEmail(value.email)}><FiEdit/></button>
                              <button onClick={() => deleteEmail(value.email)}><AiFillDelete/></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={'button-container'}>
                      <button className={'save-button'}>Invite User</button>
                      <button className={'cancel-button'} onClick={() => setEmailList([])}>Cancel</button>
                    </div>
                  </ProfileContainer>)
            }
          </RealTimeBox>
        </BoardRowSection>
      </BoardSection>
    </DashboardMain>
  )
}

const SwipeAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

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
    display: flex;

    & div {
      margin-left: 1rem;
      width: auto;
      padding-left: 1rem;
      padding-right: 1rem;
      height: 2.3rem;
      display: flex;
      align-items: center;
      font-size: 1rem;
      border-radius: 5px;
      background-color: ${({theme}) => theme.backgroundColor};

      & button {
        margin-left: 1rem;
        font-size: 0.7rem;
        background-color: ${({theme}) => theme.fontColor};
        border: none;
        color: ${({theme}) => theme.backgroundColor};
        border-radius: 5px;
        height: 1.5rem;
        width: 3.5rem;
        cursor: pointer;
        transition: all .25s;

        &:hover {
          transform: translateY(-2px);
        }

        & svg {
          margin-bottom: -0.2rem;
          font-size: 0.9rem;
        }
      }
    }
  }

  & .add-form-container {
    margin-top: 3vh;
    width: 90%;
    height: 3.5rem;

    & form {
      width: 100%;
      height: 100%;

      & label {
        position: relative;
        width: 100%;
        height: 100%;

        & input {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          border: none;
          padding: 0 6rem 0 1.5rem;
          background-color: ${({theme}) => theme.backgroundColor};
          color: ${({theme}) => theme.fontColor};
          box-sizing: border-box;
          font-size: 1.2rem;

          &:focus {
            outline: 1px solid ${({theme}) => theme.AlertOverlayColor};
          }
        }

        & button {
          background-color: ${({theme}) => theme.NavigationFocusButtonColor};
          position: absolute;
          border: none;
          top: -0.3rem;
          color: ${({theme}) => theme.fontColor};
          right: 1.5rem;
          width: 3rem;
          height: 2rem;
          cursor: pointer;
          border-radius: 5px;
          transition: all .25s;

          &:hover {
            transform: translateY(-2px);
          }
        }
      }

      & p {
        padding-left: 0.3rem;
        padding-top: 0.2rem;
        color: ${({theme}) => theme.InvalidTextColor};
        font-size: 0.9rem;
      }
    }
  }

  & .email-list-container {
    margin-top: 4vh;
    width: 90%;
    height: 50%;
    overflow: auto;
    transition: all .25s;

    & form {
      width: 60%;
      & label {
        display: flex;
        position: relative;
        width: 100%;
        height: 2.5rem;

        & > .button-container {
          right: 1rem;
          top: 0.2rem;
          background: none;
          position: absolute;

          & button {
            font-size: 1.2rem;
            color: ${({theme}) => theme.fontColor};
            background: none;
            border: none;
            cursor: pointer;

            &:last-child {
              margin-left: 0.3rem;
            }

            & svg {
              margin-bottom: -0.3rem;
            }
          }
        }
      }
    }

    & .removing {
      animation: ${SwipeAnimation} 0.3s forwards;
    }

    & .email-box {
      margin-top: 1rem;
      width: 100%;
      height: 4rem;
      background: ${({theme}) => theme.BottomNavigationContainerColor};
      box-shadow: ${({theme}) => theme.boxShadow};
      border-radius: 5px;
      font-weight: 300;
      transition: all .25s;
      display: flex;
      align-items: center;
      font-size: 1.2rem;

      &:first-child {
        margin-top: 0;
      }

      & .email-name {
        background: none;
        margin-left: 1.5rem;
        color: ${({theme}) => theme.fontColor};
        border: none;
        font-size: 1.2rem;
        height: 2.5rem;
        width: 100%;
        transition: all .25s;
        border-radius: 5px;

        &:focus {
          outline: none;
        }
      }

      & .editing {
        margin-left: 0.75rem;
        padding-left: 0.75rem;
        padding-right: 5rem;

        &:focus {
          outline: 1px solid ${({theme}) => theme.fontColor};
        }
      }

      & > .button-container {
        margin-left: auto;
        padding-right: 1.5rem;
        width: 4.5rem;

        & button {
          width: 2rem;
          color: ${({theme}) => theme.fontSecondColor};
          font-size: 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          transition: all .25s;

          &:hover {
            color: ${({theme}) => theme.fontColor};
          }

          & svg {
            margin-bottom: -0.2rem;
          }

          &:last-child {
            margin-left: 0.5rem;
          }
        }
      }
    }
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

  & > .button-container {
    width: 50%;
    height: 3rem;
    margin: auto 2rem 1rem auto;

    & button {
      padding-left: 1rem;
      padding-right: 1rem;
      height: 80%;
      float: right;
      font-size: 0.9rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: all .2s;

      &:hover {
        transform: translateY(-3px);
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