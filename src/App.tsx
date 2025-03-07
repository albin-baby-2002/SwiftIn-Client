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
import { ROLES_LIST } from "./Enums/userRoles";
import Console from "./Pages/AdminPages/Console";
import Users from "./Pages/AdminPages/UsersManagement";
import Profile from "./Pages/UserPages/Profile";
import HotelDetailsPage from "./Pages/GeneralPages/HotelDetailsPage";
import PropertyListingPage from "./Pages/UserPages/PropertyListingPage";
import ManageListings from "./Pages/Host Pages/ManageListings";
import ListingManagement from "./Pages/AdminPages/ListingManagement";
import SearchPage from "./Pages/GeneralPages/searchPage";
import Reservations from "./Pages/UserPages/Reservations";
import ManageReservations from "./Pages/Host Pages/ManageReservations";
import Chat from "./Pages/UserPages/Chat";
import Wishlist from "./Pages/UserPages/Wishlist";
import ReservationsManagement from "./Pages/AdminPages/ReservationsManagement";
import Hosts from "./Pages/AdminPages/Hosts";

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

          <Route
            path="/hotel/details/:listingID"
            element={<HotelDetailsPage />}
          />
          <Route path="/search" element={<SearchPage />} />

          <Route
            path="/property/listing"
            element={
              <PrivateRoute
                Element={PropertyListingPage}
                allowedRoles={[ROLES_LIST.User]}
              />
            }
          />

          <Route
            path="/reservations"
            element={
              <PrivateRoute
                Element={Reservations}
                allowedRoles={[ROLES_LIST.User]}
              />
            }
          />

          <Route
            path="/wishlist"
            element={
              <PrivateRoute
                Element={Wishlist}
                allowedRoles={[ROLES_LIST.User]}
              />
            }
          />

          <Route
            path="/chat"
            element={
              <PrivateRoute Element={Chat} allowedRoles={[ROLES_LIST.User]} />
            }
          />

          <Route
            path="/manage/property"
            element={
              <PrivateRoute
                Element={ManageListings}
                allowedRoles={[ROLES_LIST.User]}
              />
            }
          />

          <Route
            path="/manage/reservations"
            element={
              <PrivateRoute
                Element={ManageReservations}
                allowedRoles={[ROLES_LIST.User]}
              />
            }
          />

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
            path="/admin/hosts"
            element={
              <PrivateRoute Element={Hosts} allowedRoles={[ROLES_LIST.Admin]} />
            }
          />

          <Route
            path="/admin/reservations"
            element={
              <PrivateRoute
                Element={ReservationsManagement}
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

          <Route
            path="/admin/manage/listings"
            element={
              <PrivateRoute
                Element={ListingManagement}
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
