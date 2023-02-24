import { createBrowserRouter } from "react-router-dom";
import Wedding from "../pages/Wedding/Wedding";
import Welcome from "../pages/Welcome/Welcome";
import App from "../app/app";
import Guests from "../pages/Guests/Guests";
import PageQrWhatsapp from "../pages/PageQrWhatsapp/PageQrWhatsapp";

import LayoutBackOffice from "../layout/LayoutBackOffice/LayoutBackOffice";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/:slug",
        element: <Wedding />,
      },
      {
        path: "/administracion-invitados",
        element:
          <LayoutBackOffice>
            <Guests />
          </LayoutBackOffice>
        ,
      },
      {
        path: "/whatsapp-web-js",
        element:
          <LayoutBackOffice>
            <PageQrWhatsapp />
          </LayoutBackOffice>
        ,
      },
    ]
  },
]);

export default router