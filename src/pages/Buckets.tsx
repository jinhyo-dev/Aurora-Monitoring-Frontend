import { BoardSection, DashboardMain, fadeIn } from "../styles/GlobalStyle"
import styled from "styled-components"
import NavigationBar from "./Dashboards/NavigationBar"
import PageName from "./components/PageName"
import { ReactComponent as AuroraLogo } from '../assets/svg/Aurora.svg'
import { ReactComponent as AuroraLogoDark } from '../assets/svg/AuroraDark.svg'
import { useCookies } from "react-cookie"
import { FaUsers } from 'react-icons/fa'
import * as React from "react"
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { FiEdit } from 'react-icons/fi'

interface PageStatus {
  firstRender: boolean;
}

const BucketComponents = () => {
  const [cookies] = useCookies()
  const navigate = useNavigate()

  const createNewBucketHandler = () => {
    return (
      confirmAlert({
        customUI: ({onClose}) => {
          return (
            <div className='custom-alert-ui'>
              <div className={'logo-container'}>
                {cookies.theme === 'dark' ? <AuroraLogo/> :
                  <AuroraLogoDark/>}
              </div>

              <p>Create new bucket</p>

              <form className={'bucket-form'}>
                <input type="input" placeholder="Bucket name"/>
              </form>

              <div className={'button-container'}>
                <button onClick={onClose} className={'close-btn'}>Cancel</button>
                <button
                  onClick={onClose}
                  className={'create-btn'}
                >
                  Create
                </button>
              </div>
            </div>
          )
        }
      })
    )
  }

  const bucketEditHandler = () => {
    console.log('aaa')
  }

  return (
    <BucketsContainer>
      {cookies.theme === 'dark' ? <AuroraLogo className={'aurora-logo'}/> :
        <AuroraLogoDark className={'aurora-logo'}/>}
      <div className={'title'}>
        <div>Buckets</div>
        <button onClick={createNewBucketHandler}>
          Create new bucket
        </button>
      </div>

      <div className={'buckets-list'}>
        <div className={'bucket'} onClick={() => navigate('/bucket/AURORA633/dashboard')}>
          <div>
            <div className={'server-name'}>
              Jinhyo-Vultr-Server
              <span>Free</span>
            </div>
            <div className={'server-info'}>
              <FaUsers/> <span>1 Team members</span>
            </div>
          </div>

          <EditButton onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            bucketEditHandler();
          }}>
            <FiEdit/> Edit
          </EditButton>

        </div>
        <div className={'bucket'}>
          <div>
            <div className={'server-name'}>
              Jinhyo-Home-Server
              <span>Enterprise</span>
            </div>

            <div className={'server-info'}>
              <FaUsers/> <span>5 Team members</span>
            </div>
          </div>

          <EditButton onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            bucketEditHandler();
          }}>
            <FiEdit/> Edit
          </EditButton>
        </div>
      </div>
    </BucketsContainer>
  )
}

const BucketsContainer = styled.div`
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
      background: #07a4ff;
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
        background: #0983cb;
      }
    }
  }

  & .buckets-list {
    width: 85%;
    margin: 2rem auto 0;
    height: 23.5rem;
    overflow: auto;

    & .bucket {
      width: 100%;
      height: 5rem;
      background: ${({theme}) => theme.BottomNavigationContainerColor};
      border-radius: 5px;
      margin-top: 1rem;
      font-weight: 300;
      transition: all .25s;
      display: flex;
      align-items: center;
      cursor: pointer;
      box-shadow: ${({theme}) => theme.boxShadow};

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 1rem;
      }

      &:hover {
        background: ${({theme}) => theme.BottomNavigationFocusButtonColor};
      }

      & .server-name {
        text-align: left;
        font-size: 1.2rem;
        padding-left: 1rem;

        & span {
          padding-left: 0.4rem;
          font-size: 0.8rem;
        }
      }

      & .server-info {
        padding-top: 0.4rem;
        padding-left: 1rem;
        float: left;

        & svg {
          margin-bottom: -0.15rem;
        }

        & span {
          padding-left: 0.3rem;
        }
      }
    }
  }
`

const EditButton = styled.button`
  width: 4rem;
  height: 2rem;
  border: none;
  margin-left: auto;
  margin-right: 1rem;
  border-radius: 3px;
  background: ${({theme}) => theme.NavigationFocusButtonColor};
  color: ${({theme}) => theme.fontColor};
  cursor: pointer;
  transition: all .25s;
  
  & svg {
    margin-bottom: -0.1rem;
  }
  
  &:hover {
    background: ${({theme}) => theme.BottomNavigationContainerColor};
  }
`

const Buckets: React.FC<PageStatus> = ({firstRender}) => {
  if (firstRender) {
    return (
      <DashboardMain>
        <BucketComponents/>
      </DashboardMain>
    )
  } else {
    return (
      <DashboardMain>
        <NavigationBar active={7}/>
        <BoardSection>
          <PageName name={'Buckets'}/>
          <BucketComponents/>
        </BoardSection>
      </DashboardMain>
    )
  }
}

export default Buckets