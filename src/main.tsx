import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './pages/Main'
import SignIn from "./pages/SignIn";
import Providers from "./Providers";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboards/Dashboard";
import UserPreferences from "./pages/Dashboards/UserPreferences";
import Buckets from "./pages/Buckets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    // action: rootAction,
    // loader: rootLoader,
  },
  {
    path: "/sign-in",
    element: <SignIn/>,
    // loader: taskLoader,
  },
  {
    path: "/sign-up",
    element: <SignUp/>,
    // loader: taskLoader,
  },
  {
    path: '/dashboard',
    element: <Dashboard/>
  },
  {
    path: '/user-preference',
    element: <UserPreferences/>
  },
  {
    path: '/buckets',
    element: <Buckets/>
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router}/>
    </Providers>
  </React.StrictMode>
);