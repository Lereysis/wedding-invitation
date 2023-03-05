import { createBrowserRouter } from "react-router-dom";
import Wedding from "../pages/Wedding/Wedding";
import Welcome from "../pages/Welcome/Welcome";
import App from "../app/app";
import Guests from "../pages/Guests/Guests";
import PageQrWhatsapp from "../pages/PageQrWhatsapp/PageQrWhatsapp";
import DetailsGuest from "../pages/DetailsGuest/DetailsGuest";
import ReminderForm from "../pages/ReminderForm/ReminderForm";
import LayoutBackOffice from "../layout/LayoutBackOffice/LayoutBackOffice";
import ListGuest from "../pages/ListGuest/ListGuest";
import NoMatch from "../components/NoMatch/NoMatch";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<NoMatch />,
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
        path: "/:id/:name/formulario-de-recordatorio",
        element: <ReminderForm />,
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
      {
        path: "/detalle-invitacion/:id/:name",
        element:
          <LayoutBackOffice>
            <DetailsGuest />
          </LayoutBackOffice>
        ,
      },
      {
        path: "/lista-de-invitados",
        element:
          <LayoutBackOffice>
            <ListGuest />
          </LayoutBackOffice>
        ,
      },
    ]
  },
]);


export default router