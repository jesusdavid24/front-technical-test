import { createBrowserRouter } from "react-router-dom";
import { Root } from "../layout/root";
import { Home } from "../pages/Home";
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
    ]
  }
]);
