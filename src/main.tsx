import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './pages/Main'
import SignIn from "./pages/SignIn";
import './index.css'

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
    }
  ]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);