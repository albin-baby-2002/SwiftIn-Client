import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Pages/GeneralPages/Home";
import PersistentLogin from "./HOC/persistentLogin";
import AdminLogin from "./Pages/AdminPages/AdminLogin";
import PrivateRoute from "./HOC/privateRoute";
import { ROLES_LIST } from "./Config/userRoles";
import useLogout from "./Hooks/AuthHooks/useLogout";
import Dashboard from "./Pages/AdminPages/Console";
import Console from "./Pages/AdminPages/Console";
import Users from "./Pages/AdminPages/Users";
import Profile from "./Pages/UserPages/Profile";
import HotelDetailsPage from "./Pages/GeneralPages/HotelDetailsPage";
import PropertyListingPage from "./Pages/UserPages/PropertyListingPage";
import ManageListings from "./Pages/Host Pages/ManageListings";

function App() {
 

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<PersistentLogin />}>
          <Route index element={<Home />} />

          <Route
            path="/profile"
            element={
              <PrivateRoute
                Element={Profile}
                allowedRoles={[ROLES_LIST.User]}
              />
            }
          />

          <Route path="/hotel/details" element={<HotelDetailsPage />} />

          <Route path="/property/listing" element={<PropertyListingPage />} />

          <Route path="/manage/property" element={<ManageListings />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route
            path="/admin/console/test"
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
              <PrivateRoute Element={Users} allowedRoles={[ROLES_LIST.Admin]} />
            }
          />
        </Route>
      </>,
    ),
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
