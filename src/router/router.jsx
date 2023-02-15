import { createBrowserRouter } from "react-router-dom";
import Wedding from "../pages/Wedding/Wedding";
import Welcome from "../pages/Welcome/Welcome";
import App from "../app/app";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Guests from "../pages/Guests/Guests";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
          path: "/",
          element: <Welcome/>,
        },
        {
          path: "/iniciar-sesion",
          element: <Login/>,
        },
        {
          path: "/registro",
          element: <Register/>,
        },
        {
          path: "/:slug",
          element: <Wedding/>,
        },
        {
          path: "/administracion-invitados",
          element: <Guests/>,
        }
      ]
    },
]);

export default router