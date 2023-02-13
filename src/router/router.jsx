import Wedding from "../components/Wedding/Wedding";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/:slug",
      element: <Wedding/>
    },
]);

export default router