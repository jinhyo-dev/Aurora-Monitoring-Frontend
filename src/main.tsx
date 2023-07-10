import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from './pages/Main'
import SignIn from "./pages/SignIn";
import Providers from "./Providers";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboards/Dashboard";
import UserPreferences from "./pages/Dashboards/UserPreferences";
import Teams from "./pages/Teams";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/components/Error/NotFound";
import TeamSetting from "./pages/Dashboards/TeamSetting";

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
            path: '/team/:teamId/dashboard',
            element: <Dashboard/>
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
                email: ''
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
              }}
            />
          },
          {
            path: '/team/:teamId/teams',
            element: <Teams firstRender={false}/>
          },
          {
            path: '/team/:teamId/teams/setting',
            element: <TeamSetting/>
          }
        ]
      }
    ],
    errorElement: <NotFound/>
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Providers>
    <RouterProvider router={router}/>
    <Toaster gutter={50000}/>
  </Providers>
);