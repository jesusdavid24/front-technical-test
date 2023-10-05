import { createBrowserRouter } from "react-router-dom";
import { Root } from "../layout/root";
import { Home } from "../pages/Home";
import { Profile } from "../components/Profile";
import { NotFound } from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path:'/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile/:login',
        element: <Profile />,
      },
    ]
  }
]);
