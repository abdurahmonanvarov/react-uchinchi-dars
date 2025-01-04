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
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authReadyAct, login } from "./app/featcher/userSlice";
import { auth } from "./firebase/config";
import { useDispatch } from "react-redux";
import Create from "./pages/Create";
import { action as CreateAction } from "./pages/Create";
import { action as Comment } from "./components/ProjectComponent ";
import Setting from "./pages/Setting";
import ProjectComponent from "./components/ProjectComponent ";

function App() {
  const dispatch = useDispatch();
  const { user, authReady } = useSelector((store) => store.user);
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
        {
          path: "/create",
          element: <Create />,
          action: CreateAction,
        },
        {
          path: "/setting",
          element: <Setting />,
        },
        {
          path: "/conversation",
          element: <ProjectComponent />,
          action: Comment,
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
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
      dispatch(authReadyAct());
    });
  }, []);

  return <>{authReady && <RouterProvider router={routes} />}</>;
}

export default App;
