import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Pages/Home";
import PersistentLogin from "./HOC/persistentLogin";
import AdminLogin from "./Pages/AdminPages.tsx/AdminLogin";
import PrivateRoute from "./HOC/privateRoute";
import { ROLES_LIST } from "./Config/userRoles";
import useLogout from "./Hooks/AuthHooks/useLogout";
import Dashboard from "./Pages/AdminPages.tsx/Console";
import Console from "./Pages/AdminPages.tsx/Console";
import Users from "./Pages/AdminPages.tsx/Users";

function App() {
  const logout = useLogout();

  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<PersistentLogin />}>
          <Route index element={<Home />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/console"
            element={
              <PrivateRoute
                Element={Console}
                allowedRoles={[ROLES_LIST.Admin]}
              />
            }
          />

          <Route
            path="/admin/users"
            element={
              <PrivateRoute
                Element={Users}
                allowedRoles={[ROLES_LIST.Admin]}
              />
            }
          />
          
        </Route>
      </>,
    ),
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
