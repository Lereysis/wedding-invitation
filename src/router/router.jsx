import { createBrowserRouter } from "react-router-dom";
import Wedding from "../pages/Wedding/Wedding";
import Welcome from "../pages/Welcome/Welcome";
import App from "../app/app";
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