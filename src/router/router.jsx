import { createBrowserRouter } from "react-router-dom";
import Wedding from "../pages/Wedding/Wedding";
import Welcome from "../pages/Welcome/Welcome";
import App from "../app/app";
import Guests from "../pages/Guests/Guests";
import QR from "../pages/QR/QR"

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
        },
        {
          path:"/administracion-invitados-qr",
          element:<QR/>
        }
      ]
    },
]);

export default router