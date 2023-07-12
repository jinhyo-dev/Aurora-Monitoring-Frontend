import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from './pages/Main'
import SignIn from "./pages/SignIn";
import Providers from "./Providers";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboards/Dashboard";
import UserPreferences from "./pages/Dashboards/UserPreferences";
import Teams from "./pages/Teams";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Toaster} from "react-hot-toast";
import NotFound from "./pages/components/Error/NotFound";
import TeamSetting from "./pages/Dashboards/TeamSetting";
import CpuOverview from "./pages/Dashboards/CpuOverview.tsx";
import DiskOverview from "./pages/Dashboards/DiskOverview.tsx";
import MemoryOverview from "./pages/Dashboards/MemoryOverview.tsx";
import SystemLog from "./pages/Dashboards/SystemLog.tsx";
import {BrowserView, MobileView} from 'react-device-detect';
import styled from "styled-components";
import AuroraBackground from './assets/images/Aurora-Main-Background.jpg'
import { ReactComponent as AuroraLogo } from './assets/svg/Aurora.svg'
import AgentRegister from "./pages/Dashboards/AgentRegister.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: '',
        element: <Main/>,
      },
      {
        path: "/sign-in",
        element: <SignIn/>,
      },
      {
        path: "/sign-up",
        element: <SignUp/>,
      },
      {
        path: '/teams',
        element: <Teams firstRender={true}/>
      },
      {
        path: "/team/:teamId/",
        children: [
          {
            path: '',
            element: <NotFound/>
          },
          {
            path: '/team/:teamId/agent-register',
            element: <AgentRegister/>
          },
          {
            path: '/team/:teamId/dashboard',
            element: <Dashboard/>
          },
          {
            path: '/team/:teamId/cpu-overview',
            element: <CpuOverview/>
          },
          {
            path: '/team/:teamId/disk-overview',
            element: <DiskOverview/>
          },
          {
            path: '/team/:teamId/memory-overview',
            element: <MemoryOverview/>
          },
          {
            path: '/team/:teamId/system-log',
            element: <SystemLog/>
          },
          {
            path: '/team/:teamId/user-preference',
            element: <UserPreferences
              userInfo={{
                id: '',
                name: {firstName: '', lastName: ''},
                plan: '',
                phone: '',
                country: '',
                email: '',
                profileImage: ''
              }}

              teamInfo={{
                id: '',
                name: '',
                createdAt: '',
                owner: '',
                plan: '',
                registrationCode: '',
                group: [],
                members: [],
                permission: ''
              }}
            />
          },
          {
            path: '/team/:teamId/teams',
            element: <Teams firstRender={false}/>
          },
          {
            path: '/team/:teamId/team-setting',
            element: <TeamSetting/>
          }
        ]
      }
    ],
    errorElement: <NotFound/>
  },
]);

const MobileMain = styled.main`
  padding: 0;
  box-sizing: border-box;
  background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${AuroraBackground});
  width: 100%;
  height: 100vh;
  background-size: cover;
  overflow: hidden;
  color: #fff;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  & .container {
    height: 12.5rem;
    width: 18rem;
    text-align: center;
    
    & svg {
      width: 40%;  
    }
    
    & .mobile-text {
      & div {
        &:first-child {
          font-weight: 600;
          font-size: 3.5rem;  
        }
        
        &:last-child {
          padding-top: 1rem;
          font-weight: 400;
          font-size: 1rem;
        }
      } 
    }
  }
`

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Providers>
    <BrowserView>
      <RouterProvider router={router}/>
      <Toaster gutter={50000}/>
    </BrowserView>

    <MobileView>
      <MobileMain>
        <div className={'container'}>
          <AuroraLogo/>
          <div className={'mobile-text'}>
            <div>Oops!</div>
            <div>Aurora does not support<br/> mobile devices.</div>
          </div>
        </div>
      </MobileMain>
    </MobileView>
  </Providers>
);
