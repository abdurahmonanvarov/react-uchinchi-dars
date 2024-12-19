import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLoyOut from "./components/MainLoyOut";
import Login from "./pages/Login";
import Regicter from "./pages/Regicter";
import Home from "./pages/Home";
import ProtectedRore from "./components/ProtectedRore";

import { action as LoginAction } from "./pages/Login";
import { action as RegisterAction } from "./pages/Regicter";

function App() {
  const user = false;
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRore user={user}>
          <MainLoyOut />
        </ProtectedRore>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Regicter />,
      action: RegisterAction,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
