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
import Buckets from "./pages/Buckets";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Toaster } from "react-hot-toast";

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
        path: '/buckets',
        element: <Buckets firstRender={true}/>
      },
      {
        path: "/bucket/:serverId/",
        children: [
          {
            path: '',
            element: <Navigate to={'/bucket/AURORA633/dashboard'}/>
          },
          {
            path: '/bucket/:serverId/dashboard',
            element: <Dashboard/>
          },
          {
            path: '/bucket/:serverId/user-preference',
            element: <UserPreferences/>
          },
          {
            path: '/bucket/:serverId/buckets',
            element: <Buckets firstRender={false}/>
          }
        ]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Providers>
    <RouterProvider router={router}/>
    <Toaster gutter={50000}/>
  </Providers>
);