import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Menu from "../Pages/Menu";




export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
       {
        path: '/',
        element: <Menu/>
       }
      ]
    },
  ]);