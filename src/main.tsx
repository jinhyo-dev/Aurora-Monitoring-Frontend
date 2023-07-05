import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter, Navigate,
  RouterProvider,
} from "react-router-dom";
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
        path: "/team/:serverId/",
        children: [
          {
            path: '',
            element: <Navigate to={'/team/AURORA633/dashboard'}/>
          },
          {
            path: '/team/:serverId/dashboard',
            element: <Dashboard/>
          },
          {
            path: '/team/:serverId/user-preference',
            element: <UserPreferences/>
          },
          {
            path: '/team/:serverId/teams',
            element: <Teams firstRender={false}/>
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